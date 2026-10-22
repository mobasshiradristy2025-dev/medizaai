import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AmbulanceService } from "./ambulance.service";
import { RolesGuard } from "../access-control/roles.guard";
import { Roles } from "../access-control/roles.decorator";
import { UserRole } from "@repo/contracts";

@ApiTags("Ambulance Dispatch")
@Controller("ambulance")
export class AmbulanceController {
  constructor(private readonly ambulanceService: AmbulanceService) {}

  @Post("requests")
  @ApiOperation({ summary: "Customer intake: submit emergency ambulance request" })
  async createRequest(@Body() body: any) {
    return { status: "received", data: body };
  }

  @Get("queue")
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN, UserRole.DISPATCHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Dispatcher queue: active ambulance requests" })
  async getQueue() {
    return this.ambulanceService.findAllRequests();
  }

  @Get("fleet")
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN, UserRole.DISPATCHER, UserRole.FLEET_MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Fleet status: available and active ambulances" })
  async getFleet() {
    return this.ambulanceService.findAllVehicles();
  }
}
