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
import { Edit_Team_Request_DTO } from './dto/edit_team_request.dto';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';
import { Edit_Team_Name_Request_DTO } from './dto/edit_team_name_request.dto';
import { Edit_Team_Remarks_Request_DTO } from './dto/edit_team_remarks_request.dto';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('team')
export class TeamController {
  constructor(
    private util_service: Util_Service,
    private team_service: TeamService,
  ) {}

  @Get('/') // AddALl
  async get_all_teams() {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.get_all(),
    )();
  }

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
  async update_team(@Body() request_dto: Edit_Team_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update(request_dto),
    )();
  }

  @Delete('/') // Del
  async delete_team(
    @Query('id', Parse_BigInt_Pipe) id: bigint,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.delete(id, user),
    )();
  }

  @Patch('/name') //EditName
  async update_team_name(@Body() request_dto: Edit_Team_Name_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update_name(request_dto),
    )();
  }

  @Patch('/remark') // EditRea
  async update_team_remarks(
    @Body() request_dto: Edit_Team_Remarks_Request_DTO,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update_remarks(request_dto),
    )();
  }

  @Get('/id') //GetById
  async get_team_by_id(
    @Query('id', Parse_BigInt_Pipe) id: bigint,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.get_by_id(id, user),
    )();
  }

  @Get('/name') //ByName
  async get_team_by_name() {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update(request_dto),
    )();
  }

  @Get('/getByMy') // getByMy
  async get_by_my() {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update(request_dto),
    )();
  }

  @Get('/team_mates') // GetTeamMates
  async get_team_mates() {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update(request_dto),
    )();
  }

  @Get('/transfer_mates') // GetTeTrasnfermates
  async get_te_transfer_mates() {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update(request_dto),
    )();
  }

  @Get('/code') // ReloadCode
  async get_code() {
    return this.util_service.tryCatchWrapper(() =>
      this.team_service.update(request_dto),
    )();
  }
}
