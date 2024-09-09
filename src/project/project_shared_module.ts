import { Module } from '@nestjs/common';
import { ProjectConfigModule } from 'src/project/project_config/project_config.module';
import { ProjectUserModule } from './project_user/project_user.module';
import { ProjectSceneModule } from './project_scene/project_scene.module';
import { SystemConfigModule } from 'src/system_config/system_config.module';
import { RoleUserModule } from 'src/role_user/role_user.module';
import { ProjectTagModule } from './project_tag/project_tag.module';
import { ProjectModule } from './project.module';

@Module({
  imports: [
    ProjectModule,
    ProjectConfigModule,
    ProjectUserModule,
    ProjectSceneModule,
    SystemConfigModule,
    RoleUserModule,
    ProjectTagModule,
  ],
  exports: [
    ProjectModule,
    ProjectConfigModule,
    ProjectUserModule,
    ProjectSceneModule,
    SystemConfigModule,
    RoleUserModule,
    ProjectTagModule,
  ],
})
export class ProjectSharedModule {}
