import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Prisma_Transaction } from 'src/types';

@Injectable()
export class SystemConfigService {
  constructor(private prisma: Prisma_Service) {}

  async get_by_code(
    code: string,
    default_value: string = '1',
    tx: Prisma_Transaction = this.prisma,
  ) {
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
  }
}
