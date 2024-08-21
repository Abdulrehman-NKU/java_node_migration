import { Module } from '@nestjs/common';
import { ProjectUserService } from './project_user.service';

@Module({
  providers: [ProjectUserService],
  exports: [ProjectUserService],
})
export class ProjectUserModule {}
