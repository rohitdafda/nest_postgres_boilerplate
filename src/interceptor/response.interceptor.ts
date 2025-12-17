import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponse } from '../types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result: T | { data?: T; message?: string }) => {
        // If the handler returns { data, message }, extract both
        let data: T | null = result as T;
        let message = 'Request successful';

        if (
          result &&
          typeof result === 'object' &&
          ('data' in result || 'message' in result)
        ) {
          const resultObj = result as { data?: T; message?: string };
          data = resultObj.data !== undefined ? resultObj.data : (result as T);
          message = resultObj.message || message;
        }

        const ctx = context.switchToHttp();
        const response = ctx.getResponse<{ statusCode?: number }>();
        const statusCode = response?.statusCode || 200;

        return {
          statusCode,
          status: true,
          data: data ?? null,
          message,
        };
      }),
    );
  }
}
