import { pgTable, uuid, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { cities } from "./cities.js";

export const medicines = pgTable("medicines", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  genericName: varchar("generic_name", { length: 255 }),
  manufacturer: varchar("manufacturer", { length: 255 }),
  dosageForm: varchar("dosage_form", { length: 100 }),
  strength: varchar("strength", { length: 100 }),
  price: integer("price").notNull(),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  isPrescriptionRequired: boolean("is_prescription_required").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  subtotal: integer("subtotal").notNull(),
  deliveryFee: integer("delivery_fee").notNull(),
  total: integer("total").notNull(),
  status: varchar("status", { length: 50 }).default("PENDING").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).default("COD").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  medicineId: uuid("medicine_id").references(() => medicines.id).notNull(),
  medicineNameSnapshot: varchar("medicine_name_snapshot", { length: 255 }).notNull(),
  unitPriceSnapshot: integer("unit_price_snapshot").notNull(),
  quantity: integer("quantity").notNull(),
  lineTotal: integer("line_total").notNull(),
});
