import { Module } from '@nestjs/common';
import { ProjectTagService } from './project_tag.service';
import { ProjectTagController } from './project_tag.controller';

@Module({
  controllers: [ProjectTagController],
  providers: [ProjectTagService],
  exports: [ProjectTagService],
})
export class ProjectTagModule {}
