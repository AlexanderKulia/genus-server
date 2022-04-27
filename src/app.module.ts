import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { HistoryModule } from "./history/history.module";
import { PracticeModule } from "./practice/practice.module";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    AuthModule,
    PracticeModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
