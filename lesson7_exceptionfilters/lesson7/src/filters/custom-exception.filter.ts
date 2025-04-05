import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
