import { Global, Module } from '@nestjs/common';
import { Util_Service } from './util.service';

@Global()
@Module({
  providers: [Util_Service],
  exports: [Util_Service],
})
export class Util_Module {}
