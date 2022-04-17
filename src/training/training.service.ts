import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient, User, Word } from "@prisma/client";

@Injectable()
export class TrainingService {
  constructor(private readonly prisma: PrismaClient) {}

  pickRandom<T>(items: T[]): T {
    return items[(items.length * Math.random()) | 0];
  }

  async getWords(n: number, user: User): Promise<Word[]> {
    const wordCount = await this.prisma.word.count({
      where: { users: { some: { id: user.id } } },
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
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
      orderBy: { [orderBy]: orderDir },
    });
  }
}
