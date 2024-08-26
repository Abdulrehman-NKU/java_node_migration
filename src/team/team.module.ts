import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamUserModule } from './team_user/team_user.module';
import { TeamUserService } from './team_user/team_user.service';
import { SystemConfigModule } from 'src/system_config/system_config.module';
import { RoleUserModule } from 'src/role_user/role_user.module';
import { TeamInviteCodeModule } from './team_invite_code/team_invite_code.module';

@Module({
  imports: [
    TeamUserModule,
    SystemConfigModule,
    RoleUserModule,
    TeamInviteCodeModule,
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamUserService],
})
export class TeamModule {}
