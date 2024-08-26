import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Exit_Team_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  teamId: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;
}
