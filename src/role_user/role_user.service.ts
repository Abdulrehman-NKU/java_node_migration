import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Util_Service } from 'src/util/util.service';
import { Role_To_User_Request_DTO } from './dto/role_to_user.request.dto';
import { Prisma_Transaction } from 'src/types';

@Injectable()
export class RoleUserService {
  constructor(private prisma: Prisma_Service) {}

  async add(
    { userId, roleId, categoryId, businessId }: Role_To_User_Request_DTO,
    tx: Prisma_Transaction = this.prisma,
  ) {
    return tx.role_user.create({
      data: {
        role_id: roleId,
        user_id: userId,
        category_id: categoryId,
        business_id: businessId,
      },
    });
  }
}
