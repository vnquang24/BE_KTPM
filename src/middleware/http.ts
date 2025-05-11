import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Tạo response chuẩn
    const errorResponse = {
      statusCode: status,
      message: exceptionResponse.message || exception.message,
      error: exceptionResponse.error || 'Error',
      cause: exceptionResponse.cause || null,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url
    };

    response.status(status).json(errorResponse);
  }
}