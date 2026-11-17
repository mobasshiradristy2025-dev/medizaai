import { z } from "zod";
import { doctorBookingSchema } from "@/lib/validations/booking";

// phone rule booking er sathe ek rakhte pick() kore nisi
export const loginPhoneSchema = doctorBookingSchema.pick({ phone: true });

export type LoginPhoneValues = z.infer<typeof loginPhoneSchema>;

export const otpSchema = z.string().regex(/^\d{4}$/, "৪ সংখ্যার কোড দিন");