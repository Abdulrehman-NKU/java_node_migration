import {
  Injectable,
  ForbiddenException,
  NotImplementedException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Add_Project_User_Request_DTO } from '../dto/add_project_user_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';

@Injectable()
export class ProjectUserService {
  constructor(private prisma: Prisma_Service) {}

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
    return this.prisma.project_user.create({
      data: {
        project_id: projectId,
        user_id: userId,
      },
    });
  }

  async delete_user(
    { projectId, userId }: Add_Project_User_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    // Todo: Logic wasn't very understandable
    throw new NotImplementedException({ message: 'Not implemented yet!' });
  }
}
