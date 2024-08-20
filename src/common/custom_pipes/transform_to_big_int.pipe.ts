import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class Transform_To_BigInt implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value, metadata });
    if (value) return BigInt(value);
    else
      throw new BadRequestException({
        message: `${metadata.data} is required!`,
      });
  }
}
