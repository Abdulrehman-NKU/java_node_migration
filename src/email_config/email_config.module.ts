import { Module } from '@nestjs/common';
import { EmailConfigService } from './email_config.service';
import { EmailConfigController } from './email_config.controller';

@Module({
  providers: [EmailConfigService],
  controllers: [EmailConfigController],
  exports: [EmailConfigService],
})
export class EmailConfigModule {}
