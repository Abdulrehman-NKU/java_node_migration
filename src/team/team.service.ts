import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Create_Team_Request_DTO } from './dto/create_team_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Team_Status } from './team.enum';
import { Util_Service } from 'src/util/util.service';
import { TeamUserService } from './team_user/team_user.service';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { CONSTANT, Role_Category } from 'src/Constants';
import { RoleUserService } from 'src/role_user/role_user.service';
import { Edit_Team_Request_DTO } from './dto/edit_team_request.dto';
import { Edit_Team_Name_Request_DTO } from './dto/edit_team_name_request.dto';
import { Edit_Team_Remarks_Request_DTO } from './dto/edit_team_remarks_request.dto';
import { Exit_Team_Request_DTO } from './dto/exit_team_request_dto';

@Injectable()
export class TeamService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
    private team_user_service: TeamUserService,
    private system_config_service: SystemConfigService,
    private role_user_service: RoleUserService,
  ) {}

  private async check_name_conflict(name: string) {
    const team = await this.prisma.team.findFirst({
      where: {
        name,
      },
    });

    if (team) throw new ConflictException({ message: 'Name already exists!' });
    return team;
  }

  private async check_status_is_not_deleted(id: bigint) {
    const team = await this.prisma.team.findFirst({
      where: {
        Id: id,
      },
    });

    if (team.status === Team_Status.delete)
      throw new ForbiddenException({ message: 'The team has been disbanded' });

    return team;
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

      await this.team_user_service.add_user(team.Id, user.id, tx);

      const { val } = await this.system_config_service.get_by_code(
        CONSTANT.TeamCreateRoleIdCode,
        undefined,
        tx,
      );

      await this.role_user_service.add({
        userId: user.id,
        categoryId: BigInt(Role_Category.project_role),
        businessId: team.Id,
        roleId: BigInt(val),
      });

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
        Id: id,
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
        Id: id,
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
        Id: id,
      },
      data: {
        remarks,
      },
    });
  }

  async exit_team(
    { teamId, userId }: Exit_Team_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const team = await this.prisma.team.findFirst({
      where: {
        Id: teamId,
      },
    });

    if (!team) throw new NotFoundException({ message: 'Team does not exist' });

    if (team.create_id === user.id)
      throw new ForbiddenException({
        message: 'The founder can only disband the team',
      });

    return;
  }
}
