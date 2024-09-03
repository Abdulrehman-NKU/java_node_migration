import {
  Injectable,
  ForbiddenException,
  NotImplementedException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { CONSTANT, Role_Category, Roles } from 'src/Constants';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { RoleUserService } from 'src/role_user/role_user.service';
import {
  Add_Project_User_Request_DTO,
  Get_Project_User_Role_Request_DTO,
} from './dto/add_project_user_request.dto';
import { Util_Service } from 'src/util/util.service';

@Injectable()
export class ProjectUserService {
  constructor(
    private prisma: Prisma_Service,
    private system_config_service: SystemConfigService,
    private role_user_service: RoleUserService,
    private util_service: Util_Service,
  ) {}

  async get_by_project_id(project_id: bigint) {
    return this.prisma.project_user.findMany({
      where: {
        project_id,
      },
    });
  }

  async add_user(
    { projectId, userId }: Add_Project_User_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (project.creator_id !== user.id)
      throw new ForbiddenException({
        message: "You don't have permission to perform this action",
      });

    const project_member = await this.prisma.project_user.findFirst({
      where: {
        project_id: projectId,
        user_id: userId,
      },
    });
    if (project_member)
      throw new ConflictException({ message: 'Member already exists!' });

    return await this.util_service.use_tranaction(async (tx) => {
      await this.prisma.project_user.create({
        data: {
          project_id: projectId,
          user_id: userId,
        },
      });

      return await this.role_user_service.add(
        {
          userId,
          roleId: BigInt(Roles.project_member),
          businessId: projectId,
          categoryId: BigInt(Role_Category.project_role),
        },
        tx,
      );
    });
  }

  async delete_user(
    { projectId, userId }: Add_Project_User_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    // Todo: Logic wasn't very understandable
    throw new NotImplementedException({ message: 'Not implemented yet!' });
  }

  async add_user_role(
    { projectId, roleId, userId }: Get_Project_User_Role_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    if (user.id === userId) {
      throw new ForbiddenException({
        message:
          "Operation failed, you don't have permission to perform this action, you cannot authorize yourself!",
      });
    }
    const { val } = await this.system_config_service.get_by_code(
      CONSTANT.ProjectCreateRoleIdCode,
      String(Roles.project_creator),
    );

    if (!val)
      throw new BadRequestException({
        message: 'Creator role ID is not configured!',
      });
    else if (BigInt(val) === roleId)
      throw new ForbiddenException({
        message: 'Cannot assign the creator role!',
      });

    try {
      return this.role_user_service.add({
        roleId,
        userId,
        categoryId: BigInt(Role_Category.project_role),
        businessId: projectId,
      });
    } catch (error) {
      console.log(error, 'Error role_user_service.add');
      throw new InternalServerErrorException({ message: 'Failed to set role' });
    }
  }
}
