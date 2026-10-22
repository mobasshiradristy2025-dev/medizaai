import { Module } from "@nestjs/common";
import { DispatchTeamsService } from "./dispatch-teams.service";
import { DispatchTeamsController } from "./dispatch-teams.controller";

@Module({
  controllers: [DispatchTeamsController],
  providers: [DispatchTeamsService],
  exports: [DispatchTeamsService],
})
export class DispatchTeamsModule {}
