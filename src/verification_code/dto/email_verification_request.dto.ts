import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class Email_Verification_Request_DTO {
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  @IsEmail({}, { message: 'Please enter the correct email address!' })
  email: string;
}
