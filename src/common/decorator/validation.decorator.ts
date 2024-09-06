import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export function IsNotEmpty_Type_Cast(
  constructor:
    | BigIntConstructor
    | StringConstructor
    | NumberConstructor
    | DateConstructor,
) {
  return applyDecorators(
    IsNotEmpty(),
    Transform(({ value }) =>
      value instanceof Array
        ? value.map((v) => constructor(v))
        : constructor(value),
    ),
  );
}
