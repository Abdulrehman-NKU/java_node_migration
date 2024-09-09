import { IsNotEmpty } from 'class-validator';
import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Edit_Project_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  id: bigint;
  @IsNotEmpty()
  projectName: string;
  remarks: string;
  startTime: string;
  endTime: string;
  sceneCategory: string;
}
