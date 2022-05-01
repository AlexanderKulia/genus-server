import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class GetTopSearchesDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  n: number;
}
