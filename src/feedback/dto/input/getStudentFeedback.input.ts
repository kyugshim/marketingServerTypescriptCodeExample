import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class GetStudentFeedbackInput {
  @Field(() => Int, { nullable: false })
  lectureVtNo!: number;

  // @Field(() => Int, { nullable: true })
  // lectureSubjectId: number;

  @Field(() => Int, { nullable: false })
  studentUserId!: number;

  @Field(() => Int, { nullable: false })
  tutorUserId!: number;

  // @Field(() => String, { nullable: true })
  // tutorName: string;

  @Field(() => String, { nullable: false })
  feedbackVersion!: string;

  @Field(() => Int, { nullable: false })
  cycleCount!: number;
}
