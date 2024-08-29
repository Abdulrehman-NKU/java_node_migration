import {
  Controller,
  Post,
  Delete,
  Query,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Util_Service } from 'src/util/util.service';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import { Save_Or_Update_Project_Tag_Request_DTO } from './dto/create_project_tag_request.dto';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';
import { User } from 'src/common/decorator/user.decorator';
import { ProjectTagService } from './project_tag.service';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';

@UseGuards(Jwt_Auth_Gurad)
@UseInterceptors(Trasnform_BigInt_To_String)
@Controller('project/tag')
export class ProjectTagController {
  constructor(
    private util_service: Util_Service,
    private project_tag_service: ProjectTagService,
  ) {}

  @Post('save_or_update')
  async save_or_update_project_tag(
    @Body() request_dto: Save_Or_Update_Project_Tag_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_tag_service.save_or_update_project_tag(request_dto, user),
    )();
  }

  @Delete('/')
  async delete_project_tag(
    @Query('id', Parse_BigInt_Pipe) project_tag_id: bigint,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.project_tag_service.delete_project_tag(project_tag_id),
    )();
  }
}
