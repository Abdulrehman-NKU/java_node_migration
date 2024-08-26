import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Create_Team_User_Request_DTO } from './dto/create_team_user_request.dto';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Util_Service } from 'src/util/util.service';
import { TeamUserService } from './team_user.service';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';

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
      this.team_user_service.add_user(teamId, userId),
    )();
  }

  @Delete('/') // RemoveUser
  async remove_team_user() {}

  @Get('/join') //join
  async join_team_by_invite() {}

  @Get('/exit') //Exit
  async exit_team() {}

  @Get('/role') // Role
  async user_role() {}
}
