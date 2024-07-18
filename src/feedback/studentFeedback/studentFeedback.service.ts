import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StudentFeedbackRepository } from './studentFeedback.repository';
import { GetStudentFeedbackInput } from '../dto/input/getStudentFeedback.input';
import { UpsertStudentFeedbackDto } from '../dto/upsertStudentFeedback.dto';
import {
  RecommendationTutorValues,
  StudentFeedbackListsEnum,
  SwitchTutorOrSubjectValues,
} from '../model/enum/studentFeedbackLists.enum';
import { AlarmGrpcService } from '../../alarm/alarm.service';
import { FeedbackInput } from '../../../common/types/feedbackInput.type';
import * as dayjs from 'dayjs';

@Injectable()
export class StudentFeedbackService {
  constructor(
    private surveyRepository: StudentFeedbackRepository,
    private readonly alarmGrpcService: AlarmGrpcService,
  ) {}

  async getAll() {
    return this.surveyRepository.getAll();
  }

  async getOneById(getStudentFeedbackInput: GetStudentFeedbackInput) {
    return this.surveyRepository.getOneById(getStudentFeedbackInput);
  }

  async upsertSurvey(studentSurvey: UpsertStudentFeedbackDto) {
    try {
      const currentTime = dayjs();

      const result = plainToInstance(UpsertStudentFeedbackDto, {
        ...studentSurvey,
        createdAt: currentTime.toISOString(),
      });

      console.log('result : ', result);
      /**
       * 수업 리뷰 데이터 저장
       */
      await this.surveyRepository.upsertStudentSurvey(result);

      let addOneHour = dayjs().add(1, 'hour');

      if (
        dayjs(addOneHour).get('hour') >= 15 &&
        dayjs(addOneHour).get('hour') < 0
      ) {
        addOneHour = dayjs()
          .add(1, 'day')
          .set('hour', 0)
          .add(9, 'hour')
          .set('minute', 0);
      }
      const studentUserId: number = result.studentUserId;
      const userId: number = result.tutorUserId;
      const switchTutor: boolean = result.switchTutor;

      /**
       * 피드백 cycle_count 1, 2, 3, 4 이상의 질문들 enum
       */

      const studentFeedBackKeyMap = {
        //   firstClassReady: StudentFeedbackListsEnum.firstClassReady,
        //
        //   firstCheckComprehension:
        //     StudentFeedbackListsEnum.firstCheckComprehension,
        //
        //   firstStudyDirection: StudentFeedbackListsEnum.firstStudyDirection,
        //
        //   firstCustomizeVulnerability:
        //     StudentFeedbackListsEnum.firstCustomizeVulnerability,
        //
        //   firstParticipationInfluence:
        //     StudentFeedbackListsEnum.firstParticipationInfluence,
        //
        //   secondClassReady: StudentFeedbackListsEnum.secondClassReady,
        //
        //   secondCheckComprehension:
        //     StudentFeedbackListsEnum.secondCheckComprehension,
        //
        //   secondStudyDirection: StudentFeedbackListsEnum.secondStudyDirection,
        //
        //   secondCustomizeVulnerability:
        //     StudentFeedbackListsEnum.secondCustomizeVulnerability,
        //
        //   secondParticipationInfluence:
        //     StudentFeedbackListsEnum.secondParticipationInfluence,
        //
        //   thirdClassReady: StudentFeedbackListsEnum.thirdClassReady,
        //
        //   thirdCheckComprehension:
        //     StudentFeedbackListsEnum.thirdCheckComprehension,
        //
        //   thirdStudyDirection: StudentFeedbackListsEnum.thirdStudyDirection,
        //
        //   thirdCustomizeVulnerability:
        //     StudentFeedbackListsEnum.thirdCustomizeVulnerability,
        //
        //   thirdParticipationInfluence:
        //     StudentFeedbackListsEnum.thirdParticipationInfluence,

        firstRecommendationTutor:
          StudentFeedbackListsEnum.firstRecommendationTutor,

        secondRecommendationTutor:
          StudentFeedbackListsEnum.secondRecommendationTutor,

        thirdRecommendationTutor:
          StudentFeedbackListsEnum.thirdRecommendationTutor,

        forthRecommendationTutor:
          StudentFeedbackListsEnum.forthAndAboveRecommendationTutor,

        forthAndAboveConsideringToChangeSubject:
          StudentFeedbackListsEnum.forthAndAboveConsideringToChangeSubject,
      };

      const studentFeedBackValueMap = {
        switchTutorOrSubjectValueYes: SwitchTutorOrSubjectValues.YES,

        recommendationTutorValueSix: RecommendationTutorValues.SIX,

        recommendationTutorValueSeven: RecommendationTutorValues.SEVEN,

        recommendationTutorValueEight: RecommendationTutorValues.EIGHT,

        recommendationTutorValueNine: RecommendationTutorValues.NINE,

        recommendationTutorValueTen: RecommendationTutorValues.TEN,
      };

      // const classGuideLines: string[] = [];
      // const classGuideNotices: string[] = [];

      /**
       * body_list_map (0) = 아니요 가 하나라도 존재함. (5) = 예
       */

      // if (result.cycleCount) {
      //   /**
      //    * 각 회차의 [수업 준비] 질문이 았는 경우
      //    */
      //   if (
      //     result.bodyListMap[studentFeedBackKeyMap.firstClassReady] ||
      //     result.bodyListMap[studentFeedBackKeyMap.secondClassReady] ||
      //     result.bodyListMap[studentFeedBackKeyMap.thirdClassReady]
      //   ) {
      //     classGuideNotices.push(ClassGuideLineNotice.classReady);
      //     classGuideLines.push(ClassGuideLine.classReady);
      //   }
      //   /**
      //    * 각 회차의 [이해도 체크] 질문이 았는 경우
      //    */
      //   if (
      //     result.bodyListMap[studentFeedBackKeyMap.firstCheckComprehension] ||
      //     result.bodyListMap[studentFeedBackKeyMap.secondCheckComprehension] ||
      //     result.bodyListMap[studentFeedBackKeyMap.thirdCheckComprehension]
      //   ) {
      //     classGuideNotices.push(ClassGuideLineNotice.checkComprehension);
      //     classGuideLines.push(ClassGuideLine.checkComprehension);
      //   }
      //   /**
      //    * 각 회차의 [취약점 맞춤 설정] 질문이 았는 경우
      //    */
      //   if (
      //     result.bodyListMap[
      //       studentFeedBackKeyMap.firstCustomizeVulnerability
      //     ] ||
      //     result.bodyListMap[
      //       studentFeedBackKeyMap.secondCustomizeVulnerability
      //     ] ||
      //     result.bodyListMap[studentFeedBackKeyMap.thirdCustomizeVulnerability]
      //   ) {
      //     classGuideNotices.push(ClassGuideLineNotice.customizeVulnerability);
      //     classGuideLines.push(ClassGuideLine.customizeVulnerability);
      //   }
      //   /**
      //    * 각 회차의 [학습 방향] 질문이 았는 경우
      //    */
      //   if (
      //     result.bodyListMap[studentFeedBackKeyMap.firstStudyDirection] ||
      //     result.bodyListMap[studentFeedBackKeyMap.secondStudyDirection] ||
      //     result.bodyListMap[studentFeedBackKeyMap.thirdStudyDirection]
      //   ) {
      //     classGuideNotices.push(ClassGuideLineNotice.studyDirection);
      //     classGuideLines.push(ClassGuideLine.studyDirection);
      //   }
      //   /**
      //    * 각 회차의 [학생 참여 유도] 질문이 았는 경우
      //    */
      //   if (
      //     result.bodyListMap[
      //       studentFeedBackKeyMap.firstParticipationInfluence
      //     ] ||
      //     result.bodyListMap[
      //       studentFeedBackKeyMap.secondParticipationInfluence
      //     ] ||
      //     result.bodyListMap[studentFeedBackKeyMap.thirdStudyDirection] ||
      //     result.bodyListMap[studentFeedBackKeyMap.thirdParticipationInfluence]
      //   ) {
      //     classGuideNotices.push(ClassGuideLineNotice.participationInfluence);
      //     classGuideLines.push(ClassGuideLine.participationInfluence);
      //   }

      /**
       * 수업 리뷰 알림톡
       */
      // if (classGuideLines.length > 0) {
      //   const alarmInput: FeedbackInput = {
      //     alarmType: 'alim',
      //     messageType: 'feedbackT',
      //     scheduleDate: addOneHour.toISOString(),
      //     targetInput: [
      //       {
      //         userId: userId,
      //         studentUserId: studentUserId,
      //         classGuideLines: classGuideLines,
      //         classGuideNotices: classGuideNotices,
      //       },
      //     ],
      //   };
      //   console.log('classGuideLines.length[0] :', classGuideLines.length[0]);

      /**
       * 과외 리뷰 4회차 이후부터 나오는 [설탭을 고민 중인 다른 과목이 있나요?] 질문에 ‘네’를 체크해서 제출 시 학생과 학부모에게 발송
       */
      console.log(
        'result.bodyListMap[studentFeedBackKeyMap.forthAndAboveConsideringToChangeSubject]',
        result.bodyListMap[
          studentFeedBackKeyMap.forthAndAboveConsideringToChangeSubject
        ],
      );
      console.log(
        'studentFeedBackValueMap.consideringToChangeSubjectValue',
        studentFeedBackValueMap.switchTutorOrSubjectValueYes,
      );
      if (
        (userId &&
          studentUserId &&
          result.cycleCount >= 4 &&
          result.bodyListMap[studentFeedBackKeyMap.forthRecommendationTutor] ===
            studentFeedBackValueMap.recommendationTutorValueNine) ||
        (result.bodyListMap[studentFeedBackKeyMap.forthRecommendationTutor] ===
          studentFeedBackValueMap.recommendationTutorValueTen &&
          switchTutor === true)
      ) {
        const alarmInputS: FeedbackInput = {
          alarmType: 'alim',
          messageType: 'addSubjectS',
          targetInput: [
            {
              userId: studentUserId,
            },
          ],
        };
        console.log('alarmInputS :', alarmInputS);

        const alarmInputP: FeedbackInput = {
          alarmType: 'alim',
          messageType: 'addSubjectP',
          targetInput: [
            {
              userId: studentUserId,
            },
          ],
        };
        console.log('alarmInputP :', alarmInputP);

        await Promise.all([
          await this.alarmGrpcService.feedback(alarmInputS),
          await this.alarmGrpcService.feedback(alarmInputP),
        ]);
      }

      /**
       * 과외 리뷰 1,2,3 회차에서 선생님 추천도 7,8,9,10 점을 선택하여 제출 시 학생과 학부모에게 발송
       * 앱 작업 필요로 추후 작업
       */

      console.log(
        'result.bodyListMap[studentFeedBackKeyMap.firstRecommendationTutor]',
        result.bodyListMap[studentFeedBackKeyMap.firstRecommendationTutor],
      );

      const recommendationTutorValue = [
        studentFeedBackValueMap.recommendationTutorValueSeven,
        studentFeedBackValueMap.recommendationTutorValueEight,
        studentFeedBackValueMap.recommendationTutorValueNine,
        studentFeedBackValueMap.recommendationTutorValueTen,
      ];

      if (userId && studentUserId && result.cycleCount === 1) {
        if (
          recommendationTutorValue.includes(
            result.bodyListMap[studentFeedBackKeyMap.firstRecommendationTutor],
          )
        ) {
          const npsScore = Number(
            result.bodyListMap[studentFeedBackKeyMap.firstRecommendationTutor],
          );

          const alarmInput: FeedbackInput = {
            alarmType: 'alim',
            // 빈 값은 콥 알림서버 작업 후, 추가 예정
            messageType: 'reviewS',
            targetInput: [
              {
                studentUserId: studentUserId,
                npsScore: npsScore,
              },
            ],
          };
          console.log('studentUserId :', studentUserId);
          await this.alarmGrpcService.feedback(alarmInput);
        }
      }

      console.log(
        'result.bodyListMap[studentFeedBackKeyMap.secondRecommendationTutor]',
        result.bodyListMap[studentFeedBackKeyMap.secondRecommendationTutor],
      );

      if (userId && studentUserId && result.cycleCount === 2) {
        if (
          recommendationTutorValue.includes(
            result.bodyListMap[studentFeedBackKeyMap.secondRecommendationTutor],
          )
        ) {
          const npsScore = Number(
            result.bodyListMap[studentFeedBackKeyMap.secondRecommendationTutor],
          );

          const alarmInput: FeedbackInput = {
            alarmType: 'alim',
            messageType: 'reviewS',
            targetInput: [
              {
                studentUserId: studentUserId,
                npsScore: npsScore,
              },
            ],
          };
          console.log('studentUserId :', studentUserId);
          await this.alarmGrpcService.feedback(alarmInput);
        }
      }

      console.log(
        'result.bodyListMap[studentFeedBackKeyMap.thirdRecommendationTutor]',
        result.bodyListMap[studentFeedBackKeyMap.thirdRecommendationTutor],
      );

      if (userId && studentUserId && result.cycleCount === 3) {
        if (
          recommendationTutorValue.includes(
            result.bodyListMap[studentFeedBackKeyMap.thirdRecommendationTutor],
          )
        ) {
          const npsScore = Number(
            result.bodyListMap[studentFeedBackKeyMap.thirdRecommendationTutor],
          );

          const alarmInput: FeedbackInput = {
            alarmType: 'alim',
            // 빈 값은 콥 알림서버 작업 후, 추가 예정
            messageType: 'reviewS',
            targetInput: [
              {
                studentUserId: studentUserId,
                npsScore: npsScore,
              },
            ],
          };
          console.log('studentUserId :', studentUserId);
          await this.alarmGrpcService.feedback(alarmInput);
        }
      }

      /**
       * 수업 리뷰 알림톡 선생님 변경 yes 인 경우에만 알림톡 발송
       */
      // 1회차
      if (
        userId &&
        studentUserId &&
        result.cycleCount === 1 &&
        result.bodyListMap[studentFeedBackKeyMap.firstRecommendationTutor] <=
          studentFeedBackValueMap.recommendationTutorValueEight &&
        switchTutor === true
      ) {
        const alarmInput: FeedbackInput = {
          alarmType: 'alim',
          messageType: 'changeTutorS',
          // scheduleDate: addOneHour.toISOString(),
          targetInput: [
            {
              studentUserId: studentUserId,
            },
          ],
        };
        console.log('studentUserId:', studentUserId);
        console.log('switchTutor :', switchTutor);
        await this.alarmGrpcService.feedback(alarmInput);
      }
      // 2회차
      if (
        userId &&
        studentUserId &&
        result.cycleCount === 2 &&
        result.bodyListMap[studentFeedBackKeyMap.secondRecommendationTutor] <=
          studentFeedBackValueMap.recommendationTutorValueEight &&
        switchTutor === true
      ) {
        const alarmInput: FeedbackInput = {
          alarmType: 'alim',
          messageType: 'changeTutorS',
          // scheduleDate: addOneHour.toISOString(),
          targetInput: [
            {
              studentUserId: studentUserId,
            },
          ],
        };
        console.log('studentUserId:', studentUserId);
        console.log('switchTutor :', switchTutor);
        await this.alarmGrpcService.feedback(alarmInput);
      }
      // 3회차
      if (
        userId &&
        studentUserId &&
        result.cycleCount === 3 &&
        result.bodyListMap[studentFeedBackKeyMap.thirdRecommendationTutor] <=
          studentFeedBackValueMap.recommendationTutorValueEight &&
        switchTutor === true
      ) {
        const alarmInput: FeedbackInput = {
          alarmType: 'alim',
          messageType: 'changeTutorS',
          // scheduleDate: addOneHour.toISOString(),
          targetInput: [
            {
              studentUserId: studentUserId,
            },
          ],
        };
        console.log('studentUserId:', studentUserId);
        console.log('switchTutor :', switchTutor);
        await this.alarmGrpcService.feedback(alarmInput);
      }
      // 4회차 이상 ~

      if (
        userId &&
        studentUserId &&
        result.cycleCount >= 4 &&
        result.bodyListMap[studentFeedBackKeyMap.forthRecommendationTutor] !==
          studentFeedBackValueMap.recommendationTutorValueNine &&
        result.bodyListMap[studentFeedBackKeyMap.forthRecommendationTutor] !==
          studentFeedBackValueMap.recommendationTutorValueTen &&
        switchTutor === true
      ) {
        const alarmInput: FeedbackInput = {
          alarmType: 'alim',
          messageType: 'changeTutorS',
          // scheduleDate: addOneHour.toISOString(),
          targetInput: [
            {
              studentUserId: studentUserId,
            },
          ],
        };
        console.log('studentUserId:', studentUserId);
        console.log('switchTutor :', switchTutor);
        await this.alarmGrpcService.feedback(alarmInput);
      }
      // }

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
