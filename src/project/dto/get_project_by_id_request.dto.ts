import { IsNotEmpty } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class Get_Project_By_Id_Request_DTO {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Type(() => BigInt)
  id: bigint;
  markStatus: string;
}
