import { Module } from '@nestjs/common';
import { ProjectConfigService } from './project_config.service';

@Module({
  providers: [ProjectConfigService],
  exports: [ProjectConfigService],
})
export class ProjectConfigModule {}
