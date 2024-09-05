import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Get_Project_Callout_Config_Request } from './dto/get_project_callout_config_request.dto';
import { Project_Callout_Type_AND_LEVEL } from './enum/project_callout.enum';
import {
  Create_Project_Callout_Config_Request_DTO,
  Project_Callout_Config_DTO,
} from './dto/create_project_callout_config_request.dto';
import {
  Prisma_Transaction,
  user_with_role_and_urls_with_id_as_bigInt,
} from 'src/types';
import { Util_Service } from 'src/util/util.service';
import { project_callout_config } from '@prisma/client';

@Injectable()
export class ProjectCalloutService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
  ) {}

  private find_child_and_add_to_the_tree = async (
    parent_config: project_callout_config,
  ) => {
    const child_configs = await this.prisma.project_callout_config.findMany({
      where: {
        parent_id: parent_config.id,
      },
    });
    for (let i = 0; i < child_configs.length; i++) {
      child_configs[i] = await this.find_child_and_add_to_the_tree(
        child_configs[i],
      );
    }
    return {
      ...parent_config,
      tags: Boolean(child_configs.length),
      children: child_configs,
    };
  };

  private check_for_duplicate_names(
    { name, children = [] }: Project_Callout_Config_DTO,
    has_seen = new Set(),
  ) {
    if (has_seen.has(name))
      throw new ConflictException({
        message: 'Cannot have the duplicate name',
      });
    has_seen.add(name);
    for (let c of children) this.check_for_duplicate_names(c, has_seen);
  }

  // Relation id is the project_id or sceneCategory
  // sceneCategory is used for relation_id in the case of VR projects
  async get_by_project_id({
    relationId,
    type,
  }: Get_Project_Callout_Config_Request) {
    if (type === null) type = Project_Callout_Type_AND_LEVEL.TYPE_PROJECT;

    const parent_configs = await this.prisma.project_callout_config.findMany({
      where: {
        relation_id: relationId,
        type,
        parent_id: 0n,
      },
    });

    return this.util_service.snake_to_camel_case_the_object_fields(
      await Promise.all(
        parent_configs.map(async (parent_config) =>
          this.find_child_and_add_to_the_tree(parent_config),
        ),
      ),
    );
  }

  async create_or_update(
    { relationId, configDTO }: Create_Project_Callout_Config_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
    is_updating = false,
    tx: Prisma_Transaction = null,
  ) {
    const check_if_shortcut_key_is_already_used = is_updating
      ? null
      : await this.prisma.project_callout_config.findFirst({
          where: {
            relation_id: relationId,
            shortcuts: configDTO.shortcuts,
          },
        });

    if (check_if_shortcut_key_is_already_used)
      throw new ConflictException({ message: 'Shortcut key already in use' });
    this.check_for_duplicate_names(configDTO);

    return this.util_service.use_tranaction(async (tx) => {
      const insert_config_recursively = async (
        config: Project_Callout_Config_DTO,
        parent_id = 0n,
        class_id = 0n,
      ) => {
        const {
          name,
          level,
          shortcuts,
          create_id,
          create_time,
          id,
          children = [],
        } = config;
        const { id: parent_config_id } = await tx.project_callout_config.create(
          {
            data: {
              name,
              level,
              shortcuts,
              parent_id,
              class_id,
              relation_id: relationId,
              ...(is_updating
                ? {
                    id,
                    create_time,
                    create_id: create_id ?? user.id,
                    update_id: user.id,
                  }
                : {
                    create_id: user.id,
                  }),
            },
          },
        );

        if (!class_id) {
          const updated = await tx.project_callout_config.update({
            where: {
              id: parent_config_id,
            },
            data: {
              class_id: parent_config_id,
            },
          });
          class_id = updated.class_id;
        }

        for (const child_config of children) {
          await insert_config_recursively(
            child_config,
            parent_config_id,
            class_id,
          );
        }
      };

      await insert_config_recursively(configDTO);
    }, tx);
  }

  async update(
    request_dto: Create_Project_Callout_Config_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.use_tranaction(async (tx) => {
      await this.delete(request_dto.configDTO.class_id, tx);
      return await this.create_or_update(request_dto, user, true, tx);
    });
  }

  async delete(class_id: bigint, tx: Prisma_Transaction = null) {
    return this.util_service.use_tranaction(async (tx) => {
      return await tx.project_callout_config.deleteMany({
        where: {
          class_id,
        },
      });
    }, tx);
    // Todo: has some logic related to images
  }
}
