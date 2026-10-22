import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

export * from "./schema/index.js";
export * from "drizzle-orm";

export type Database = ReturnType<typeof createDbClient>;

export function createDbClient(connectionString?: string) {
  const url =
    connectionString ||
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/medizaai";
  const client = postgres(url);
  return drizzle(client, { schema });
}
