import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { SettingsService } from "./settings.service";
import { RolesGuard } from "../access-control/roles.guard";
import { Roles } from "../access-control/roles.decorator";
import { UserRole } from "@repo/contracts";

@ApiTags("Settings")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get system and business operational settings" })
  async findAll() {
    return this.settingsService.findAll();
  }
}
