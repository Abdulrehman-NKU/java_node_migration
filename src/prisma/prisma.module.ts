import { Global, Module } from '@nestjs/common';
import { Prisma_Service } from './prisma.service';

@Global()
@Module({
  providers: [Prisma_Service],
  exports: [Prisma_Service],
})
export class Prisma_Module {}
