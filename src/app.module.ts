import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Prisma_Module } from './prisma/prisma.module';
import { Util_Module } from './util/util.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UserRoleModule } from './user_role/user_role.module';
import { EmailConfigModule } from './email_config/email_config.module';
import { VerificationCodeModule } from './verification_code/verification_code.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfigService } from './email_config/email_config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EmailConfigModule],
      inject: [EmailConfigService],
      useFactory: async (emailConfigService: EmailConfigService) => {
        const { email_host, account, password, port, use_ssl } =
          await emailConfigService.get_email_config();
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
    UserRoleModule,
    EmailConfigModule,
    VerificationCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
