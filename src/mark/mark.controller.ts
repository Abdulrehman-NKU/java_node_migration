import { Util_Service } from 'src/util/util.service';
import { MarkService } from './mark.service';
import { Controller } from '@nestjs/common';

@Controller('mark')
export class MarkController {
  constructor(
    private mark_service: MarkService,
    private util_service: Util_Service,
  ) {}

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
