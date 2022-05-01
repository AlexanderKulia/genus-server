import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Search, User } from "@prisma/client";
import { GetUser } from "../auth/get-user.decorator";
import { PResponse } from "../types";
import { GetHistoryDto } from "./dto/get-history.dto";
import { GetTopSearchesDto } from "./dto/get-top-searches.dto";
import { HistoryService } from "./history.service";

@UseGuards(AuthGuard())
@Controller("history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getHistory(
    @Query() getHistoryDto: GetHistoryDto,
    @GetUser() user: User,
  ): Promise<PResponse<Search>> {
    return this.historyService.getHistory(getHistoryDto, user);
  }

  @Get("top")
  getTopSearches(
    @Query() getTopSearchesDto: GetTopSearchesDto,
    @GetUser() user: User,
  ): Promise<{ count: number; word: string }[]> {
    const { n } = getTopSearchesDto;
    return this.historyService.getTopSearches(n, user);
  }
}
