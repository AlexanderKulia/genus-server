import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { User, Word } from "@prisma/client";
import { AppService } from "./app.service";
import { GetUser } from "./auth/get-user.decorator";
import { OptionalAuthGuard } from "./auth/OptionalAuthGuard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(OptionalAuthGuard)
  findWord(
    @Query("word") word: string,
    @GetUser() user: User | boolean,
  ): Promise<Word> {
    return this.appService.findWord(word, user);
  }
}
