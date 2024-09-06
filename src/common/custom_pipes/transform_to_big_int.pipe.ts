import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class Parse_BigInt_Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) return BigInt(value);
    else
      throw new BadRequestException({
        message: `${metadata.data} is required!`,
      });
  }
}
