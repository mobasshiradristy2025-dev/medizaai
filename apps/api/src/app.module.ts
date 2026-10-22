import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./common/database/database.module";
import { AccessControlModule } from "./access-control/access-control.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CitiesModule } from "./cities/cities.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { GuidesModule } from "./guides/guides.module";
import { GuideBookingsModule } from "./guide-bookings/guide-bookings.module";
import { HospitalsModule } from "./hospitals/hospitals.module";
import { PharmacyModule } from "./pharmacy/pharmacy.module";
import { OrdersModule } from "./orders/orders.module";
import { AmbulanceModule } from "./ambulance/ambulance.module";
import { DispatchTeamsModule } from "./dispatch-teams/dispatch-teams.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuditModule } from "./audit/audit.module";
import { SettingsModule } from "./settings/settings.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["../../.env", ".env"],
    }),
    DatabaseModule,
    AccessControlModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    OrganizationsModule,
    DoctorsModule,
    AppointmentsModule,
    GuidesModule,
    GuideBookingsModule,
    HospitalsModule,
    PharmacyModule,
    OrdersModule,
    AmbulanceModule,
    DispatchTeamsModule,
    NotificationsModule,
    AuditModule,
    SettingsModule,
  ],
})
export class AppModule {}
