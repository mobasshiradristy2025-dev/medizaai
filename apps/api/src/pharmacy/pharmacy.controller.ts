import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PharmacyService } from "./pharmacy.service";

@ApiTags("Pharmacy")
@Controller("pharmacy")
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get("medicines")
  @ApiOperation({ summary: "Browse available medicines catalog" })
  async findAll() {
    return this.pharmacyService.findAll();
  }
}
