import { Injectable } from '@nestjs/common';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Email_Config_Request_DTO } from './dto/email_config_request.dto';

@Injectable()
export class EmailConfigService {
  constructor(private prisma: Prisma_Service) {}

  get_email_config() {
    return this.prisma.email_config.findFirst();
  }

  async creat_or_update_email_config({
    account,
    companyName,
    emailHost,
    emailKey,
    password,
    port,
    useSsl,
  }: Email_Config_Request_DTO) {
    const config = await this.prisma.email_config.findFirst();
    if (config) {
      return this.prisma.email_config.update({
        where: {
          id: config.id,
        },
        data: {
          account,
          password,
          port,
          company_name: companyName,
          email_host: emailHost,
          email_key: emailKey,
          use_ssl: useSsl,
        },
      });
    } else {
      return this.prisma.email_config.create({
        data: {
          account,
          password,
          port,
          company_name: companyName,
          email_host: emailHost,
          email_key: emailKey,
          use_ssl: useSsl,
        },
      });
    }
  }
}
