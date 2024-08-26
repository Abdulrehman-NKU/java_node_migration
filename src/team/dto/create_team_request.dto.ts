import { IsNotEmpty } from '@nestjs/class-validator';

export class Create_Team_Request_DTO {
  @IsNotEmpty()
  name: string;
  tradeName: string;
  teamSize: string;
  remarks: string;
}
