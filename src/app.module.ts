import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Prisma_Module } from './prisma/prisma.module';
import { Util_Module } from './util/util.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { EmailConfigModule } from './email_config/email_config.module';
import { VerificationCodeModule } from './verification_code/verification_code.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfigService } from './email_config/email_config.service';
import { ProjectModule } from './project/project.module';
import { SystemConfigModule } from './system_config/system_config.module';
import { RoleUserModule } from './role_user/role_user.module';
import { TeamModule } from './team/team.module';
import { FileSystemModule } from './file_system/file_system.module';
import { ProjectMarkModule } from './project/project_mark/project_mark.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EmailConfigModule],
      inject: [EmailConfigService],
      useFactory: async (emailConfigService: EmailConfigService) => {
        const config = await emailConfigService.get_email_config();
        if (!config)
          return {
            transport: {
              host: '',
              port: null,
            },
          };

        const { email_host, account, password, port, use_ssl } = config;
        return {
          transport: {
            host: email_host,
            port: port,
            secure: use_ssl,
            auth: {
              user: account,
              pass: password,
            },
          },
        };
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    Prisma_Module,
    UserModule,
    Util_Module,
    AuthModule,
    EmailConfigModule,
    VerificationCodeModule,
    ProjectModule,
    ProjectMarkModule,
    SystemConfigModule,
    RoleUserModule,
    TeamModule,
    FileSystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
