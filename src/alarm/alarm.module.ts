import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AlarmGrpcService } from './alarm.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ALARM',
        useFactory: () => ({
          transport: Transport.GRPC,
          options: {
            url: process.env.ALRAM_SERVICE_URL,
            package: 'alarm',
            protoPath: join(__dirname, '../../alarm/alarm.proto'),
          },
        }),
      },
    ]),
  ],
  providers: [AlarmGrpcService],
  exports: [AlarmGrpcService],
})
export class AlarmModule {}
