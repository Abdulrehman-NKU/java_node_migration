import { IsEmpty } from '@nestjs/class-validator';

export class Edit_Project_Request_DTO {
  @IsEmpty({ message: 'id cannot be empty' })
  id: string;
  @IsEmpty({ message: 'Project name cannot be empty' })
  projectName: string;
  remarks: string;
  startTime: Date;
  endTime: Date;
  sceneCategory: string;
}
