import { Module } from '@nestjs/common';
import { JWT_Strategy } from './jwt.strategy';
import { Jwt_Auth_Gurad } from './jwt_auth.guard';
import { Prisma_Module } from 'src/prisma/prisma.module';

@Module({
  imports: [Prisma_Module],
  providers: [JWT_Strategy, Jwt_Auth_Gurad],
  exports: [JWT_Strategy, Jwt_Auth_Gurad],
})
export class AuthModule {}
