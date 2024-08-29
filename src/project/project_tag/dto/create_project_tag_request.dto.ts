import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class Save_Or_Update_Project_Tag_Request_DTO {
  @IsOptional()
  @Type(() => BigInt)
  id: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  projectId: bigint;
  @IsNotEmpty()
  tag: string;
}

// Don't allow duplicate tag name for the same project
