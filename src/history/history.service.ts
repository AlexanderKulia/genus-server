import { Injectable } from "@nestjs/common";
import { Prisma, Search, User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { PResponse } from "../types";
import { GetHistoryDto } from "./dto/get-history.dto";

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistory(
    getHistoryDto: GetHistoryDto,
    user: User,
  ): Promise<PResponse<Search>> {
    const { page, perPage, sortBy, sortOrder } = getHistoryDto;
    const where: Prisma.SearchWhereInput = { user };
    const itemCount = await this.prisma.search.count({ where });

    const data = await this.prisma.search.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    const meta = { itemCount, pageCount: Math.ceil(itemCount / perPage) };
    return { data, meta };
  }

  async getTopSearches(
    n: number,
    user: User,
  ): Promise<{ count: number; word: string }[]> {
    const where: Prisma.SearchWhereInput = { user };
    const data = await this.prisma.search.groupBy({
      where,
      by: ["word"],
      _count: { id: true },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: n,
    });
    return data.map((item) => {
      return { count: item._count.id, word: item.word };
    });
  }
}
