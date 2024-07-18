import { Injectable, OnModuleInit } from '@nestjs/common';
import { ScylladbCassandraService } from '../../database/scylladbCassandra.service';
import { mapping } from 'cassandra-driver';
import { StudentFeedbackModel } from '../model/studentFeedback.model';
import { GetStudentFeedbackInput } from '../dto/input/getStudentFeedback.input';
import { UpsertStudentFeedbackDto } from '../dto/upsertStudentFeedback.dto';
@Injectable()
export class StudentFeedbackRepository implements OnModuleInit {
  constructor(private scylladbCassandraService: ScylladbCassandraService) {}

  feedbackMapper: mapping.ModelMapper<StudentFeedbackModel>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        StudentFeedbackModel: {
          tables: ['student_feedback_projects'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
          columns: {
            lectureVtNo: 'lecture_vt_no',
            lectureSubjectId: 'lecture_subject_id',
            studentUserId: 'student_user_id',
            tutorUserId: 'tutor_user_id',
            tutorName: 'tutor_name',
            feedbackVersion: 'feedback_version',
            bodyListMap: 'body_list_map',
            cycleCount: 'cycle_count',
            switchTutor: 'switch_tutor',
          },
        },
      },
    };

    this.feedbackMapper = this.scylladbCassandraService
      .creatMapper(mappingOptions)
      .forModel('StudentFeedbackModel');
  }

  async getAll() {
    const result = await this.feedbackMapper.findAll();

    return result.toArray();
  }

  async getOneById(getStudentFeedbackInput: GetStudentFeedbackInput) {
    const result = await this.feedbackMapper.find(getStudentFeedbackInput);

    return result;
  }

  async upsertStudentSurvey(upsertStudentFeedback: UpsertStudentFeedbackDto) {
    const result = await this.feedbackMapper.insert(upsertStudentFeedback);

    return result;
  }
}
