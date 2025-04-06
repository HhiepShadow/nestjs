import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { method, url } = request;
        const { statusCode } = response;
        this.logger.log(
          `${method} ${url} ${statusCode} - ${Date.now() - now}ms`,
          LoggingInterceptor.name,
        );
      }),
    );
  }
}
