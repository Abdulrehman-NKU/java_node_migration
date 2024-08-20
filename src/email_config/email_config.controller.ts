import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmailConfigService } from './email_config.service';
import { Util_Service } from 'src/util/util.service';
import { Email_Config_Request_DTO } from './dto/email_config_request.dto';

@Controller('emailConfig')
export class EmailConfigController {
  constructor(
    private email_config_service: EmailConfigService,
    private util_service: Util_Service,
  ) {}

  @Get('get')
  get_email_config() {
    return this.util_service.tryCatchWrapper(() =>
      this.email_config_service.get_email_config(),
    )();
  }

  @Post('save')
  create_or_update_email_config(@Body() request_dto: Email_Config_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.email_config_service.creat_or_update_email_config(request_dto),
    )();
  }
}
