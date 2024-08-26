import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CONSTANT, Role_Category } from 'src/Constants';
import { RoleUserService } from 'src/role_user/role_user.service';
import { SystemConfigService } from 'src/system_config/system_config.service';
import {
  Prisma_Transaction,
  user_with_role_and_urls_with_id_as_bigInt,
} from 'src/types';
import { Util_Service } from 'src/util/util.service';
import { Delete_Team_User_Request_DTO } from './dto/delete_team_user_request.dto';
import { Prisma_Service } from 'src/prisma/prisma.service';

@Injectable()
export class TeamUserService {
  constructor(
    private prisma: Prisma_Service,
    private system_config_service: SystemConfigService,
    private role_user_service: RoleUserService,
    private util_service: Util_Service,
  ) {}

  async add_user(
    team_id: bigint,
    user_id: bigint,
    tx: Prisma_Transaction = null,
  ) {
    return this.util_service.use_tranaction(async (tx) => {
      const check_user = await tx.team_user.findFirst({
        where: {
          team_id,
          user_id,
        },
      });

      if (check_user)
        throw new ConflictException({
          message: 'Member is already in the team',
        });

      const team_user = await tx.team_user.create({
        data: {
          team_id,
          user_id,
        },
      });

      const { val } = await this.system_config_service.get_by_code(
        CONSTANT.TeamConventionalRoleIdCode,
        undefined,
        tx,
      );

      await this.role_user_service.add({
        roleId: BigInt(val),
        userId: user_id,
        businessId: team_id,
        categoryId: BigInt(Role_Category.team_role),
      });

      return team_user;
    }, tx);
  }

  async remove_user(
    { id, userId }: Delete_Team_User_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const team = this.prisma.team.findFirst({
      where: {
        Id: id,
      },
    });

    if (team) throw new NotFoundException({ message: 'Team does not exist' });
  }
}
