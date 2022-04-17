import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthModule } from "../auth/auth.module";
import { TrainingController } from "./training.controller";
import { TrainingService } from "./training.service";

@Module({
  imports: [AuthModule],
  providers: [TrainingService, PrismaClient],
  controllers: [TrainingController],
})
export class TrainingModule {}
