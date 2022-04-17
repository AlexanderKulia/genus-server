import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { TrainingModule } from './training/training.module';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), AuthModule, TrainingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
