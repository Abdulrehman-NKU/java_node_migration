import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectConfigService {
  constructor(private prisma: Prisma_Service) {}

  async get_by_project_id(project_id: bigint) {
    const config = await this.prisma.project_config.findFirst({
      where: {
        project_id,
      },
    });

    if (config) return config;

    return this.prisma.project_config.create({
      data: {
        project_id,
        notes_config: '[]',
      },
    });
  }
}
