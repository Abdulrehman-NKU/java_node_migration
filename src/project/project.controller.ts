import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Query,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Util_Service } from 'src/util/util.service';
import { ProjectService } from './project.service';
import { Get_Project_By_Id_Request_DTO } from './dto/get_project_by_id_request.dto';
import { Add_Empty_Project_Request_DTO } from './dto/add_empty_project_request.dto';
import { User } from 'src/common/decorator/user.decorator';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { Edit_Project_Request_DTO } from './dto/edit_project_request_dto';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';
import { Get_All_Project_Request_DTO } from './dto/get_all_project_request.dto';
import {
  Add_Project_User_Request_DTO,
  Get_Project_Role_Request_DTO,
} from './dto/add_project_user_request.dto';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('project')
export class ProjectController {
  constructor(
    private project_service: ProjectService,
    private util_service: Util_Service,
  ) {}

  @Post('/') // AddEmpty
  add_empty_project(
    @Body() request_dto: Add_Empty_Project_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.add_empty(request_dto, user),
    )();
  }

  @Patch('/') // Edit
  edit_project(@Body() request_dto: Edit_Project_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.edit(request_dto),
    )();
  }

  @Get('/id') // ById
  get_project_by_id(
    @Query() request_dto: Get_Project_By_Id_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.by_id(request_dto, user),
    )();
  }

  @Get('/complete')
  complete_project(
    @Query('id', Parse_BigInt_Pipe) id: bigint,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.complete(id, user),
    )();
  }

  @Get('/') // GetAll
  get_all_projects(
    @Query() request_dto: Get_All_Project_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.get_all(request_dto, user),
    )();
  }

  @Get('/quick') // Quick
  quick(
    @Query('pageSize', ParseIntPipe) page_size: number = 4,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.quick(page_size, user),
    )();
  }

  @Delete('/id') // Del
  delete_project(
    @Query('id', Parse_BigInt_Pipe) id: bigint,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.del(id, user),
    )();
  }

  @Post('/user') // AddUser
  add_project_user(
    @Body() request_dto: Add_Project_User_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.add_project_user(request_dto, user),
    )();
  }

  // Todo: Not Implemented Yet!
  @Delete('/user') // DeleteUser
  delete_project_user(
    @Query() request_dto: Add_Project_User_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.delete_project_user(request_dto, user),
    )();
  }

  @Post('/user/role') // Role
  role(
    @Body() request_dto: Get_Project_Role_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_service.add_user_role(request_dto, user),
    )();
  }
}
