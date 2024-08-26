import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Util_Service } from 'src/util/util.service';
import { Create_Team_Request_DTO } from './dto/create_team_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { User } from 'src/common/decorator/user.decorator';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { TeamService } from './team.service';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('team')
export class TeamController {
  constructor(
    private util_service: Util_Service,
    private team_service: TeamService,
  ) {}

  @Get('/') // AddALl
  async get_all_teams() {}

  @Post('/') // /New
  async new_team(
    @Body() request_dto: Create_Team_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.create(request_dto, user),
    )();
  }

  @Patch('/') // Edit
  async update_team() {}

  @Delete('/') // Del
  async delete_team() {}

  @Patch('/name') //EditName
  async update_team_name() {}

  @Patch('/remark') // EditRea
  async update_team_remarks() {}

  @Get('/id') //GetById
  async get_team_by_id() {}

  @Get('/name') //GetBName
  async get_team_by_name() {}

  @Get('/getByMy') // getByMy
  async get_by_my() {}

  @Get('/team_mates') // GetTeamMates
  async get_team_mates() {}

  @Get('/transfer_mates') // GetTeTrasnfermates
  async get_te_transfer_mates() {}

  @Get('/code') // ReloadCode
  async get_code() {}
}
