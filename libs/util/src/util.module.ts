import { Global, Module } from '@nestjs/common';
import { UtilCommon } from './util-common';
@Global()
@Module({
  providers: [UtilCommon],
  exports: [UtilCommon],
})
export class UtilModule {}
