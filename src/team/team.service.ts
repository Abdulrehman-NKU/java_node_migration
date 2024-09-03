import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Create_Team_Request_DTO } from './dto/create_team_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Team_Invite_Code, Team_Status } from './team.enum';
import { Util_Service } from 'src/util/util.service';
import { TeamUserService } from './team_user/team_user.service';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { CONSTANT, Role_Category, Roles } from 'src/Constants';
import { RoleUserService } from 'src/role_user/role_user.service';
import { Edit_Team_Request_DTO } from './dto/edit_team_request.dto';
import { Edit_Team_Name_Request_DTO } from './dto/edit_team_name_request.dto';
import { Edit_Team_Remarks_Request_DTO } from './dto/edit_team_remarks_request.dto';
import * as moment from 'moment';
import { Tranfer_Team_User_Role_Request_DTO } from './dto/transfer_team_user_role_request.dto';
import { role, team, team_invite_code } from '@prisma/client';
import { Reload_Invite_Code_Request_DTO } from './dto/reload_invite_code_request.dto';
import { TeamInviteCodeService } from './team_invite_code/team_invite_code.service';

@Injectable()
export class TeamService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
    private team_user_service: TeamUserService,
    private system_config_service: SystemConfigService,
    private role_user_service: RoleUserService,
    private team_invite_code_service: TeamInviteCodeService,
  ) {}

  async check_team_exists(id: bigint) {
    const team = await this.prisma.team.findFirst({
      where: {
        id,
      },
    });

    if (!team)
      throw new NotFoundException({ message: 'Team does not exists!' });

    return team;
  }

  private async check_name_conflict(name: string) {
    const team = await this.prisma.team.findFirst({
      where: {
        name,
      },
    });

    if (team) throw new ConflictException({ message: 'Name already exists!' });
    return team;
  }

  private async check_user_is_the_team_creator(
    team_id: bigint,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const team = await this.prisma.team.findFirst({
      where: {
        id: team_id,
      },
    });

    if (team.create_id !== user.id)
      throw new ForbiddenException({
        message: 'You dont have the permission, you are not the team creator!',
      });

    return team;
  }

  async check_status_is_not_deleted(id: bigint) {
    const team = await this.prisma.team.findFirst({
      where: {
        id,
      },
    });

    if (team.status === Team_Status.delete)
      throw new ForbiddenException({ message: 'The team has been disbanded' });

    return team;
  }

  async get_all() {
    return this.prisma.team.findMany();
  }

  async create(
    { name, remarks, teamSize, tradeName }: Create_Team_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const check_team = await this.prisma.team.findFirst({
      where: {
        name: name,
      },
    });

    if (check_team)
      throw new ConflictException({ message: 'Team name already exists' });

    return this.util_service.use_tranaction(async (tx) => {
      const team = await tx.team.create({
        data: {
          name,
          trade_name: tradeName,
          team_size: teamSize,
          remarks,
          status: Team_Status.init,
          create_id: user.id,
        },
      });

      await this.team_user_service.add(
        team.id,
        user.id,
        tx,
        BigInt(Roles.team_creator),
      );

      return team;
    });
  }

  async update({
    id,
    name,
    remarks,
    teamSize,
    tradeName,
  }: Edit_Team_Request_DTO) {
    // Todo: Need user authorization to update team --new
    await this.check_name_conflict(name);
    await this.check_status_is_not_deleted(id);

    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
        remarks,
        team_size: teamSize,
        trade_name: tradeName,
      },
    });
  }

  async update_name({ id, name }: Edit_Team_Name_Request_DTO) {
    await this.check_name_conflict(name);
    await this.check_status_is_not_deleted(id);
    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async update_remarks({ id, remarks }: Edit_Team_Remarks_Request_DTO) {
    await this.check_status_is_not_deleted(id);
    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        remarks,
      },
    });
  }

  private async get_fun_list_based_on_role_and_authentication({
    team_user_user_id,
    logged_in_user_role_id,
    logged_in_user,
    team_user_role,
  }: {
    team_user_user_id: bigint;
    logged_in_user_role_id: bigint;
    logged_in_user: user_with_role_and_urls_with_id_as_bigInt;
    team_user_role: role;
  }) {
    const fun_api_list = (
      await this.role_user_service.find_fun_api_by_role_id(team_user_role.id)
    ).map(({ fun_api }) => fun_api);

    const filter_fun_list = (urls_list: string[]) => {
      return fun_api_list.filter(({ url }) => urls_list.includes(url));
    };

    if (
      logged_in_user.id === team_user_user_id &&
      team_user_role.id !== BigInt(Roles.team_creator)
    )
      return filter_fun_list(['Team#exit']);
    else if (
      logged_in_user_role_id === BigInt(Roles.team_admin) &&
      team_user_role.id === BigInt(Roles.team_member)
    )
      return filter_fun_list(['Team#remove']);
    else if (logged_in_user_role_id === BigInt(Roles.team_creator)) {
      if (team_user_role.id === BigInt(Roles.team_member))
        return filter_fun_list(['Team#manager', 'Team#remove']);
      else if (team_user_role.id === BigInt(Roles.team_admin))
        return filter_fun_list(['Team#removeManager', 'Team#remove']);
    }
  }

  async get_by_id(id: bigint, user: user_with_role_and_urls_with_id_as_bigInt) {
    const team = await this.check_team_exists(id);

    const team_users = await this.team_user_service.get_all_team_users(team.id);

    const user_list_promises = [];

    const { id: logged_in_user_role_id } = (
      await this.prisma.role_user.findFirst({
        where: {
          user_id: user.id,
          business_id: id,
        },
        include: {
          role: true,
        },
      })
    ).role;

    for (const { user_id, user: t_user, create_time } of team_users) {
      const team_user_role = t_user.role_user[0].role;

      user_list_promises.push({
        userId: user_id,
        account: t_user.account,
        joinTime: create_time,
        nickName: t_user.nick_name,
        roleName: team_user_role.name,
        roleTag: team_user_role.tag,
        funList: await this.get_fun_list_based_on_role_and_authentication({
          logged_in_user: user,
          logged_in_user_role_id,
          team_user_role,
          team_user_user_id: user_id,
        }),
      });
    }

    const invite_code =
      (await this.team_invite_code_service.check_code_is_valid(
        id,
        BigInt(Team_Invite_Code.Code),
        true,
      )) ??
      (await this.team_invite_code_service.create_invite_code({
        id,
        category: BigInt(Team_Invite_Code.Code),
      }));

    const invite_link_code =
      (await this.team_invite_code_service.check_code_is_valid(
        id,
        BigInt(Team_Invite_Code.LinkUrl),
        true,
      )) ??
      (await this.team_invite_code_service.create_invite_code({
        id,
        category: BigInt(Team_Invite_Code.LinkUrl),
      }));

    const user_list = await Promise.all(user_list_promises);

    return this.util_service.snake_to_camel_case_the_object_fields({
      ...team,
      code: invite_code.code,
      inviteLinkUrlCode: invite_link_code.code,
      userList: user_list,
    });
  }

  async get_by_name(name: string) {
    return this.prisma.team.findFirst({
      where: {
        name,
      },
    });
  }

  async delete(id: bigint, user: user_with_role_and_urls_with_id_as_bigInt) {
    const team = await this.check_team_exists(id);

    if (team.create_id !== user.id)
      throw new ForbiddenException({
        message:
          'Failed to disband the team, you have no right to perform the operation',
      });

    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        name: team.name + '__' + moment(),
        status: Team_Status.delete,
      },
    });
  }

  async get_user_teams(user: user_with_role_and_urls_with_id_as_bigInt) {
    const teams = await this.prisma.team.findMany({
      where: {
        status: {
          not: Team_Status.delete,
        },
        team_user: {
          some: {
            user_id: user.id,
          },
        },
      },
      include: {
        _count: {
          select: {
            team_user: true,
          },
        },
        team_invite_code: true,
      },
    });

    return teams.map(({ _count, team_invite_code, ...rest }) =>
      this.util_service.snake_to_camel_case_the_object_fields({
        ...rest,
        userCount: _count.team_user,
        inviteCode: team_invite_code.length ? team_invite_code[0].code : '',
      }),
    );
  }

  async get_team_mates(user: user_with_role_and_urls_with_id_as_bigInt) {
    return this.team_user_service.get_user_team_members(user);
  }

  async transfer_creator_role_to_other_user(
    { teamId, userId }: Tranfer_Team_User_Role_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    await this.check_user_is_the_team_creator(teamId, user);
    await this.check_status_is_not_deleted(teamId);
    const team_user = await this.prisma.team_user.findFirst({
      where: {
        team_id: teamId,
        user_id: userId,
      },
    });
    if (!team_user)
      throw new NotFoundException({ message: 'Team user not found!' });

    const { val } = await this.system_config_service.get_by_code(
      CONSTANT.TeamCreateRoleIdCode,
    );
    // Assigning the creator role to the new user
    await this.role_user_service.add({
      roleId: BigInt(val),
      businessId: teamId,
      categoryId: BigInt(Role_Category.team_role),
      userId,
    });

    const { val: conventionalRoleVal } =
      await this.system_config_service.get_by_code(
        CONSTANT.TeamConventionalRoleIdCode,
      );

    // Assignint the conventionalRole to the current creator
    await this.role_user_service.add({
      roleId: BigInt(conventionalRoleVal),
      businessId: teamId,
      categoryId: BigInt(Role_Category.team_role),
      userId: user.id,
    });

    return this.prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        create_id: userId,
      },
    });
  }

  async reload_code({ id, category }: Reload_Invite_Code_Request_DTO) {
    await this.check_team_exists(id);
    const { code, team_id, create_time, ...rest } =
      await this.team_invite_code_service.create_invite_code(
        {
          id,
          category,
        },
        true,
      );

    return {
      ...rest,
      CreateTime: create_time,
      teamId: team_id,
      ...(category == BigInt(Team_Invite_Code.LinkUrl)
        ? { inviteLinkUrlCode: code }
        : { code }),
    };
  }
}
