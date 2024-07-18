import { Inject, Injectable } from '@nestjs/common';
import { auth, Client, mapping, policies, types } from 'cassandra-driver';
@Injectable()
export class ScylladbCassandraService {
  client: Client;
  mapper: mapping.Mapper;
  authProvider = new auth.PlainTextAuthProvider(
    process.env.DB_USER,
    process.env.DB_PASSWORD,
  );

  private creatClient() {
    this.client = new Client({
      contactPoints: [process.env.DB_CONTACT_POINTS],
      keyspace: process.env.DB_KEYSPACE,
      localDataCenter: process.env.DB_LOCAL_DATA_CENTER,
      authProvider: this.authProvider,
      // pooling: {
      //   coreConnectionsPerHost: {
      //     [distance.local]: 2,
      //     [distance.remote]: 1,
      //   },
      //   maxRequestsPerConnection: 10000,
      // },
      // policies: {
      //   timestampGeneration:
      //     new timestampGeneration.MonotonicTimestampGenerator(1000, 1000),
      // },
    });
  }
  creatMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client === undefined) {
      this.creatClient();
    }

    return new mapping.Mapper(this.client, mappingOptions);
  }
}
