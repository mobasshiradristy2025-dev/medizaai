import { Injectable, Inject } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../common/database/database.module";
import type { Database } from "@repo/db";
import { notificationOutbox } from "@repo/db";

@Injectable()
export class NotificationsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async enqueue(channel: "SMS" | "WHATSAPP" | "EMAIL", recipient: string, payload: Record<string, any>) {
    return this.db.insert(notificationOutbox).values({
      channel,
      recipient,
      payload,
      status: "PENDING",
    }).returning();
  }
}
