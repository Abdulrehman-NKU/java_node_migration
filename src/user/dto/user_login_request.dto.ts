import { IsNotEmpty } from "@nestjs/class-validator";

export class User_Login_Request_DTO {
  @IsNotEmpty()
  account: string;
  @IsNotEmpty()
  password: string;
  code: string;
}
