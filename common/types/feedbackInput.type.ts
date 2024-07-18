import { FeedbackTargetInputType } from './feedbackTargetInput.type';

export type FeedbackInput = {
  alarmType: string; // 알림 : 'alim'
  messageType: string; // 'feedbackT'
  scheduleDate?: string; // 없음
  targetInput: FeedbackTargetInputType[];
};
