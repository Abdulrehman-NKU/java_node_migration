import { Module } from '@nestjs/common';
import { TeamInviteCodeService } from './team_invite_code.service';

@Module({
  providers: [TeamInviteCodeService],
  exports: [TeamInviteCodeService],
})
export class TeamInviteCodeModule {}
