import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectSceneService {
  constructor(private prisma: Prisma_Service) {}

  //scene_category of project belongs to project_scene
  async get_by_id(id: bigint) {
    return this.prisma.project_scene.findFirst({
      where: {
        id,
      },
    });
  }
}
