import { project_scene, project_tag } from '@prisma/client';

export class Get_Project_By_Id_Response_DTO {
  id: bigint;
  projectNo: string;
  projectName: string;
  config: string;
  status: number;
  remarks: string;
  creatorId: bigint;
  startTime: Date;
  lastUpdatedTime: Date;
  endTime: Date;
  category: number;
  sceneCategory: bigint;
  notesConfig: string;
  vrConfig: string;
  saveConfig: string;
  exportConfig: string;
  otherConfig: string;
  viaSettings: string;
  createTime: Date;
  viaAttributes: string;
  users: any[];
  scene: project_scene;
  markQuantity: number;
  manualCount: number;
  autoCount: number;
  tags: project_tag[];
}
