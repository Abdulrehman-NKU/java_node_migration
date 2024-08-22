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
      map((data) => {
        // data instanceof Array
        if (data.constructor === Array)
          return data.map((d) => this.convertObjectBigIntPropertyToString(d));
        return this.convertObjectBigIntPropertyToString(data);
      }),
      catchError((error) => {
        console.log(error);
        throw error;
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
