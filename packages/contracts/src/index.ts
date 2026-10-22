import { z } from "zod";

// ==========================================
// 1. Roles & Permissions
// ==========================================
export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  CITY_ADMIN: "CITY_ADMIN",
  DISPATCHER: "DISPATCHER",
  FLEET_MANAGER: "FLEET_MANAGER",
  PARTNER_COORDINATOR: "PARTNER_COORDINATOR",
  PHARMACY_OPERATOR: "PHARMACY_OPERATOR",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ==========================================
// 2. Healthcare & Booking Domains
// ==========================================
export const AppointmentStatus = {
  REQUESTED: "REQUESTED",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const GuidePackageTier = {
  NORMAL: "NORMAL",
  EXTRA: "EXTRA",
  PREMIUM: "PREMIUM",
} as const;

export type GuidePackageTier = (typeof GuidePackageTier)[keyof typeof GuidePackageTier];

export const GuideBookingStatus = {
  REQUESTED: "REQUESTED",
  CONFIRMED: "CONFIRMED",
  ASSIGNED: "ASSIGNED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;

export type GuideBookingStatus = (typeof GuideBookingStatus)[keyof typeof GuideBookingStatus];

// ==========================================
// 3. Pharmacy & Orders Domain
// ==========================================
export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

// ==========================================
// 4. Ambulance Dispatch Domain
// ==========================================
export const AmbulanceUrgency = {
  STANDARD: "STANDARD",
  CRITICAL: "CRITICAL",
} as const;

export type AmbulanceUrgency = (typeof AmbulanceUrgency)[keyof typeof AmbulanceUrgency];

export const AmbulanceRequestStatus = {
  PENDING_DISPATCH: "PENDING_DISPATCH",
  ASSIGNED: "ASSIGNED",
  EN_ROUTE: "EN_ROUTE",
  ON_SCENE: "ON_SCENE",
  TRANSPORTING: "TRANSPORTING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  UNFULFILLED: "UNFULFILLED",
} as const;

export type AmbulanceRequestStatus =
  (typeof AmbulanceRequestStatus)[keyof typeof AmbulanceRequestStatus];

export const VehicleStatus = {
  AVAILABLE: "AVAILABLE",
  ON_TRIP: "ON_TRIP",
  MAINTENANCE: "MAINTENANCE",
  OFFLINE: "OFFLINE",
} as const;

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus];

export const VehicleType = {
  AC: "AC",
  NON_AC: "NON_AC",
  ICU: "ICU",
  FREEZER: "FREEZER",
} as const;

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType];

export const OwnershipType = {
  MEDIZAAI: "MEDIZAAI",
  PARTNER: "PARTNER",
} as const;

export type OwnershipType = (typeof OwnershipType)[keyof typeof OwnershipType];

export const AssignmentStatus = {
  OFFERED: "OFFERED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  TIMED_OUT: "TIMED_OUT",
  COMPLETED: "COMPLETED",
} as const;

export type AssignmentStatus = (typeof AssignmentStatus)[keyof typeof AssignmentStatus];

// ==========================================
// 5. Notifications & Outbox
// ==========================================
export const NotificationChannel = {
  SMS: "SMS",
  WHATSAPP: "WHATSAPP",
  EMAIL: "EMAIL",
} as const;

export type NotificationChannel =
  (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const NotificationStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SENT: "SENT",
  FAILED: "FAILED",
} as const;

export type NotificationStatus =
  (typeof NotificationStatus)[keyof typeof NotificationStatus];

// ==========================================
// Validation Schemas
// ==========================================

export const BangladeshiPhoneSchema = z
  .string()
  .regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Valid Bangladeshi mobile number is required");

export const CreateAppointmentRequestSchema = z.object({
  doctorId: z.string().uuid(),
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: BangladeshiPhoneSchema,
  preferredDate: z.string().date("Valid date (YYYY-MM-DD) is required"),
  preferredTimeSlot: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export type CreateAppointmentRequest = z.infer<typeof CreateAppointmentRequestSchema>;

export const CreateGuideBookingRequestSchema = z.object({
  guideId: z.string().uuid(),
  packageTier: z.enum(["NORMAL", "EXTRA", "PREMIUM"]),
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: BangladeshiPhoneSchema,
  preferredDate: z.string().date(),
  hospitalName: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export type CreateGuideBookingRequest = z.infer<typeof CreateGuideBookingRequestSchema>;

export const PharmacyOrderItemSchema = z.object({
  medicineId: z.string().uuid(),
  quantity: z.number().int().positive("Quantity must be greater than zero"),
});

export const CreatePharmacyOrderRequestSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: BangladeshiPhoneSchema,
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  cityId: z.string().uuid(),
  items: z.array(PharmacyOrderItemSchema).min(1, "Order must contain at least one item"),
  notes: z.string().max(500).optional(),
});

export type CreatePharmacyOrderRequest = z.infer<typeof CreatePharmacyOrderRequestSchema>;

export const CreateAmbulanceRequestSchema = z.object({
  callerName: z.string().min(2, "Caller name is required"),
  callerPhone: BangladeshiPhoneSchema,
  pickupAddress: z.string().min(3, "Pickup location or landmark is required"),
  destinationAddress: z.string().optional(),
  cityId: z.string().uuid(),
  urgency: z.enum(["STANDARD", "CRITICAL"]).default("STANDARD"),
  patientNotes: z.string().max(500).optional(),
  idempotencyKey: z.string().uuid().optional(),
});

export type CreateAmbulanceRequest = z.infer<typeof CreateAmbulanceRequestSchema>;

export const AssignAmbulanceRequestSchema = z.object({
  vehicleId: z.string().uuid(),
  notes: z.string().max(500).optional(),
});

export type AssignAmbulanceRequest = z.infer<typeof AssignAmbulanceRequestSchema>;
