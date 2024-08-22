import { Module } from '@nestjs/common';
import { SystemConfigService } from './system_config.service';

@Module({
  providers: [SystemConfigService],
  exports: [SystemConfigService],
})
export class SystemConfigModule {}
