import { IsArray } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';
export class Get_Project_Image_List_Request_DTO {
  @ValidateIf((self) => !self.projectIds)
  @IsNotEmpty_Type_Cast(BigInt)
  projectId: bigint;

  @ValidateIf((self) => !self.projectId)
  @IsArray()
  @IsNotEmpty_Type_Cast(BigInt)
  projectIds: bigint[];

  @IsOptional()
  @Type(() => BigInt)
  classId: bigint;

  status: number;

  orderCreateTime: number;

  currentPage: number;

  pageSize: number;
}
