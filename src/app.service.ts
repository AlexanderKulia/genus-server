import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, User, Word } from "@prisma/client";
import { JSDOM } from "jsdom";
import { lastValueFrom } from "rxjs";
import { PrismaService } from "./prisma.service";

const germanWordSelector = "strong[lang='de']";
const germanGenusSelector = `${germanWordSelector} + span.gender`;
const wikiBaseUrl = "https://en.wiktionary.org/wiki/";

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async findWord(word: string, user: User | boolean): Promise<Word> {
    const capitalizedWord =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    const found = await this.prisma.word.findUnique({
      where: {
        text: capitalizedWord,
      },
    });
    if (found) {
      await this.saveSearch(capitalizedWord, user, true);
      if (user && user !== true) {
        await this.prisma.word.update({
          where: {
            id: found.id,
          },
          data: {
            users: {
              connect: { id: user.id },
            },
          },
        });
      }
      return found;
    }

    try {
      const url = `${wikiBaseUrl}${encodeURIComponent(capitalizedWord)}`;
      console.log(url);
      const res = await lastValueFrom(this.httpService.get(url));
      const html = res.data;
      const dom = new JSDOM(html);
      const genusElements =
        dom.window.document.querySelectorAll(germanGenusSelector);

      const genera = [];
      for (const g of genusElements) {
        if (g) genera.push(g.textContent);
      }

      const wordData: Prisma.WordCreateInput = {
        text: word,
        m: genera.includes("m") ? true : false,
        f: genera.includes("f") ? true : false,
        n: genera.includes("n") ? true : false,
        language: "de",
        wikiUrl: url,
      };
      if (user && user !== true) wordData.users = { connect: { id: user.id } };

      const newWord = await this.prisma.word.create({
        data: wordData,
      });
      await this.saveSearch(capitalizedWord, user, true);

      return newWord;
    } catch (error) {
      await this.saveSearch(capitalizedWord, user, false);
      throw new NotFoundException();
    }
  }

  async saveSearch(
    word: string,
    user: User | boolean,
    success: boolean,
  ): Promise<void> {
    const data: Prisma.SearchCreateInput = {
      word,
      success,
    };
    if (user && user !== true) data.user = { connect: { id: user.id } };
    await this.prisma.search.create({ data });
  }
}
