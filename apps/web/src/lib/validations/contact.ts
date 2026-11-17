import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "আপনার পুরো নাম লিখুন"),
  phone: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)"),
  subject: z.string().trim().min(2, "কী বিষয়ে জানতে চান লিখুন"),
  message: z
    .string()
    .trim()
    .min(10, "অন্তত ১০ অক্ষরের বার্তা লিখুন")
    .max(1000, "সর্বোচ্চ ১০০০ অক্ষর লিখতে পারবেন"),
});

export type ContactValues = z.infer<typeof contactSchema>;