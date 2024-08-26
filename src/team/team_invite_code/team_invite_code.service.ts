import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import * as moment from 'moment';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Reload_Invite_Code_Request_DTO } from '../dto/reload_invite_code_request.dto';
import { Util_Service } from 'src/util/util.service';

@Injectable()
export class TeamInviteCodeService {
  constructor(
    private prisma: Prisma_Service,
    private util_service: Util_Service,
  ) {}

  private CODE_EXPIRY_DAYS = 3;

  async check_code_is_valid(code: string) {
    const invite_code = await this.prisma.team_invite_code.findFirst({
      where: {
        code,
      },
    });
    if (!invite_code)
      throw new BadRequestException({
        message: 'The invitation code does not exists!',
      });

    const code_create_time_plus_3_days = moment(invite_code.create_time).add(
      this.CODE_EXPIRY_DAYS,
      'days',
    );

    if (moment().isAfter(code_create_time_plus_3_days))
      throw new ForbiddenException({
        message: 'The invitation code has expired, please confirm!',
      });

    return invite_code;
  }

  // id === team_id
  async create_invite_code({ id, category }: Reload_Invite_Code_Request_DTO) {
    const code = id + '-' + this.util_service.createRandomCode(6);

    return this.prisma.team_invite_code.create({
      data: {
        team_id: id,
        category: category,
        code,
      },
    });
  }
}
