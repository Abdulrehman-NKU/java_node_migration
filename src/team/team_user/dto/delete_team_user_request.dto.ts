import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Delete_Team_User_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;
}
