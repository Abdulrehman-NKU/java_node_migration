import { Injectable } from '@nestjs/common';
import { role_user } from '@prisma/client';
import { Prisma_Service } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma_service: Prisma_Service) {}

  find_user_roles_by_user_id(user_id: number | bigint) {
    return this.prisma_service.role_user.findMany({
      where: {
        user_id,
      },
    });
  }

  find_roles_fun_api(user_roles: role_user[]) {
    return this.prisma_service.fun_api.findMany({
      where: {
        category: {
          in: user_roles.map((r) => Number(r.category_id)),
        },
      },
      select: {
        url: true,
      },
      distinct: ['id'],
    });
  }
}
