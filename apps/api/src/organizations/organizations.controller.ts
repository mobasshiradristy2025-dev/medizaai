import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { OrganizationsService } from "./organizations.service";
import { RolesGuard } from "../access-control/roles.guard";
import { Roles } from "../access-control/roles.decorator";
import { UserRole } from "@repo/contracts";

@ApiTags("Organizations")
@Controller("organizations")
@UseGuards(RolesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN, UserRole.PARTNER_COORDINATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: "List organizations and provider partners" })
  async findAll() {
    return this.organizationsService.findAll();
  }
}
