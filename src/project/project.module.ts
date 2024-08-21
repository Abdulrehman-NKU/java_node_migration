import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectConfigService } from 'src/project/project_config/project_config.service';
import { ProjectConfigModule } from 'src/project/project_config/project_config.module';
import { ProjectUserService } from './project_user/project_user.service';
import { ProjectUserModule } from './project_user/project_user.module';
import { ProjectSceneModule } from './project_scene/project_scene.module';
import { ProjectSceneService } from './project_scene/project_scene.service';

@Module({
  imports: [ProjectConfigModule, ProjectUserModule, ProjectSceneModule],
  providers: [
    ProjectService,
    ProjectUserService,
    ProjectConfigService,
    ProjectSceneService,
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
