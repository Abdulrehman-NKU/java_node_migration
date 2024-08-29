import { IsNotEmpty } from 'class-validator';

export class Edit_Project_Request_DTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  projectName: string;
  remarks: string;
  startTime: string;
  endTime: string;
  sceneCategory: string;
}
