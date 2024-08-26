import { Module } from '@nestjs/common';
import { TeamUserController } from './team_user.controller';
import { TeamUserService } from './team_user.service';
import { SystemConfigModule } from 'src/system_config/system_config.module';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { RoleUserModule } from 'src/role_user/role_user.module';
import { RoleUserService } from 'src/role_user/role_user.service';

@Module({
  imports: [SystemConfigModule, RoleUserModule],
  controllers: [TeamUserController],
  providers: [TeamUserService, SystemConfigService, RoleUserService],
  exports: [TeamUserService],
})
export class TeamUserModule {}
