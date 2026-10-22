import { pgTable, uuid, varchar, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const notificationOutbox = pgTable("notification_outbox", {
  id: uuid("id").primaryKey().defaultRandom(),
  channel: varchar("channel", { length: 50 }).notNull(), // 'SMS' | 'WHATSAPP' | 'EMAIL'
  recipient: varchar("recipient", { length: 255 }).notNull(),
  payload: jsonb("payload").notNull(),
  status: varchar("status", { length: 50 }).default("PENDING").notNull(), // 'PENDING' | 'PROCESSING' | 'SENT' | 'FAILED'
  attempts: integer("attempts").default(0).notNull(),
  maxAttempts: integer("max_attempts").default(5).notNull(),
  lastError: text("last_error"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }).defaultNow().notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const notificationAttempts = pgTable("notification_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  outboxId: uuid("outbox_id").references(() => notificationOutbox.id, { onDelete: "cascade" }).notNull(),
  channel: varchar("channel", { length: 50 }).notNull(),
  error: text("error"),
  attemptedAt: timestamp("attempted_at", { withTimezone: true }).defaultNow().notNull(),
});
