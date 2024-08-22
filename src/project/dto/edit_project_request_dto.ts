import { IsNotEmpty } from 'class-validator';

export class Edit_Project_Request_DTO {
  @IsNotEmpty({ message: 'id cannot be empty' })
  id: string;
  @IsNotEmpty({ message: 'projectName cannot be empty' })
  projectName: string;
  remarks: string;
  startTime: Date;
  endTime: Date;
  sceneCategory: string;
}
