import { Injectable, Inject } from '@nestjs/common';
import { Email_Verification_Request_DTO } from './dto/email_verification_request.dto';
import { Util_Service } from 'src/util/util.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class VerificationCodeService {
  constructor(
    private util_service: Util_Service,
    private mailService: MailerService,
    @Inject(CACHE_MANAGER) private cache_mangager: Cache,
  ) {}

  CODE_LENGTH = 6;
  EMAIL_VERIFICATION_CODE_TTL_IN_MS = 1000 * 60;

  async email_verification({ email }: Email_Verification_Request_DTO) {
    const code = this.util_service.createRandomCode(this.CODE_LENGTH);
    this.cache_mangager.set(
      email,
      code,
      this.EMAIL_VERIFICATION_CODE_TTL_IN_MS,
    );

    await this.mailService.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      date: new Date(),
      subject: 'Supernode login verification code',
      text: '[Super Node] Hello, your verification code is: ' + code,
    });

    return 'Success';
  }
}
