import { z } from "zod";

function todayLocalISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export const doctorBookingSchema = z.object({
  name: z.string().trim().min(2, "আপনার পুরো নাম লিখুন"),
  phone: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)"),
  date: z
    .string()
    .min(1, "পছন্দের তারিখ বেছে নিন")
    .refine((value) => value >= todayLocalISO(), "আজকের আগের তারিখ দেওয়া যাবে না"),
  time: z.string().trim().min(1, "পছন্দের সময় লিখুন"),
  note: z.string().trim().max(300, "সর্বোচ্চ ৩০০ অক্ষর লিখতে পারবেন").optional(),
});

export type DoctorBookingValues = z.infer<typeof doctorBookingSchema>;

export const guideBookingSchema = doctorBookingSchema.extend({
  hospital: z.string().min(1, "হাসপাতাল বেছে নিন"),
});

export type GuideBookingValues = z.infer<typeof guideBookingSchema>;