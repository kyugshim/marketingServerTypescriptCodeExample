import { JSONObject } from '../model/studentFeedback.model';

export class UpsertStudentFeedbackDto {
  lectureVtNo: number;

  lectureSubjectId: number;

  studentUserId: number;

  tutorUserId: number;

  tutorName: string;

  feedbackVersion: string;

  switchTutor: boolean;

  cycleCount: number;

  bodyListMap: JSONObject;
}
