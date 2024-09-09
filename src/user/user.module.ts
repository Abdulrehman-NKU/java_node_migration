import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Password_Service } from './password.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwt_constants } from 'src/Constants';
import { RoleUserModule } from 'src/role_user/role_user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwt_constants.secret,
      secretOrPrivateKey: jwt_constants.secret, // This does not work
      signOptions: {
        expiresIn: '30h',
      },
    }),
    RoleUserModule,
  ],
  controllers: [UserController],
  providers: [UserService, Password_Service, JwtService],
})
export class UserModule {}
