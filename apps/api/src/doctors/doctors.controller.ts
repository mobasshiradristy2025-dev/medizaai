import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DoctorsService } from "./doctors.service";

@ApiTags("Doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: "Browse doctors directory" })
  async findAll() {
    return this.doctorsService.findAll();
  }
}
