import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Add_Empty_Project_Request_DTO } from './dto/add_empty_project_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Category_Enum, Project_Enum } from './project.enum';
import moment from 'moment';
import { Util_Service } from 'src/util/util.service';
import { Edit_Project_Request_DTO } from './dto/edit_project_request_dto';
import { Get_Project_By_Id_Request_DTO } from './dto/get_project_by_id_request.dto';
import { ProjectConfigService } from 'src/project/project_config/project_config.service';
import { ProjectUserService } from './project_user/project_user.service';
import { ProjectSceneService } from './project_scene/project_scene.service';
import { Get_Project_By_Id_Response_DTO } from './dto/get_project_by_id_response.dto';
import { Get_All_Project_Request_DTO } from './dto/get_all_project_request.dto';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
    private project_user_service: ProjectUserService,
    private project_config_service: ProjectConfigService,
    private project_scene_service: ProjectSceneService,
  ) {}

  async add_empty(
    { category }: Add_Empty_Project_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    if (!category) category = Category_Enum.CATEGORY_IMG;

    this.prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          project_no:
            moment().format('yyyyMMddHHmmss') +
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

      /**
       * Todo: Some SystemCofigApi logic
       *
       * And throw some exceptions based on that
       * 
       * 
        String val = systemConfigApi.getByCode(CONSTANT.ProjectCreateRoleIdCode, "");
        if (val.isEmpty()) {
            // The creator's role ID is not configured!
            throw new BusinessException("未配置创建者的角色Id！");
        }
        if (!roleApi.setRole(Long.valueOf(val), Long.valueOf(currUserId), Long.valueOf(1), project.getId(), true)) {
            // Character setup failed!
            throw new BusinessException("角色设置失败！");
        }

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

    const current_time = new Date();

    return this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        start_time: current_time,
        end_time: current_time,
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
    // Todo: Following code need to be modified
    response.users = [];
    response.autoCount = 0;
    response.manualCount = 0;
    response.markQuantity = 0;
    response.tags = [];
    return response;
  }

  async complete(id: bigint) {
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
    const project_user_p_ids = (
      await this.prisma.project_user.findMany({
        select: { project_id: true },
        where: { user_id: user.id },
      })
    ).map((user) => user.project_id);

    const where_clause: any = {
      status: { not: 99 },
      OR: [
        { creator_id: user.id },
        {
          id: {
            in: project_user_p_ids,
          },
        },
      ],
    };

    if (category) where_clause.category = category;

    if (value) {
      const projectIdsFromTags = (
        await this.prisma.project_tag.findMany({
          select: { project_id: true },
          where: {
            tag: {
              contains: value,
            },
          },
        })
      ).map((tag) => tag.project_id);

      where_clause.OR.push({
        OR: [
          {
            project_name: value,
          },
          {
            id: {
              in: projectIdsFromTags,
            },
          },
        ],
      });
    }

    const order_by = [];

    if (createTimeOrder) order_by.push({ create_time: createTimeOrder });

    if (updateTimeOrder) order_by.push({ last_update_time: updateTimeOrder });

    const projects = await this.prisma.project.findMany({
      distinct: ['id'],
      select: {
        id: true,
        create_time: true,
        project_no: true,
        project_name: true,
        config: true,
        status: true,
        remarks: true,
        creator_id: true,
        start_time: true,
        last_update_time: true,
        end_time: true,
        category: true,
        scene_category: true,
      },
      where: where_clause,
      orderBy: order_by,
    });

    return projects;
  }

  quick() {}

  del() {}

  add_user() {}

  delete_user() {}

  role() {}
}
