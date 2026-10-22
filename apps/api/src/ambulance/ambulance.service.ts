import { Injectable, Inject } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../common/database/database.module";
import type { Database } from "@repo/db";
import { ambulanceRequests, ambulanceVehicles } from "@repo/db";

@Injectable()
export class AmbulanceService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAllRequests() {
    return this.db.select().from(ambulanceRequests);
  }

  async findAllVehicles() {
    return this.db.select().from(ambulanceVehicles);
  }
}
