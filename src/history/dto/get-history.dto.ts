import { Prisma } from "@prisma/client";
import { IsEnum, IsInt } from "class-validator";

export class GetHistoryDto {
  @IsInt()
  page: number;

  @IsInt()
  perPage: number;

  @IsEnum(Prisma.SortOrder)
  sortOrder: string;

  @IsEnum(Prisma.SearchScalarFieldEnum)
  sortBy: string;
}
