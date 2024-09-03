import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  UseInterceptors,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Create_Team_User_Request_DTO } from './dto/create_team_user_request.dto';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Util_Service } from 'src/util/util.service';
import { TeamUserService } from './team_user.service';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import { Exit_Team_Request_DTO } from './dto/exit_team_request_dto';
import { User } from 'src/common/decorator/user.decorator';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { IsNotEmpty } from 'class-validator';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';
import { Assign_Role_To_Team_User_Request_DTO } from './dto/assign_team_user_role.request.dto';
import { Remove_From_Team_Request_DTO } from './dto/remove_from_team.request.dto';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('team/user')
export class TeamUserController {
  constructor(
    private util_service: Util_Service,
    private team_user_service: TeamUserService,
  ) {}
  @Post('/') // ADD
  async add_team_user(
    @Body() { teamId, userId }: Create_Team_User_Request_DTO,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_user_service.add(teamId, userId),
    )();
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/remove')
  async remove_team_user(@Query() request_dto: Remove_From_Team_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_user_service.remove(request_dto),
    )();
  }

  @Get('/join') //join
  async join_team_by_invite(
    @Query('code') code: string,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_user_service.join_team(code, user),
    )();
  }

  @Get('/exit') //Exit
  async exit_team(
    @Query() request_dto: Exit_Team_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_user_service.exit(request_dto, user),
    )();
  }

  @Get('/role') // Role
  async assign_role(
    @Query() request_dto: Assign_Role_To_Team_User_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.team_user_service.update_role(request_dto, user),
    )();
  }
}
