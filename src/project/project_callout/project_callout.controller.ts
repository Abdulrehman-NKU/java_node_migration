import {
  Controller,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Util_Service } from 'src/util/util.service';
import { Create_Project_Callout_Config_Request_DTO } from './dto/create_project_callout_config_request.dto';
import { ProjectCalloutService } from './project_callout.service';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { User } from 'src/common/decorator/user.decorator';
import { Get_Project_Callout_Config_Request } from './dto/get_project_callout_config_request.dto';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('project/callout/config')
export class ProjectCalloutController {
  constructor(
    private util_service: Util_Service,
    private project_callout_service: ProjectCalloutService,
  ) {}
  @Get() // list
  get_by_project_id(@Query() request_dto: Get_Project_Callout_Config_Request) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_callout_service.get_by_project_id(request_dto),
    )();
  }

  @Post() // save
  create(
    @Body() request_dto: Create_Project_Callout_Config_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_callout_service.create(request_dto, user),
    )();
  }

  @Patch('id')
  update() {}

  @Delete('id')
  delete() {}
}
