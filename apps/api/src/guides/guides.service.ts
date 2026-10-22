import { Injectable, Inject } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../common/database/database.module";
import type { Database } from "@repo/db";
import { guides, guidePackages } from "@repo/db";

@Injectable()
export class GuidesService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAll() {
    return this.db.select().from(guides);
  }

  async findPackages() {
    return this.db.select().from(guidePackages);
  }
}
