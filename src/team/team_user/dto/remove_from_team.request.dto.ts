import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Remove_From_Team_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;
}
