import { Module } from '@nestjs/common';
import { ProjectTagService } from './project_tag.service';

@Module({
  providers: [ProjectTagService],
  exports: [ProjectTagService],
})
export class ProjectTagModule {}
