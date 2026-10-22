import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { RolesGuard } from "../access-control/roles.guard";
import { Roles } from "../access-control/roles.decorator";
import { UserRole } from "@repo/contracts";

@ApiTags("Users")
@Controller("users")
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CITY_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "List users" })
  async findAll() {
    return this.usersService.findAll();
  }
}
