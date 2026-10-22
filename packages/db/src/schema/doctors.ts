import { pgTable, uuid, varchar, text, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { cities } from "./cities.js";

export const doctors = pgTable("doctors", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  specialty: varchar("specialty", { length: 100 }).notNull(),
  qualifications: text("qualifications").notNull(),
  experienceYears: integer("experience_years").default(0).notNull(),
  consultationFee: integer("consultation_fee").notNull(),
  videoFee: integer("video_fee"),
  photoUrl: text("photo_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  doctorId: uuid("doctor_id").references(() => doctors.id).notNull(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  preferredDate: date("preferred_date").notNull(),
  preferredTimeSlot: varchar("preferred_time_slot", { length: 50 }),
  status: varchar("status", { length: 50 }).default("REQUESTED").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
