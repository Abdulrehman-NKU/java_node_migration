import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';

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
}
