import { Util_Service } from 'src/util/util.service';
import { ProjectMarkService } from './project_mark.service';
import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Headers,
  Request as RequestDecorator,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Get_Project_Image_List_Request_DTO } from './dto/Get_Project_Image_List_Request_DTO';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Multer_Disk_Storage } from 'src/configs/multer';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';
import { Request } from 'express';

@UseInterceptors(Trasnform_BigInt_To_String)
@UseGuards(Jwt_Auth_Gurad)
@Controller('project/mark')
export class ProjectMarkController {
  constructor(
    private mark_service: ProjectMarkService,
    private util_service: Util_Service,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('img/list') // listByProjectId
  async get_images(
    @Body() request_dto: Get_Project_Image_List_Request_DTO,
    @Headers('host') host: string,
    @RequestDecorator() { protocol }: Request,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.mark_service.get_images_by_project_id(request_dto, {
        protocol,
        host,
      }),
    )();
  }

  @Post('img/upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: Multer_Disk_Storage(
        (req: any) => req.query.projectId,
        true, // isPublic
      ),
    }),
  )
  async post_image(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('projectId', Parse_BigInt_Pipe) project_id: bigint,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.mark_service.post_image(project_id, files),
    )();
  }

  /**
   * projectImg
   *
   * getById
   * listByProjectId
   * listByProjectIndex
   * delRelationData
   * downLoadImgTxt
   * transImgUrl/{projectId}/{fileName}
   */

  /**
   * arConfig
   *
   * getByProjectId
   * getObjByProjectId
   * getStrByProjectId
   * saveOrUpdate
   * delete
   */

  /**
   * arGatherData
   *
   * GetZip
   */

  /**
   * arImage
   *
   * list
   * changeValid
   * saveOrUpdate
   * delete
   */

  /**
   * dataRecord
   *
   * list
   * getImgIdbyId
   * selectConfigName
   * checkImgRepeat
   * save
   * updateName
   * del
   * saveIsComplete
   */

  /**
   * dataRecordItem
   * del
   * pageList
   */

  /**
   * lib
   *
   * uploadFiles
   * uploadFile
   */

  /**
   * mark (Commented)
   *
   * Report
   * v2/report
   * getCalloutgroup
   * AddByFiles
   * Del
   * upload
   * AddByFile
   */

  /**
   * project/calloutConfig
   *
   * list
   * save
   * updateById
   * delById
   */

  /**
   * project/config
   *
   * NotesConfig
   * VRConfig
   * NotesViaConfig
   */

  /**
   * project
   *
   * AddEmpty
   * Edit
   * ById
   * complete
   * GetAll
   * Quick
   * Del
   * AddUser
   * DeleteUser
   * Role
   */

  /**
   * ProjectScen
   *
   * List
   */

  /**
   * tag
   *
   * saveOrUpdate
   * del
   */

  /**
   * project/rect
   *
   * getByImgId
   * countByProjectId
   * del
   */

  /**
   * upload
   *
   *
   */

  /**
   * vrConfig
   *
   * getByProjectId
   * getObjByProjectId
   * saveOrUpdate
   * delete
   */
}
