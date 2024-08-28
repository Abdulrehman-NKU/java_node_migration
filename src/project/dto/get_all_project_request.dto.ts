import { Transform } from '@nestjs/class-transformer';
import { Type } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class Get_All_Project_Request_DTO {
  @Type(() => Number)
  category: number;
  @IsOptional()
  // @IsIn(['asc', 'desc' || ''], {
  //   message: 'createTimeOrder value can only be asc/desc',
  // })
  createTimeOrder: 'asc' | 'desc' | ''; // Todo: adding empty string but need to be fixed from the front_end side
  @IsOptional()
  // @IsIn(['asc', 'desc' || ''], {
  //   message: 'updateTimeOrder value can only be asc/desc',
  // })
  updateTimeOrder: 'asc' | 'desc' | '';
  value: string;
}
