import { Transform } from "class-transformer";
import { IsBoolean, IsInt } from "class-validator";

export class GetPracticeWordsDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  n: number;

  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  failedOnly: boolean;
}
