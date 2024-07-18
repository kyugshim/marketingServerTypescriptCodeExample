import { Field, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import {
  JSONObject,
  StudentFeedbackModel,
} from '../../model/studentFeedback.model';

@ObjectType()
export class GetStudentFeedbackOutput extends PickType(StudentFeedbackModel, [
  'lectureVtNo',
  'lectureSubjectId',
  'studentUserId',
  'tutorUserId',
  'tutorName',
  'feedbackVersion',
  'switchTutor',
  'cycleCount',
  'bodyListMap',
]) {
  @Field(() => Int)
  lectureVtNo!: number;

  @Field(() => Int, { nullable: true })
  lectureSubjectId: number;

  @Field(() => Int)
  studentUserId!: number;

  @Field(() => Int)
  tutorUserId!: number;

  @Field(() => String, { nullable: true })
  @IsString()
  tutorName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  feedbackVersion: string; // 피드백 버전

  @Field(() => Boolean, { nullable: true })
  switchTutor: boolean;

  @Field(() => Int)
  cycleCount!: number;

  @Field(() => JSONObject, { nullable: true })
  bodyListMap: JSONObject;
}
