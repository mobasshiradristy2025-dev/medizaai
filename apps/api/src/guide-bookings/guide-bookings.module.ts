import { Module } from "@nestjs/common";
import { GuideBookingsService } from "./guide-bookings.service";
import { GuideBookingsController } from "./guide-bookings.controller";

@Module({
  controllers: [GuideBookingsController],
  providers: [GuideBookingsService],
  exports: [GuideBookingsService],
})
export class GuideBookingsModule {}
