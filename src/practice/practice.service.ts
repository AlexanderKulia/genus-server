import { Injectable } from "@nestjs/common";
import { Genus, Prisma, PrismaClient, User, Word } from "@prisma/client";
import { PracticeResults } from "../../types";
import { GetResultsDto } from "./dto/get-results.dto";

@Injectable()
export class PracticeService {
  constructor(private readonly prisma: PrismaClient) {}

  pickRandom<T>(items: T[]): T {
    return items[(items.length * Math.random()) | 0];
  }

  async getWords(n: number, failedOnly: boolean, user: User): Promise<Word[]> {
    const where: Prisma.WordWhereInput = {
      users: { some: { id: user.id } },
    };
    if (failedOnly)
      where.guesses = {
        some: {
          success: false,
        },
      };

    const wordCount = await this.prisma.word.count({
      where,
    });
    const skip = Math.max(0, Math.floor(Math.random() * wordCount) - n);
    const orderBy = this.pickRandom(["id", "createdAt", "text"]);
    const orderDir = this.pickRandom([
      Prisma.SortOrder.asc,
      Prisma.SortOrder.desc,
    ]);

    return await this.prisma.word.findMany({
      take: n,
      skip,
      where,
      orderBy: { [orderBy]: orderDir },
    });
  }

  genusToArticles(word: Word): Genus[] {
    const articles = [];
    if (word.m) articles.push("der");
    if (word.f) articles.push("die");
    if (word.n) articles.push("das");
    return articles;
  }

  async getResults(
    getResultsDto: GetResultsDto,
    user: User,
  ): Promise<PracticeResults> {
    const wordIds = Object.keys(getResultsDto).map((id) => parseInt(id));
    const words = await this.prisma.word.findMany({
      where: {
        id: { in: wordIds },
      },
    });
    const results: PracticeResults = {};

    for (const [wordIdString, guess] of Object.entries(getResultsDto)) {
      const wordId = parseInt(wordIdString);
      const word = words.find((word) => word.id === wordId);
      const genera = this.genusToArticles(word);
      const success = genera.includes(guess);
      await this.prisma.guess.create({
        data: {
          genus: guess,
          success,
          word: {
            connect: {
              id: wordId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      results[wordId] = { word: word.text, guess, genera, success };
    }

    return results;
  }
}
