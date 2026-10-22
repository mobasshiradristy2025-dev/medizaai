import { Injectable, Inject } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../common/database/database.module";
import type { Database } from "@repo/db";
import { doctors } from "@repo/db";

@Injectable()
export class DoctorsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAll() {
    return this.db.select().from(doctors);
  }
}
