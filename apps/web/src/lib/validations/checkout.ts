import { z } from "zod";
import { doctorBookingSchema } from "@/lib/validations/booking";

// name + phone rule booking er sathe ek rakhte pick() kore nisi
export const checkoutSchema = doctorBookingSchema
  .pick({ name: true, phone: true })
  .extend({
    area: z.string().trim().min(2, "এলাকার নাম লিখুন"),
    street: z.string().trim().min(1, "রাস্তার নাম বা নম্বর লিখুন"),
    house: z.string().trim().min(1, "বাসা বা ফ্ল্যাট নম্বর লিখুন"),
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;