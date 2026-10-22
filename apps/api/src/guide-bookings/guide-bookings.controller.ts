import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { GuideBookingsService } from "./guide-bookings.service";

@ApiTags("Guide Bookings")
@Controller("guide-bookings")
export class GuideBookingsController {
  constructor(private readonly guideBookingsService: GuideBookingsService) {}

  @Get()
  @ApiOperation({ summary: "List guide bookings" })
  async findAll() {
    return this.guideBookingsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Submit guide booking request" })
  async create(@Body() body: any) {
    return { status: "received", data: body };
  }
}
