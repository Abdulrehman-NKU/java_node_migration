import { IsNotEmpty } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class Delete_Project_Request_DTO {
  @IsNotEmpty({ message: 'Id Parameter cannot be empty' })
  @Type(() => BigInt)
  id: bigint;
}
