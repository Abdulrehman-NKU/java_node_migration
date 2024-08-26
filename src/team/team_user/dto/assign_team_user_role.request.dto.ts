import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Assign_Role_To_Team_User_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  teamId: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  roleId: bigint;
}
