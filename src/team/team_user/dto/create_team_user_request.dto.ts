import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Create_Team_User_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;

  @IsNotEmpty_Type_Cast(BigInt)
  teamId: bigint;
}
