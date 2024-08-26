import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Save_Or_Update_Project_Tag_Request_DTO } from './dto/create_project_tag_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';

@Injectable()
export class ProjectTagService {
  constructor(private prisma: Prisma_Service) {}

  async save_or_update_project_tag(
    { id, projectId, tag }: Save_Or_Update_Project_Tag_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    const project_tag = await this.prisma.project_tag.findFirst({
      where: {
        project_id: projectId,
        tag,
      },
    });
    if (project_tag)
      throw new ConflictException({ message: 'Duplicate tag name!' });
    if (id)
      return this.prisma.project_tag.update({
        where: {
          id,
        },
        data: {
          update_id: user.id,
          tag,
        },
      });
    else
      return this.prisma.project_tag.create({
        data: {
          project_id: projectId,
          create_id: user.id,
          tag,
        },
      });
  }

  async delete_project_tag(project_tag_id: bigint) {
    const tag = await this.prisma.project_tag.findFirst({
      where: {
        id: project_tag_id,
      },
    });

    if (tag)
      throw new BadRequestException({
        message: 'Project tag could not be found!',
      });

    await this.prisma.project.update({
      where: {
        id: tag.project_id,
      },
      data: {
        last_update_time: new Date(),
      },
    });
    return this.prisma.project_tag.delete({
      where: {
        id: project_tag_id,
      },
    });
  }
}
