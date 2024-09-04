import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Util_Service } from 'src/util/util.service';
import { Role_To_User_Request_DTO } from './dto/role_to_user.request.dto';
import { Prisma_Transaction } from 'src/types';
import { role_user } from '@prisma/client';
import { Remove_User_Role_Request_DTO } from './dto/remove_user_role.request.dto';

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

  async update(
    { userId, roleId, categoryId, businessId }: Role_To_User_Request_DTO,
    tx: Prisma_Transaction = null,
  ) {
    return this.util_service.use_tranaction(async (tx) => {
      return tx.role_user.updateMany({
        where: {
          business_id: businessId,
          user_id: userId,
          category_id: categoryId,
        },
        data: {
          role_id: roleId,
        },
      });
    }, tx);
  }

  async remove_user_role(
    { userId, businessId, categortyId }: Remove_User_Role_Request_DTO,
    tx: Prisma_Transaction = null,
  ) {
    return this.util_service.use_tranaction(async (tx) => {
      return tx.role_user.deleteMany({
        where: {
          user_id: userId,
          business_id: businessId,
          category_id: categortyId,
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

  find_user_role_by_user_id_and_business_id(
    user_id: bigint,
    business_id: bigint,
    category_id: bigint,
  ) {
    return this.prisma.role_user.findFirst({
      where: {
        user_id,
        business_id,
        category_id,
      },
      include: {
        role: true,
      },
    });
  }

  async find_fun_api_by_role_id(role_id: bigint, category?: number) {
    return await this.prisma.role_fun_api.findMany({
      where: {
        role_id,
        // fun_api: {
        //   category,
        // },
      },
      include: {
        fun_api: true,
        role: true,
      },
    });
  }

  async find_fun_api_by_user_id(user_id: bigint, business_id: bigint) {
    const { role } = await this.prisma.role_user.findFirst({
      where: {
        business_id,
        user_id,
      },
      include: {
        role: true,
      },
    });

    return this.find_fun_api_by_role_id(role.id);
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
