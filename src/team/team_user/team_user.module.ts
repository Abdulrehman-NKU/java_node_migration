import { TeamModule } from './../team.module';
import { Module, forwardRef } from '@nestjs/common';
import { TeamUserController } from './team_user.controller';
import { TeamUserService } from './team_user.service';
import { SystemConfigModule } from 'src/system_config/system_config.module';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { RoleUserModule } from 'src/role_user/role_user.module';
import { RoleUserService } from 'src/role_user/role_user.service';
import { TeamInviteCodeModule } from '../team_invite_code/team_invite_code.module';
import { TeamInviteCodeService } from '../team_invite_code/team_invite_code.service';
import { TeamService } from '../team.service';

@Module({
  imports: [SystemConfigModule, RoleUserModule, TeamInviteCodeModule],
  controllers: [TeamUserController],
  providers: [
    TeamUserService,
    SystemConfigService,
    RoleUserService,
    TeamInviteCodeService,
    TeamService,
  ],
  exports: [TeamUserService],
})
export class TeamUserModule {}
