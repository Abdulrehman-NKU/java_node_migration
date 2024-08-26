import { IsEmpty } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class Save_Or_Update_Project_Tag_Request_DTO {
  @IsOptional()
  @Type(() => BigInt)
  id: bigint;
  @IsEmpty({ message: 'projectId is required!' })
  @Type(() => BigInt)
  projectId: bigint;
  @IsEmpty({ message: 'tag is required!' })
  tag: string;
}

// Don't allow duplicate tag name for the same project
