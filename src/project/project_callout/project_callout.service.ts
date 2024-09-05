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
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Util_Service } from 'src/util/util.service';
import { project_callout_config } from '@prisma/client';

@Injectable()
export class ProjectCalloutService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
  ) {}

  private find_child_and_add_to_the_tree = (
    config: project_callout_config,
    configs_list: project_callout_config[],
  ) => {
    const child_configs = configs_list.filter((c) => c.parent_id === config.id);
    for (let i = 0; i < child_configs.length; i++) {
      child_configs[i] = this.find_child_and_add_to_the_tree(
        child_configs[i],
        configs_list,
      );
    }
    return {
      ...config,
      children: child_configs.length ? child_configs : null,
    };
  };

  // Relation id is the project_id or sceneCategory
  // sceneCategory is used for relation_id in the case of VR projects
  async get_by_project_id({
    relationId,
    type,
  }: Get_Project_Callout_Config_Request) {
    if (type === null) type = Project_Callout_Type_AND_LEVEL.TYPE_PROJECT;

    const configs = await this.prisma.project_callout_config.findMany({
      where: {
        relation_id: relationId,
        type,
        parent_id: 0n,
      },
    });

    return await Promise.all(
      configs.map(async (parent_config) => {
        const child_configs = await this.prisma.project_callout_config.findMany(
          {
            where: {
              class_id: parent_config.class_id,
              parent_id: {
                not: 0n,
              },
            },
          },
        );
        this.find_child_and_add_to_the_tree(parent_config, child_configs);
      }),
    );
  }

  private check_for_duplicate_names(configuration: Project_Callout_Config_DTO) {
    const config_names_set = new Set();
    const check_if_name_already_exist = ({
      name,
      children = [],
    }: Project_Callout_Config_DTO) => {
      if (config_names_set.has(name))
        throw new ConflictException({
          message: 'Cannot have the duplicate name',
        });
      config_names_set.add(name);
      for (let c of children) {
        check_if_name_already_exist(c);
      }
    };
    check_if_name_already_exist(configuration);
  }

  async create(
    { relationId, configDTO }: Create_Project_Callout_Config_Request_DTO,
    user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    this.check_for_duplicate_names(configDTO);
    return this.util_service.use_tranaction(async (tx) => {
      const insert_config_recursively = async (
        config: Project_Callout_Config_DTO,
        parent_id = 0n,
        class_id = 0n,
      ) => {
        const { name, level, shortcuts, children = [] } = config;
        const { id: parent_config_id } = await tx.project_callout_config.create(
          {
            data: {
              name,
              level,
              shortcuts,
              parent_id,
              class_id,
              relation_id: relationId,
              create_id: user.id,
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
    });
  }
}
