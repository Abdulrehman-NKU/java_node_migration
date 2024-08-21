import { Controller, Post, Get, Query } from '@nestjs/common';
import { Util_Service } from 'src/util/util.service';
import { ProjectService } from './project.service';
import { Get_Project_By_Id_Request_DTO } from './dto/get_project_by_id_request.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private project_service: ProjectService,
    private util_service: Util_Service,
  ) {}

  @Post('/AddEmpty')
  add_empty() {}

  @Post('/Edit')
  edit() {}

  @Get('/ById')
  by_id(@Query() request_query: Get_Project_By_Id_Request_DTO) {}

  @Get('/complete')
  complete() {}

  @Post('/GetAll')
  get_all() {}

  @Post('/Quick')
  quick() {}

  @Post('/Del')
  del() {}

  @Post('/AddUser')
  add_user() {}

  @Post('/DeleteUser')
  delete_user() {}

  @Post('/Role')
  role() {}
}
