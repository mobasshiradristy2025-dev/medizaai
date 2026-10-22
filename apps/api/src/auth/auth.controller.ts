import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Staff authentication" })
  async login(@Body() body: { phone: string; passwordHash: string }) {
    return this.authService.validateStaff(body.phone, body.passwordHash);
  }
}
