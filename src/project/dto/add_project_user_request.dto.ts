import { IsNotEmpty } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class Add_Project_User_Request_DTO {
  @IsNotEmpty({ message: 'Project id is required' })
  projectId: bigint;
  @IsNotEmpty({ message: 'User id is required' })
  userId: bigint;
}

export class Get_Project_Role_Request_DTO extends Add_Project_User_Request_DTO {
  @Type(() => BigInt)
  roleId: bigint;
}
