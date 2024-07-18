import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common';
import { StudentFeedbackService } from './studentFeedback.service';
import { UpsertStudentFeedbackInput } from '../dto/input/upsertStudentFeedback.input';
import { GetStudentFeedbackOutput } from '../dto/output/getStudentSurvey.output';
import { GetStudentFeedbackInput } from '../dto/input/getStudentFeedback.input';

@Resolver()
export class StudentFeedbackResolver {
  constructor(private surveyService: StudentFeedbackService) {}

  @Query(() => Boolean)
  root(): boolean {
    return true;
  }

  @Query(() => [GetStudentFeedbackOutput])
  async getAllStudentSurvey() {
    try {
      return this.surveyService.getAll();
    } catch (error) {
      throw new Error('getAll : Error');
    }
  }

  @Query(() => GetStudentFeedbackOutput, { nullable: true })
  async getOneStudentFeedbackById(
    @Args('input') getStudentFeedback: GetStudentFeedbackInput,
  ) {
    try {
      const result = (
        await this.surveyService.getOneById(getStudentFeedback)
      ).first();

      return result;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Mutation(() => GetStudentFeedbackOutput)
  async upsertStudentFeedback(
    @Args('input') upsertStudentFeedback: UpsertStudentFeedbackInput,
  ) {
    try {
      const result = await this.surveyService.upsertSurvey(
        upsertStudentFeedback,
      );
      return result;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
