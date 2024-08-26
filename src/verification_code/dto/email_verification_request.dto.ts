import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class Email_Verification_Request_DTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
