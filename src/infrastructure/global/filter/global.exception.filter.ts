import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else {
            console.error(exception);
        }

        const resposneBody = {
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.path
        };

        response.status(status).json(resposneBody);
    }
}
