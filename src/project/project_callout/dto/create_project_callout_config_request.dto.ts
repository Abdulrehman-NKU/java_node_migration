import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Create_Project_Callout_Config_Request_DTO {
  @IsNotEmpty_Type_Cast(BigInt)
  relationId: bigint;
  configDTO: Project_Callout_Config_DTO;
}

export class Project_Callout_Config_DTO {
  tag: string;
  level: number;
  name: string;
  shortcuts: string;
  children: Project_Callout_Config_DTO[];
}
