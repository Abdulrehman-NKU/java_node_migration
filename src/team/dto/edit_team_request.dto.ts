import { Create_Team_Request_DTO } from './create_team_request.dto';
import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Edit_Team_Request_DTO extends Create_Team_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
}
