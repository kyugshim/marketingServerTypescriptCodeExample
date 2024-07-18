import { Module } from '@nestjs/common';
import { ScylladbCassandraService } from './scylladbCassandra.service';
@Module({
  imports: [],
  controllers: [],
  providers: [ScylladbCassandraService],
  exports: [ScylladbCassandraService],
})
export class ScylladbCassadraModule {}
