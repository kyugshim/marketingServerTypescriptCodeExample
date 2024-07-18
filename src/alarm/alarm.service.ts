import { FeedbackInput } from '../../common/types/feedbackInput.type';
import { lastValueFrom, Observable } from 'rxjs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

interface AlarmService {
  feedback(input: FeedbackInput, metadata: Metadata): Observable<any>;
}

@Injectable()
export class AlarmGrpcService implements OnModuleInit {
  private alarmGrpcService: AlarmService;

  constructor(
    @Inject('ALARM')
    private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.alarmGrpcService =
      this.client.getService<AlarmService>('AlarmService');
  }

  async feedback(input: FeedbackInput) {
    try {
      console.log('alarm.service.feedback.input : ', input);
      const metadata = new Metadata();

      console.log('alarm.service.feedback.metadata : ', metadata);

      const result = await lastValueFrom(
        this.alarmGrpcService.feedback(input, metadata),
      );
      console.log('alarm.service.feedback.result : ', result);

      return result;
    } catch (error) {
      console.log('alarm.service.feedback.result.error : ', error);
      return;
    }
  }
}
