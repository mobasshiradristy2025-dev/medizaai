import { pgTable, uuid, varchar, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { cities } from "./cities.js";
import { organizations } from "./organizations.js";
import { users } from "./users.js";

export const ambulanceVehicles = pgTable("ambulance_vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  registrationNumber: varchar("registration_number", { length: 50 }).notNull().unique(),
  vehicleType: varchar("vehicle_type", { length: 50 }).default("NON_AC").notNull(),
  ownershipType: varchar("ownership_type", { length: 50 }).default("MEDIZAAI").notNull(),
  status: varchar("status", { length: 50 }).default("AVAILABLE").notNull(),
  driverName: varchar("driver_name", { length: 255 }),
  driverPhone: varchar("driver_phone", { length: 20 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const ambulanceRequests = pgTable("ambulance_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  referenceCode: varchar("reference_code", { length: 20 }).notNull().unique(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  callerName: varchar("caller_name", { length: 255 }).notNull(),
  callerPhone: varchar("caller_phone", { length: 20 }).notNull(),
  pickupAddress: text("pickup_address").notNull(),
  destinationAddress: text("destination_address"),
  urgency: varchar("urgency", { length: 50 }).default("STANDARD").notNull(),
  status: varchar("status", { length: 50 }).default("PENDING_DISPATCH").notNull(),
  patientNotes: text("patient_notes"),
  idempotencyKey: varchar("idempotency_key", { length: 100 }).unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const ambulanceAssignments = pgTable("ambulance_assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestId: uuid("request_id").references(() => ambulanceRequests.id, { onDelete: "cascade" }).notNull(),
  vehicleId: uuid("vehicle_id").references(() => ambulanceVehicles.id).notNull(),
  assignedByUserId: uuid("assigned_by_user_id").references(() => users.id).notNull(),
  status: varchar("status", { length: 50 }).default("OFFERED").notNull(),
  assignedAt: timestamp("assigned_at", { withTimezone: true }).defaultNow().notNull(),
  respondedAt: timestamp("responded_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  notes: text("notes"),
});

export const ambulanceTrips = pgTable("ambulance_trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestId: uuid("request_id").references(() => ambulanceRequests.id).notNull(),
  vehicleId: uuid("vehicle_id").references(() => ambulanceVehicles.id).notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  tripNotes: text("trip_notes"),
});

export const dispatchEvents = pgTable("dispatch_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestId: uuid("request_id").references(() => ambulanceRequests.id, { onDelete: "cascade" }).notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  actorUserId: uuid("actor_user_id").references(() => users.id),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
