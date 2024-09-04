import {
  Controller,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Util_Service } from 'src/util/util.service';
import { User } from 'src/common/decorator/user.decorator';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import {
  Add_Project_User_Request_DTO,
  Get_Project_User_Role_Request_DTO,
} from './dto/add_project_user_request.dto';
import { ProjectUserService } from './project_user.service';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('project/user')
export class ProjectUserController {
  constructor(
    private project_user_service: ProjectUserService,
    private util_service: Util_Service,
  ) {}

  @Post('/') // AddUser
  add_project_user(
    @Body() request_dto: Add_Project_User_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_user_service.add_user(request_dto, user),
    )();
  }

  @Delete('/') // DeleteUser
  delete_project_user(
    @Query() request_dto: Add_Project_User_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_user_service.delete_user(request_dto, user),
    )();
  }

  @Patch('/role') // Role
  role(
    @Query() request_dto: Get_Project_User_Role_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_user_service.update_role(request_dto, user),
    )();
  }
}
