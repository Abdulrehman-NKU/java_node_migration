import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class Trasnform_BigInt_To_String<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => this.parse_big_int_to_string(data)),
      catchError((error) => {
        console.log(error, "Error at Trasnform_BigInt_To_String");
        throw error;
      }),
    );
  }

  private parse_big_int_to_string(data) {
    if (data.constructor === Array)
      return data.map((d) => this.convert_record_big_int_property_to_string(d));
    return this.convert_record_big_int_property_to_string(data);
  }

  private convert_record_big_int_property_to_string(data: Record<string, any>) {
    for (let k in data) {
      // typeof null is object
      if (typeof data[k] === "object" && data[k] !== null) data[k] = this.parse_big_int_to_string(data[k])
      else if (typeof data[k] === 'bigint') data[k] = data[k].toString();
    }
    return data;
  }
}
