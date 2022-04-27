import { IsInt } from "class-validator";

export class GetTopSearchesDto {
  @IsInt()
  n: number;
}
