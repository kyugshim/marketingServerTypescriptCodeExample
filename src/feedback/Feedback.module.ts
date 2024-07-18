import { Module } from '@nestjs/common';
import { ScylladbCassadraModule } from '../database/scylladbCassadra.module';
import { StudentFeedbackRepository } from './studentFeedback/studentFeedback.repository';
import { StudentFeedbackService } from './studentFeedback/studentFeedback.service';
import { StudentFeedbackResolver } from './studentFeedback/studentFeedback.resolver';
import { JSONObjectScalar } from '../../libs/util/scalar/jasonObject.scalar';
import { AlarmModule } from '../alarm/alarm.module';

const repository = [StudentFeedbackRepository];
const service = [StudentFeedbackService];
const resolver = [StudentFeedbackResolver];

@Module({
  imports: [ScylladbCassadraModule, AlarmModule],
  controllers: [],
  providers: [...repository, ...service, ...resolver, JSONObjectScalar],
})
export class FeedbackModule {}
