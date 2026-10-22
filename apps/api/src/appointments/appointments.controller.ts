import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppointmentsService } from "./appointments.service";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: "Get appointment requests" })
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Submit appointment request" })
  async create(@Body() body: any) {
    return { status: "received", data: body };
  }
}
