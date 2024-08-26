import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Delete_Project_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
}
