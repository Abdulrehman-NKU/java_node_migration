import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectConfigService } from 'src/project/project_config/project_config.service';
import { ProjectConfigModule } from 'src/project/project_config/project_config.module';
import { ProjectUserService } from './project_user/project_user.service';
import { ProjectUserModule } from './project_user/project_user.module';
import { ProjectSceneModule } from './project_scene/project_scene.module';
import { ProjectSceneService } from './project_scene/project_scene.service';
import { SystemConfigModule } from 'src/system_config/system_config.module';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { RoleUserModule } from 'src/role_user/role_user.module';
import { RoleUserService } from 'src/role_user/role_user.service';

@Module({
  imports: [
    ProjectConfigModule,
    ProjectUserModule,
    ProjectSceneModule,
    SystemConfigModule,
    RoleUserModule,
  ],
  providers: [
    ProjectService,
    ProjectUserService,
    ProjectConfigService,
    ProjectSceneService,
    SystemConfigService,
    RoleUserService,
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
