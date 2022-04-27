import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User, Word } from "@prisma/client";
import { PracticeResults } from "../../types";
import { GetUser } from "../auth/get-user.decorator";
import { GetPracticeWordsDto } from "./dto/get-practice-words.dto";
import { GetResultsDto } from "./dto/get-results.dto";
import { PracticeService } from "./practice.service";

@UseGuards(AuthGuard())
@Controller("practice")
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Get("words")
  getWords(
    @Query() getPracticeWordsDto: GetPracticeWordsDto,
    @GetUser() user: User,
  ): Promise<Word[]> {
    const { n, failedOnly } = getPracticeWordsDto;
    return this.practiceService.getWords(n, failedOnly, user);
  }

  @Post("results")
  getResults(
    @Body() getResultsDto: GetResultsDto,
    @GetUser() user: User,
  ): Promise<PracticeResults> {
    return this.practiceService.getResults(getResultsDto, user);
  }
}
