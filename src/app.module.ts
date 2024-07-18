import { Module } from '@nestjs/common';
import { ScylladbCassadraModule } from './database/scylladbCassadra.module';
import { MbtiModule } from './mbti/mbti.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { FeedbackModule } from './feedback/Feedback.module';
import { AlarmModule } from './alarm/alarm.module';
import { CustomerServiceFormModule } from './customerServiceForm/customerServiceForm.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    MbtiModule,
    FeedbackModule,
    CustomerServiceFormModule,
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ScylladbCassadraModule,
    AlarmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
