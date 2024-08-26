import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Tranfer_Team_User_Role_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  teamId: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;
}
