import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Util_Service } from 'src/util/util.service';
import { Role_To_User_Request_DTO } from './dto/role_to_user.request.dto';
import { Prisma_Transaction } from 'src/types';
import { role_user } from '@prisma/client';

@Injectable()
export class RoleUserService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
  ) {}

  async add(
    { userId, roleId, categoryId, businessId }: Role_To_User_Request_DTO,
    tx: Prisma_Transaction = null,
  ) {
    return this.util_service.use_tranaction(async (tx) => {
      return tx.role_user.create({
        data: {
          role_id: roleId,
          user_id: userId,
          category_id: categoryId,
          business_id: businessId,
        },
      });
    }, tx);
  }

  find_user_roles_by_user_id(user_id: bigint) {
    return this.prisma.role_user.findMany({
      where: {
        user_id,
      },
    });
  }

  find_roles_fun_api(user_roles: role_user[]) {
    return this.prisma.fun_api.findMany({
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
