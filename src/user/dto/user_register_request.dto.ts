import { IsNotEmpty } from "@nestjs/class-validator";

export class User_Register_Request_DTO {
  @IsNotEmpty()
  account: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  code: string;
}
