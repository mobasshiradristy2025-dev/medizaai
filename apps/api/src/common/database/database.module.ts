import { Module, Global } from "@nestjs/common";
import { createDbClient } from "@repo/db";

export const DATABASE_CONNECTION = "DATABASE_CONNECTION";

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => {
        return createDbClient();
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
