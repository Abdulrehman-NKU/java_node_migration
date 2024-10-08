import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Get_Project_By_Id_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
  markStatus: string;
}
