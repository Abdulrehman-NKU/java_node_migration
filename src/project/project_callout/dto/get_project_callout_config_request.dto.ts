import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Get_Project_Callout_Config_Request {
  @IsNotEmpty_Type_Cast(BigInt)
  relationId: bigint;
  @IsOptional()
  @IsNotEmpty_Type_Cast(BigInt)
  projectId: bigint;
  @Type(() => Number)
  type: number;
}
