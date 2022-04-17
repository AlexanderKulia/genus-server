import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User, Word } from "@prisma/client";
import { GetUser } from "../auth/get-user.decorator";
import { GetTrainingWordsDto } from "./dto/get-training-words.dto";
import { TrainingService } from "./training.service";

@UseGuards(AuthGuard())
@Controller("training")
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get()
  getWords(
    @Query() getTrainingWordsDto: GetTrainingWordsDto,
    @GetUser() user: User,
  ): Promise<Word[]> {
    const { n } = getTrainingWordsDto;
    return this.trainingService.getWords(n, user);
  }
}
