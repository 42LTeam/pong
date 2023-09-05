import { Module } from "@nestjs/common";
import { MatchController } from "./match.controller";
import { MatchService } from "./match.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [PrismaModule],
  exports: [MatchService],
})
export class MatchModule {}
