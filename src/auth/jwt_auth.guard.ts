import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class Jwt_Auth_Gurad extends AuthGuard('jwt') {
  constructor(private prisma_service: Prisma_Service) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;
    const { user: jwt_decrypted_payload } = context.switchToHttp().getRequest();
    const user = await this.prisma_service.users.findFirst({
      where: {
        id: jwt_decrypted_payload.id,
      },
    });
    if (!user)
      throw new UnauthorizedException({ message: 'Not authenticated!' });
    else if (user.password !== jwt_decrypted_payload.password)
      throw new ForbiddenException({
        messge: "Please re_login, this token can't be used anymore",
      });
    return true;
  }
}
