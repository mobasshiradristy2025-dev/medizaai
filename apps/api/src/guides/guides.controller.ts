import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { GuidesService } from "./guides.service";

@ApiTags("Guides")
@Controller("guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Get()
  @ApiOperation({ summary: "List available hospital guides" })
  async findAll() {
    return this.guidesService.findAll();
  }

  @Get("packages")
  @ApiOperation({ summary: "List guide service packages" })
  async findPackages() {
    return this.guidesService.findPackages();
  }
}
