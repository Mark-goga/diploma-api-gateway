import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { status } from '@grpc/grpc-js';
import { GENERAL_ERROR_MESSAGES } from '@lib/src';

@Catch(Error)
export class GrpcExceptionFilter implements ExceptionFilter {
  private readonly grpcToHttpStatusMap = new Map<number, HttpStatus>([
    [status.ALREADY_EXISTS, HttpStatus.CONFLICT],
    [status.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST],
    [status.NOT_FOUND, HttpStatus.NOT_FOUND],
    [status.PERMISSION_DENIED, HttpStatus.FORBIDDEN],
    [status.UNAUTHENTICATED, HttpStatus.UNAUTHORIZED],
    [status.FAILED_PRECONDITION, HttpStatus.PRECONDITION_FAILED],
    [status.RESOURCE_EXHAUSTED, HttpStatus.TOO_MANY_REQUESTS],
    [status.DEADLINE_EXCEEDED, HttpStatus.REQUEST_TIMEOUT],
    [status.CANCELLED, HttpStatus.BAD_REQUEST],
  ]);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code !== undefined && exception.details) {
      const httpStatus =
        this.grpcToHttpStatusMap.get(exception.code) ||
        HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(httpStatus).json({
        statusCode: httpStatus,
        message: exception.details,
        success: false,
        error: exception.message,
      });
    }

    if (exception.response) {
      return response.status(exception.response.statusCode).json({
        statusCode: exception.response.statusCode,
        message: exception.response.message,
        success: false,
        error: exception.response.error,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: GENERAL_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      success: false,
      error: exception.message || GENERAL_ERROR_MESSAGES.UNKNOWN_ERROR,
    });
  }
}
