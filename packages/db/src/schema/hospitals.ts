import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { cities } from "./cities.js";

export const hospitals = pgTable("hospitals", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).default("HOSPITAL").notNull(),
  address: text("address").notNull(),
  contactPhone: varchar("contact_phone", { length: 20 }),
  emergencyPhone: varchar("emergency_phone", { length: 20 }),
  services: text("services"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
