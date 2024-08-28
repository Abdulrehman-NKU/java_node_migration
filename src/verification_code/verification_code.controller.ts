import { Controller, Get, Query } from '@nestjs/common';
import { VerificationCodeService } from './verification_code.service';
import { Util_Service } from 'src/util/util.service';
import { Email_Verification_Request_DTO } from './dto/email_verification_request.dto';

@Controller('verification')
export class VerificationCodeController {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
    private readonly util_service: Util_Service,
  ) {}

  @Get('/email')
  email_verfication(@Query() query: Email_Verification_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.verificationCodeService.email_verification(query),
    )();
  }
}
