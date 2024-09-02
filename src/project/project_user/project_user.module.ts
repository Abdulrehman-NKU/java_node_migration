import { Module } from '@nestjs/common';
import { ProjectUserService } from './project_user.service';
import { ProjectUserController } from './project_user.controller';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { RoleUserService } from 'src/role_user/role_user.service';
import { SystemConfigModule } from 'src/system_config/system_config.module';
import { RoleUserModule } from 'src/role_user/role_user.module';

@Module({
  imports: [SystemConfigModule, RoleUserModule],
  controllers: [ProjectUserController],
  providers: [ProjectUserService, SystemConfigService, RoleUserService],
  exports: [ProjectUserService],
})
export class ProjectUserModule {}
