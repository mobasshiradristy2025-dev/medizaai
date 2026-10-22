import * as dotenv from "dotenv";
import { createDbClient, notificationOutbox, eq, and, lte } from "@repo/db";

dotenv.config({ path: "../../.env" });

let db: ReturnType<typeof createDbClient> | null = null;
let isConnected = false;

function getDb() {
  if (!db) {
    db = createDbClient();
  }
  return db;
}

async function processOutboxBatch() {
  const now = new Date();
  try {
    const client = getDb();
    const pendingNotifications = await client
      .select()
      .from(notificationOutbox)
      .where(
        and(
          eq(notificationOutbox.status, "PENDING"),
          lte(notificationOutbox.scheduledFor, now),
        ),
      )
      .limit(10);

    if (!isConnected) {
      isConnected = true;
      console.log("[Worker] Successfully connected to PostgreSQL database.");
    }

    for (const item of pendingNotifications) {
      console.log(
        `[Worker] Processing notification ${item.id} (${item.channel}) to ${item.recipient}`,
      );
      await client
        .update(notificationOutbox)
        .set({
          status: "SENT",
          processedAt: new Date(),
        })
        .where(eq(notificationOutbox.id, item.id));
    }
  } catch (error: any) {
    if (error?.code === "ECONNREFUSED") {
      if (isConnected || isConnected === false) {
        console.warn(
          "[Worker] PostgreSQL not connected at 5432 (run 'docker compose up -d'). Retrying in 10s...",
        );
      }
      isConnected = false;
    } else {
      console.error("[Worker] Error processing notification outbox:", error);
    }
  }
}

async function startWorker() {
  console.log("[Worker] Medizaai background outbox worker initialized.");
  const loop = async () => {
    await processOutboxBatch();
    setTimeout(loop, isConnected ? 5000 : 10000);
  };
  loop();
}

startWorker();
