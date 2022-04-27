import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaService } from "../prisma.service";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";

@Module({
  imports: [AuthModule],
  providers: [HistoryService, PrismaService],
  controllers: [HistoryController],
})
export class HistoryModule {}
