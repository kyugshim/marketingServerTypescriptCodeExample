import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

export class JSONObject {}
@ObjectType()
export class StudentFeedbackModel {
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

  @Field(() => Boolean, { nullable: true })
  switchTutor: boolean;

  @Field(() => String, { nullable: true })
  feedbackVersion: string;

  @Field(() => Int)
  cycleCount!: number;

  @Field(() => JSONObject, { nullable: true })
  bodyListMap: JSONObject;
}
