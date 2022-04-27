import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthModule } from "../auth/auth.module";
import { PracticeController } from "./practice.controller";
import { PracticeService } from "./practice.service";

@Module({
  imports: [AuthModule],
  providers: [PracticeService, PrismaClient],
  controllers: [PracticeController],
})
export class PracticeModule {}
