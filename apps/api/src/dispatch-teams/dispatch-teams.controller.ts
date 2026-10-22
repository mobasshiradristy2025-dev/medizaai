import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { DispatchTeamsService } from "./dispatch-teams.service";
import { RolesGuard } from "../access-control/roles.guard";
import { Roles } from "../access-control/roles.decorator";
import { UserRole } from "@repo/contracts";

@ApiTags("Dispatch Teams")
@Controller("dispatch-teams")
@UseGuards(RolesGuard)
export class DispatchTeamsController {
  constructor(private readonly dispatchTeamsService: DispatchTeamsService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN, UserRole.DISPATCHER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "List dispatch teams" })
  async findAll() {
    return this.dispatchTeamsService.findAll();
  }
}
