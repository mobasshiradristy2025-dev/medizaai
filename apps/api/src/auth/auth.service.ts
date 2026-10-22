import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async validateStaff(phone: string, _pass: string) {
    // Scaffold implementation for milestone 1 auth foundation
    return { id: "mock-id", phone, role: "SUPER_ADMIN" };
  }
}
