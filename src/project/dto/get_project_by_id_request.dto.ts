import { Transform } from '@nestjs/class-transformer';
import { IsEmpty } from '@nestjs/class-validator';

export class Get_Project_By_Id_Request_DTO {
  @IsEmpty({ message: 'id cannot be empty' })
  @Transform(({ value }) => BigInt(value))
  id: bigint;
  markStatus: string;
}
