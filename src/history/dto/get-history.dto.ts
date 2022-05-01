import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsInt } from "class-validator";

export class GetHistoryDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  perPage: number;

  @IsEnum(Prisma.SortOrder)
  sortOrder: string;

  @IsEnum(Prisma.SearchScalarFieldEnum)
  sortBy: string;
}
