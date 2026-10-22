import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { HospitalsService } from "./hospitals.service";

@ApiTags("Hospitals")
@Controller("hospitals")
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  @ApiOperation({ summary: "Browse hospitals and diagnostic centers directory" })
  async findAll() {
    return this.hospitalsService.findAll();
  }
}
