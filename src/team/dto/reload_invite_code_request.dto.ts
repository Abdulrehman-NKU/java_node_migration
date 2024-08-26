import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Reload_Invite_Code_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  category: bigint;
}
