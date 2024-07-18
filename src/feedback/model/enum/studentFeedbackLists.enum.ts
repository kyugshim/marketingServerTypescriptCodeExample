/**
 * https://survey.seoltab.com/#/home 안에서의 질문의 uuid
 */
export enum StudentFeedbackListsEnum {
  firstClassReady = '1cmBQPr0JBySv3KydnPG',

  firstCheckComprehension = 'qLguZ5ffLcaor7nspyv2',

  firstStudyDirection = 'Iwa5p6XsyaOWqOcvPG5s',

  firstCustomizeVulnerability = 'Nmd06s43zmX0yPSv2pwY',

  firstParticipationInfluence = 'mCPNkylBCPltLNCJdk0b',

  firstRecommendationTutor = 'cyMj2Q5EbCE2gOZPuvJs',

  firstSwitchTutorZeroToSix = '72aQnq6DRkEwuw0XUSqM',

  firstSwitchTutorSevenToEight = 'S7PQjxiwWOI7Kfa5IzUh',

  secondClassReady = 'uSKwXOC6kR3jUmT9EFwN',

  secondCheckComprehension = 'GIlk2Xx7acxIsRLMYidr',

  secondStudyDirection = 'HPE2Ez4HsUzqgzRSpeNi',

  secondCustomizeVulnerability = 'GM0mMTIIiy1fjyYwMU96',

  secondParticipationInfluence = 'E4nYfdHjPxltNQDeUO8Q',

  secondRecommendationTutor = 'SbXI6fGKqJeuGagtJFqU',

  secondSwitchTutorZeroToSix = 'Mj47VTPygcqycBPvQwFT',

  secondSwitchTutorSevenToEight = 'U2wcjcDtwD2xzWrMx2qP',

  thirdClassReady = 'gMR0ymvogdpUqoGx2A6w',

  thirdCheckComprehension = 'YwL87y2bf8UBAOL0zR7E',

  thirdStudyDirection = 'tqdbrPWUwTjnfJ0dbGDV',

  thirdCustomizeVulnerability = '5AdEZEOno9rRoF1NGM0y',

  thirdParticipationInfluence = 'VYlIPZPKOooXxpkUrM4v',

  thirdRecommendationTutor = '9qiFkIjQ4ztJE5vyy0rY',

  thirdSwitchTutorZeroToSix = 'SxuvRy1XJEEqdtDWQOjV',

  thirdSwitchTutorSevenToEight = 'ZvTvsGRwiXKPAJOx564m',

  forthAndAboveRecommendationTutor = 'WwZI08GtA8p7KANNMTuJ',

  forthAndAboveSwitchTutorZeroToSix = '2g4Oz9ycjmuhzIMDx4Qd',

  forthAndAboveSwitchTutorSevenToEight = '0EJQ69G4bdRMiGutiZLf',

  forthAndAboveConsideringToChangeSubject = 'cycle_4_22', // dev, stage: 'cycle4_0910'  , live : 'cycle_4_22'
}

/**
 * 해당 uuid의 질문
 */
export enum ClassGuideLine {
  classReady = '[수업 준비]',

  checkComprehension = '[이해도 체크]',

  studyDirection = '[학습 방향]',

  customizeVulnerability = '[취약점 맞춤 설정]',

  participationInfluence = '[학생 참여 유도]',
}

/**
 * 질문 당 메세지 문구
 */
export enum ClassGuideLineNotice {
  classReady = `👉정규 수업 시간 동안 학생이 온전히 수업에만 집중할 수 있도록 수업 10분 전 교재를 준비하고 오늘 수업 내용을 확인해주세요.\n`,

  checkComprehension = `👉수업 중 최소 3회 이상 '잘 이해하고 있는지' 질문해 학생의 이해도를 확인해주세요.\n`,

  studyDirection = `👉학생의 성적에 맞게 학습 방향을 정해주시고 매 수업 반드시 숙제를 점검해주세요.\n`,

  customizeVulnerability = `👉숙제 검사 및 문제 풀이 과정에서 학생이 취약한 개념과 유형을 찾고 이를 중심으로 학습할 수 있도록 지도해주세요.\n`,

  participationInfluence = `👉학생이 수업에 적극적으로 참여하도록 최소 5회 이상 질문을 하고 학생의 답변을 기다려주세요.\n`,
}

/**
 * 질문 당 답변
 */
export enum SwitchTutorOrSubjectValues {
  YES = 'yes',
  NO = 'no',
}

export enum RecommendationTutorValues {
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
}
