import { pgTable, uuid, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { cities } from "./cities.js";
import { users } from "./users.js";

export const dispatchTeams = pgTable("dispatch_teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  cityId: uuid("city_id").references(() => cities.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const teamMemberships = pgTable("team_memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id").references(() => dispatchTeams.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
