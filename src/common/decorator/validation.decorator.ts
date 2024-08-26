import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, isNotEmpty } from 'class-validator';

export function IsNotEmpty_Type_Cast(
  constructor: BigIntConstructor | StringConstructor | NumberConstructor,
) {
  return applyDecorators(
    IsNotEmpty(),
    Type(() => constructor),
  );
}
