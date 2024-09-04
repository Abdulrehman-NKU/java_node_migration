import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Add_Empty_Project_Request_DTO } from './dto/add_empty_project_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Category_Enum, Project_Enum } from './project.enum';
import * as moment from 'moment';
import { Util_Service } from 'src/util/util.service';
import { Edit_Project_Request_DTO } from './dto/edit_project_request_dto';
import { Get_Project_By_Id_Request_DTO } from './dto/get_project_by_id_request.dto';
import { ProjectConfigService } from 'src/project/project_config/project_config.service';
import { ProjectUserService } from './project_user/project_user.service';
import { ProjectSceneService } from './project_scene/project_scene.service';
import { Get_Project_By_Id_Response_DTO } from './dto/get_project_by_id_response.dto';
import { Get_All_Project_Request_DTO } from './dto/get_all_project_request.dto';
import { SystemConfigService } from 'src/system_config/system_config.service';
import { CONSTANT, Role_Category, Roles } from 'src/Constants';
import { RoleUserService } from 'src/role_user/role_user.service';
import { project_user, role, role_user, users } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
    private project_user_service: ProjectUserService,
    private project_config_service: ProjectConfigService,
    private project_scene_service: ProjectSceneService,
    private system_config_service: SystemConfigService,
    private role_user_service: RoleUserService,
  ) {}

  private async get_user_with_fun_list(
    project_users: project_user_with_role_user_and_role[],
    authenticated_user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const users = [];

    const logged_in_user_role_id = (
      await this.prisma.role_user.findFirst({
        where: {
          user_id: authenticated_user.id,
          business_id: project_users[0].project_id,
          category_id: BigInt(Role_Category.project_role),
        },
        include: {
          role: true,
        },
      })
    ).role.id;

    for (const { user_id, user } of project_users) {
      const project_user_role = user.role_user[0].role;

      const fun_api_list = (
        await this.role_user_service.find_fun_api_by_role_id(
          project_user_role.id,
        )
      ).map(({ fun_api }) => fun_api);

      const filter_fun_list = (urls_list: string[]) => {
        console.log({ urls_list, fun_api_list, project_user_role });
        users.push({
          userId: user_id,
          userAccount: user.account,
          roleName: user.role_user.length ? user.role_user[0].role.name : '',
          funList: fun_api_list.filter(({ url }) => urls_list.includes(url)),
        });
      };

      console.log({ authenticated_user, user_id, project_user_role });

      if (
        authenticated_user.id === user_id &&
        project_user_role.id === BigInt(Roles.project_creator)
      )
        filter_fun_list(['Project#del']);
      else if (authenticated_user.id === user_id)
        filter_fun_list(['Project#exit']);
      else if (
        logged_in_user_role_id === BigInt(Roles.project_manager) &&
        project_user_role.id === BigInt(Roles.project_member)
      )
        filter_fun_list(['Project#remove']);
      else if (logged_in_user_role_id === BigInt(Roles.project_creator)) {
        if (project_user_role.id === BigInt(Roles.project_member))
          filter_fun_list(['Project#manager', 'Project#remove']);
        else if (project_user_role.id === BigInt(Roles.project_manager))
          filter_fun_list(['Project#removeManager', 'Project#remove']);
        else filter_fun_list([]);
      } else filter_fun_list([]); // Handling some unexpected_case
    }

    return users;
  }

  async add_empty(
    { category }: Add_Empty_Project_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    if (!category) category = Category_Enum.CATEGORY_IMG;

    return await this.util_service.use_tranaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          project_no:
            moment().format('YYYYMMDDHHmmss') +
            this.util_service.createRandomCode(6),
          status: Project_Enum.STATUS_INIT,
          category: category,
          creator_id: user.id,
          scene_category: BigInt(0),
        },
      });

      await tx.project_user.create({
        data: {
          project_id: project.id,
          user_id: user.id,
        },
      });

      const { val } = await this.system_config_service.get_by_code(
        CONSTANT.ProjectCreateRoleIdCode,
        undefined,
        tx,
      );

      if (!val)
        throw new BadRequestException({
          message: 'Creator role ID is not configured!',
        });

      try {
        await this.role_user_service.add(
          {
            roleId: BigInt(val),
            userId: user.id,
            categoryId: BigInt(Role_Category.project_role),
            businessId: project.id,
          },
          tx,
        );
      } catch (error) {
        console.log(error, 'Error role_user_service.add');
        throw new InternalServerErrorException({
          message: 'Character setup failed!',
        });
      }

      /**
       * Todo: Some Images Logic logic
       *
       * And throw some exceptions based on that

        if (request.getMarkData() != null && request.getMarkData().size() > 0) {
          request.getMarkData().forEach(e -> projectImageService.add(project.getId(), e));
      }
      */

      return project;
    });
  }

  async edit({
    sceneCategory,
    projectName,
    id,
    remarks,
    startTime,
    endTime,
  }: Edit_Project_Request_DTO) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: BigInt(id),
      },
    });

    if (!project)
      throw new NotFoundException({ message: 'Project does not exist' });
    else if (project.status === Project_Enum.STATUS_DELETE)
      throw new BadRequestException({ message: 'Project has been deleted' });

    return this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        start_time: startTime ? new Date(startTime) : startTime,
        end_time: endTime ? new Date(endTime) : endTime,
        project_name: projectName,
        remarks,
        ...(sceneCategory
          ? {
              scene_category: BigInt(sceneCategory),
            }
          : {}),
      },
    });
  }

  async by_id(
    { id }: Get_Project_By_Id_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
      },
      include: {
        project_user: {
          include: {
            user: {
              include: {
                role_user: {
                  where: {
                    business_id: id,
                    category_id: Role_Category.project_role,
                  },
                  include: {
                    role: true,
                  },
                },
              },
            },
          },
        },
        project_tag: true,
      },
    });

    if (!project)
      throw new NotFoundException({ message: 'Project does not exist' });
    else if (project.status === Project_Enum.STATUS_DELETE)
      throw new BadRequestException({ message: 'Project has been deleted' });

    const project_users = await this.project_user_service.get_by_project_id(id);
    if (
      project_users.some((p) => p.user_id === user.id) === false &&
      project.creator_id !== user.id
    )
      throw new ForbiddenException({
        message: 'Projects is not your own creation or participation',
      });

    let response = new Get_Project_By_Id_Response_DTO();

    const project_config =
      await this.project_config_service.get_by_project_id(id);

    const project_scene = project.scene_category
      ? await this.project_scene_service.get_by_id(project.scene_category)
      : null;

    if (project_scene) {
      response.notesConfig = project_scene.notes;
      project_config.notes_config = project_scene.notes;
    }

    response = { ...response, ...project, ...project_config };
    response.createTime = project.create_time;
    response.scene = project_scene;
    response.users = await this.get_user_with_fun_list(
      project.project_user,
      user,
    );
    // @ts-ignore
    delete response.project_user;

    response.tags = project.project_tag;

    // Todo: Following Count and Quantity logic is pending
    response.autoCount = 0;
    response.manualCount = 0;
    response.markQuantity = 0;

    return this.util_service.snake_to_camel_case_the_object_fields(response);
  }

  // Modification: Added a check only project owner can mark it as completed
  async complete(id: bigint, user: user_with_role_and_urls_with_id_as_bigInt) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (project.creator_id !== user.id)
      throw new ForbiddenException({
        message: 'User is not allowed to perform this action',
      });

    return this.prisma.project.update({
      where: {
        id,
      },
      data: {
        status: Project_Enum.STATUS_COMPLETE,
      },
    });
  }

  async get_all(
    {
      category,
      value,
      createTimeOrder,
      updateTimeOrder,
    }: Get_All_Project_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const where_clause: any = {
      status: { not: Project_Enum.STATUS_DELETE },
      AND: [
        {
          OR: [
            {
              creator_id: user.id,
            },
            {
              project_user: {
                some: {
                  user_id: user.id,
                },
              },
            },
          ],
        },
      ],
    };

    if (category) where_clause.AND.push({ category });

    if (value)
      where_clause.AND.push({
        OR: [
          {
            project_name: {
              contains: value,
            },
          },
          {
            project_tag: {
              some: {
                tag: {
                  contains: value,
                },
              },
            },
          },
        ],
      });

    const order_by = [];
    if (createTimeOrder) order_by.push({ create_time: createTimeOrder });
    if (updateTimeOrder) order_by.push({ last_update_time: updateTimeOrder });

    const projects = await this.prisma.project.findMany({
      distinct: ['id'],
      include: {
        project_tag: true,
      },
      where: where_clause,
      orderBy: order_by,
    });

    return projects.map((project) =>
      this.util_service.snake_to_camel_case_the_object_fields(project, {
        project_tag: 'tags',
      }),
    );
  }

  async quick(
    page_size: number,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const projects = await this.prisma.project.findMany({
      where: {
        status: { not: Project_Enum.STATUS_DELETE },
        OR: [
          {
            creator_id: user.id,
          },
          {
            project_user: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },
      orderBy: [{ id: 'desc' }],
      take: page_size,
    });
    return projects.map((project) =>
      this.util_service.snake_to_camel_case_the_object_fields(project),
    );
  }

  async del(
    project_id: bigint,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: project_id,
      },
    });

    if (project.creator_id !== user.id)
      throw new ForbiddenException({
        message:
          'You are not the project creator and cannot perform this operation!',
      });

    // Todo: Some DataRecordLogService code line I ignored

    return this.prisma.project.update({
      where: {
        id: project_id,
      },
      data: {
        status: Project_Enum.STATUS_DELETE,
      },
    });
  }
}

interface project_user_with_role_user_and_role extends project_user {
  user: users & {
    role_user: (role_user & { role: role })[];
  };
}
