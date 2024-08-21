import { Module } from '@nestjs/common';
import { ProjectSceneService } from './project_scene.service';

@Module({
  providers: [ProjectSceneService],
  exports: [ProjectSceneService],
})
export class ProjectSceneModule {}
