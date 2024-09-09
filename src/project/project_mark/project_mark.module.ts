import { Module } from '@nestjs/common';
import { ProjectMarkController } from './project_mark.controller';
import { ProjectMarkService } from './project_mark.service';
import { ProjectSharedModule } from '../project_shared_module';

@Module({
  imports: [ProjectSharedModule],
  providers: [ProjectMarkService],
  controllers: [ProjectMarkController],
})
export class ProjectMarkModule {}
