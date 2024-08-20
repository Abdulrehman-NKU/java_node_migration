import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class Trasnform_BigInt_To_String<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (!data) throw new NotFoundException({ message: 'No result!' });
        // data instanceof Array
        if (data.constructor === Array)
          return data.map((d) => this.convertObjectBigIntPropertyToString(d));
        return this.convertObjectBigIntPropertyToString(data);
      }),
    );
  }

  convertObjectBigIntPropertyToString(data: Record<string, any>) {
    for (let k in data) {
      if (typeof data[k] === 'bigint') data[k] = data[k].toString();
    }
    return data;
  }
}
