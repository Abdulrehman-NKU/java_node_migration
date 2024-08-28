import { IsNotEmpty_Type_Cast } from 'src/common/decorator/validation.decorator';

export class Add_Empty_Project_Request_DTO {
  @IsNotEmpty_Type_Cast(Number)
  category: number;
}
