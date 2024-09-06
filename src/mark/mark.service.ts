import { Prisma_Service } from 'src/prisma/prisma.service';
import { Get_Project_Image_List_Request_DTO } from './dto/Get_Project_Image_List_Request_DTO';
import { Injectable } from '@nestjs/common';
import { cut_data, point_data, rect_data } from '@prisma/client';
import { Util_Service } from 'src/util/util.service';
import { Project_Mark } from './enum/project_mark.enum';

@Injectable()
export class MarkService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
  ) {}

  async get_project_images_by_project_id({
    status,
    classId,
    projectId,
    projectIds = [],
    currentPage,
    pageSize,
    orderCreateTime,
  }: Get_Project_Image_List_Request_DTO) {
    if (status === 0 || status === -1) status = null;

    /**
     * Note: Todo: Some logic is purged that uses the classId
     *
     * Don't know the use case right now
     */

    // const image_ids = [];

    // if (classId === BigInt(-2)) {
    //   const [rects, cuts, points] = [
    //     await this.get_marks_via_project_id<rect_data[]>(
    //       projectId,
    //       'rect_data',
    //     ),
    //     await this.get_marks_via_project_id<cut_data[]>(projectId, 'cut_data'),
    //     await this.get_marks_via_project_id<point_data[]>(
    //       projectId,
    //       'point_data',
    //     ),
    //   ];
    // }

    const { records, count } = await this.util_service.use_tranaction(
      async (tx) => {
        const where = {
          project_id: {
            in: projectId ? [projectId] : projectIds,
          },
          status: {
            not: Project_Mark.DELETE,
          },
        };

        const records = await tx.project_image.findMany({
          where,
          orderBy: {
            ...(orderCreateTime
              ? {
                  create_time: 'asc',
                }
              : {}),
          },
          take: pageSize,
          skip: pageSize * currentPage,
        });

        const count = await tx.project_image.count({
          where,
        });

        return {
          records,
          count,
        };
      },
    );

    return {
      records: records
        .map((r) => this.util_service.snake_to_camel_case_the_object_fields(r))
        .map((r) => ({
          ...r,
          rectDataList: null,
          file_attributes: '{}',
          markList: null,
          manualCount: null,
          cutCount: null,
          pointCount: null,
          autoCount: null,
          updateName: null,
          updateTime: null,
        })),
      current: currentPage,
      size: pageSize,
      total: count, // Total Number of Images
      pages: Math.ceil(count / pageSize), // Total Number of Pages
      orders: [],
      optimizeCountSql: true,
      hitCount: false,
      searchCount: true,
    };

    /* 
    Example response
    {
      records: [
        {
          id: '1831657024304214018',
          createTime: '2024-09-05 19:34:00',
          projectId: '1831656725179035649',
          fileUrl:
            'http://121.41.169.27:10000/aimgae/75b3f1a0-2f8a-4dc4-88c1-6b876b2a73fd.jpg',
          fileName: 'kevin-oetiker-v17IhTzLICs-unsplash.jpg',
          newFileName: '1725536039212_kevin-oetiker-v17IhTzLICs-unsplash.jpg',
          size: '3006718',
          status: 1,
          completeTime: '2024-09-06 13:32:41',
          userId: null,
          rectDataList: null,
          file_attributes: '{}',
          markList: null,
          manualCount: null,
          cutCount: null,
          pointCount: null,
          autoCount: null,
          updateName: null,
          updateTime: null,
        },
      ],
      current: currentPage,
      size: pageSize,
      total: '1', // Total Number of Images
      pages: '1', // Total Number of Pages
      orders: [],
      optimizeCountSql: true,
      hitCount: false,
      searchCount: true,
    };
    */
  }

  async get_marks_via_project_id<T>(
    project_id: bigint,
    type: 'rect_data' | 'cut_data' | 'point_data',
  ): Promise<T> {
    return this.prisma[type + ''].findMany({
      where: {
        project_id,
      },
    });
  }
}
