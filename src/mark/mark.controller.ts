import { Util_Service } from 'src/util/util.service';
import { MarkService } from './mark.service';
import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';
import { Get_Project_Image_List_Request_DTO } from './dto/Get_Project_Image_List_Request_DTO';

@Controller('mark')
export class MarkController {
  constructor(
    private mark_service: MarkService,
    private util_service: Util_Service,
  ) {}

  @Post('/project/img/list') // listByProjectId
  async get_project_images(
    @Body() request_dto: Get_Project_Image_List_Request_DTO,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.mark_service.get_project_images_by_project_id(request_dto),
    )();
  }

  async post_project_image() {}
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
