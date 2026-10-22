import { Injectable, Inject } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../common/database/database.module";
import type { Database } from "@repo/db";
import { auditLogs } from "@repo/db";

@Injectable()
export class AuditService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async log(entry: {
    userId?: string;
    action: string;
    entityType: string;
    entityId: string;
    cityId?: string;
    metadata?: Record<string, any>;
  }) {
    return this.db.insert(auditLogs).values(entry).returning();
  }
}
