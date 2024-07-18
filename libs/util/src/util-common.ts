import { Injectable } from '@nestjs/common';
import { GetMsArgsDTO } from './dto/util-common.dto';

// 기본 유틸성 서비스
@Injectable()
export class UtilCommon {
  getMs({ type, number }: GetMsArgsDTO): number {
    const oneMilliSecond = 1000;
    const oneMinute = 60 * oneMilliSecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    switch (type) {
      case 'minute':
        return number * oneMinute;
      case 'hour':
        return number + oneHour;
      case 'day':
        return number + oneDay;
      default:
        return number * oneMilliSecond;
    }
  }
}
