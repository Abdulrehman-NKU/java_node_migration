import { IsNotEmpty } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class Add_Project_User_Request_DTO {
  @IsNotEmpty()
  projectId: bigint;
  @IsNotEmpty()
  userId: bigint;
}

export class Get_Project_User_Role_Request_DTO extends Add_Project_User_Request_DTO {
  @Type(() => BigInt)
  roleId: bigint;
}
