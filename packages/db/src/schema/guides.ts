import { pgTable, uuid, varchar, text, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { cities } from "./cities.js";

export const guides = pgTable("guides", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  languages: varchar("languages", { length: 255 }).default("Bangla").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const guidePackages = pgTable("guide_packages", {
  id: uuid("id").primaryKey().defaultRandom(),
  tier: varchar("tier", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const guideBookings = pgTable("guide_bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  packageId: uuid("package_id").references(() => guidePackages.id).notNull(),
  assignedGuideId: uuid("assigned_guide_id").references(() => guides.id),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  preferredDate: date("preferred_date").notNull(),
  hospitalName: varchar("hospital_name", { length: 255 }),
  status: varchar("status", { length: 50 }).default("REQUESTED").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
