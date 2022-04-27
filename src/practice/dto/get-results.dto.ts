import { Genus } from "@prisma/client";

export class GetResultsDto {
  [key: string]: Genus;
}
