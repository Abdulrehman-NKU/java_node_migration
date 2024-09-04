import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Add_Project_User_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  projectId: bigint;
  @IsNotEmpty_Type_Cast(BigInt)
  userId: bigint;
}

export class Get_Project_User_Role_Request_DTO extends Add_Project_User_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  roleId: bigint;
}
