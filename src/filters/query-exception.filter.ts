import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // PostgreSQL error code for unique violation
    if (exception.driverError['code'] === '23505') {
      response.status(HttpStatus.CONFLICT).json({
        message: exception.driverError['detail'],
        error: 'Unique constraint violation',
        statusCode: HttpStatus.CONFLICT
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
        message: exception.message
      });
    }
  }
}
