import { Injectable } from '@nestjs/common';
import { Prisma_Transaction } from 'src/types';
import { Util_Service } from 'src/util/util.service';

@Injectable()
export class SystemConfigService {
  constructor(private util_service: Util_Service) {}

  async get_by_code(
    code: string,
    default_value: string = '1',
    tx: Prisma_Transaction = null,
  ) {
    return this.util_service.use_tranaction(async (tx) => {
      const config = await tx.system_config.findFirst({
        where: {
          code,
        },
      });

      if (config) return config;

      return tx.system_config.create({
        data: {
          code,
          val: default_value,
        },
      });
    }, tx);
  }
}
