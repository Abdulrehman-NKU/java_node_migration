import { Module } from '@nestjs/common';
import { RoleUserService } from './role_user.service';

@Module({
  providers: [RoleUserService],
  exports: [RoleUserService],
})
export class RoleUserModule {}
