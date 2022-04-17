import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class GetTrainingWordsDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  n: number;
}
