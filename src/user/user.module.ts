import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Password_Service } from './password.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwt_constants } from 'src/Constants';
import { UserRoleModule } from 'src/user_role/user_role.module';

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
    UserRoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, Password_Service, JwtService],
})
export class UserModule {}
