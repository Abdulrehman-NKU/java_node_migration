import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CONSTANT, Role_Category, Roles } from 'src/Constants';
import { RoleUserService } from 'src/role_user/role_user.service';
import { SystemConfigService } from 'src/system_config/system_config.service';
import {
  Prisma_Transaction,
  user_with_role_and_urls_with_id_as_bigInt,
} from 'src/types';
import { Util_Service } from 'src/util/util.service';
import { Delete_Team_User_Request_DTO } from './dto/delete_team_user_request.dto';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Exit_Team_Request_DTO } from './dto/exit_team_request_dto';
import { TeamInviteCodeService } from '../team_invite_code/team_invite_code.service';
import { TeamService } from '../team.service';
import { Team_Invite_Code, Team_Status } from '../team.enum';
import { Assign_Role_To_Team_User_Request_DTO } from './dto/assign_team_user_role.request.dto';
import { Remove_From_Team_Request_DTO } from './dto/remove_from_team.request.dto';

@Injectable()
export class TeamUserService {
  constructor(
    private prisma: Prisma_Service,
    private system_config_service: SystemConfigService,
    private role_user_service: RoleUserService,
    private util_service: Util_Service,
    private team_invite_code_service: TeamInviteCodeService,
    @Inject(forwardRef(() => TeamService))
    private team_service: TeamService,
  ) {}

  async add(
    team_id: bigint,
    user_id: bigint,
    tx: Prisma_Transaction = null,
    role_id: bigint = null,
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

      await this.role_user_service.add(
        {
          roleId: role_id ?? BigInt(val),
          userId: user_id,
          businessId: team_id,
          categoryId: BigInt(Role_Category.team_role),
        },
        tx,
      );

      return team_user;
    }, tx);
  }

  async join_team(
    code: string,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const invite_code = await this.team_invite_code_service.check_code_is_valid(
      BigInt(code.split('-')[0]),
      BigInt(Team_Invite_Code.Code),
    );

    await this.team_service.check_status_is_not_deleted(invite_code.team_id);

    return this.add(
      invite_code.team_id,
      user.id,
      null,
      BigInt(Roles.team_member),
    );
  }

  async exit(
    { teamId }: Exit_Team_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const team = await this.team_service.check_team_exists(teamId);
    if (team.create_id === user.id)
      throw new ForbiddenException({
        message: 'The founder can only disband the team',
      });

    const team_user = await this.prisma.team_user.findFirst({
      where: {
        team_id: teamId,
        user_id: user.id,
      },
    });
    if (team_user === null)
      throw new ConflictException({
        message: 'The member has left the team, please refresh',
      });

    await this.util_service.use_tranaction(async (tx) => {
      await tx.team_user.delete({
        where: {
          id: team_user.id,
        },
      });

      return await this.role_user_service.remove_user_role(
        {
          userId: user.id,
          businessId: team.id,
          categortyId: BigInt(Role_Category.team_role),
        },
        tx,
      );
    });
  }

  async remove({ id: team_id, userId }: Remove_From_Team_Request_DTO) {
    const team = await this.team_service.check_team_exists(team_id);
    if (team.create_id === userId)
      throw new ForbiddenException({
        message: 'The founder can only disband the team',
      });

    const team_user = await this.prisma.team_user.findFirst({
      where: {
        team_id,
        user_id: userId,
      },
    });
    if (team_user === null)
      throw new NotFoundException({
        message: 'The member has left the team, please refresh',
      });

    await this.util_service.use_tranaction(async (tx) => {
      await tx.team_user.delete({
        where: {
          id: team_user.id,
        },
      });

      return await this.role_user_service.remove_user_role(
        {
          userId: userId,
          businessId: team.id,
          categortyId: BigInt(Role_Category.team_role),
        },
        tx,
      );
    });
  }

  async get_all_team_users(team_id: bigint) {
    return await this.prisma.team_user.findMany({
      where: {
        team_id,
      },
      include: {
        user: {
          include: {
            role_user: {
              where: {
                category_id: Role_Category.team_role,
                business_id: team_id,
              },
              include: {
                role: true,
                category: true,
              },
            },
          },
        },
      },
    });
  }

  async get_user_team_members(user: user_with_role_and_urls_with_id_as_bigInt) {
    const team_ids = (
      await this.prisma.team_user.findMany({
        where: {
          team: {
            status: {
              not: Team_Status.delete,
            },
          },
          user_id: user.id,
        },
      })
    ).map((t_user) => t_user.team_id);

    const team_users = await this.prisma.team_user.findMany({
      distinct: ['user_id'],
      where: {
        team_id: {
          in: team_ids,
        },
      },
      include: {
        user: true,
      },
    });
    return team_users.map(({ user }) => ({
      id: user.id,
      account: user.account,
    }));
  }

  async update_role(
    { teamId, userId, roleId }: Assign_Role_To_Team_User_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const team = await this.team_service.check_team_exists(teamId);

    if (team.create_id !== user.id)
      throw new ForbiddenException({
        message:
          'The operation failed, you do not have permission to perform the operation!',
      });

    await this.system_config_service.get_by_code(CONSTANT.TeamCreateRoleIdCode);

    return this.role_user_service.update({
      userId,
      roleId,
      businessId: teamId,
      categoryId: BigInt(Role_Category.team_role),
    });
  }
}
