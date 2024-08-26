import { IsNotEmpty } from '@nestjs/class-validator';
import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Edit_Team_Remarks_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;

  @IsNotEmpty()
  remarks: string;
}
