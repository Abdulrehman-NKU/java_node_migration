import { Module } from '@nestjs/common';
import { ProjectCalloutController } from './project_callout.controller';
import { ProjectCalloutService } from './project_callout.service';

@Module({
  controllers: [ProjectCalloutController],
  providers: [ProjectCalloutService],
})
export class ProjectCalloutModule {}
