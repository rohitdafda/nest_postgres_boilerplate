import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { NormalException } from '../exception/normal.exception';
import { Response } from 'express';
import {
  CheckViolationError,
  ConstraintViolationError,
  DataError,
  DBError,
  ForeignKeyViolationError,
  NotFoundError,
  NotNullViolationError,
  UniqueViolationError,
  ValidationError,
} from 'objection';
import { CustomValidationException } from '../exception/validation.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isProduction = process.env.NODE_ENV === 'production';
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'An error occurred';
    let data: any = null;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        message = Array.isArray((res as any).message)
          ? (res as any).message.join(', ')
          : String((res as any).message);
      }
    } else if ((exception as any) instanceof Error) {
      message = (exception as any).message;
    }

    if (exception instanceof CustomValidationException) {
      statusCode = exception.getStatus();
      message = exception.message;
      data = exception.validationErrors;
      return response.status(statusCode).json({
        statusCode,
        status: false,
        data,
        message,
      });
    }

    if (exception instanceof ValidationError) {
      switch (exception.type) {
        case 'ModelValidation': {
          const errorMsg = isProduction
            ? 'Model validation error'
            : exception.message;
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(NormalException.VALIDATION_ERROR(errorMsg).toJSON());
        }
        case 'RelationExpression': {
          const errorMsg = isProduction
            ? 'Relation expression error'
            : exception.message;
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(NormalException.VALIDATION_ERROR(errorMsg).toJSON());
        }
        case 'UnallowedRelation': {
          const errorMsg = isProduction
            ? 'Unallowed relation error'
            : exception.message;
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(NormalException.VALIDATION_ERROR(errorMsg).toJSON());
        }
        case 'InvalidGraph': {
          const errorMsg = isProduction
            ? 'Invalid graph error'
            : exception.message;
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(NormalException.VALIDATION_ERROR(errorMsg).toJSON());
        }
        default: {
          const errorMsg = isProduction
            ? 'Unknown validation error'
            : exception.message;
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(NormalException.VALIDATION_ERROR(errorMsg).toJSON());
        }
      }
    } else if (exception instanceof NotNullViolationError) {
      const errorMsg = isProduction
        ? 'Not null violation error'
        : exception.message;
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    } else if (exception instanceof UniqueViolationError) {
      const errorMsg = isProduction
        ? 'Unique violation error'
        : exception.message;
      return response
        .status(HttpStatus.CONFLICT)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    } else if (exception instanceof ConstraintViolationError) {
      const errorMsg = isProduction
        ? 'Constraint violation error'
        : exception.message;
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(NormalException.VALIDATION_ERROR(errorMsg).toJSON());
    } else if (exception instanceof DBError) {
      const errorMsg = isProduction
        ? 'Some errors occurred with database'
        : exception.message;
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    } else if (exception instanceof DataError) {
      const errorMsg = isProduction ? 'Bad data provided' : exception.message;
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    } else if (exception instanceof CheckViolationError) {
      const errorMsg = isProduction
        ? 'Check violation error'
        : exception.message;
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    } else if (exception instanceof ForeignKeyViolationError) {
      const errorMsg = isProduction
        ? 'Foreign key violation error'
        : exception.message;
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    } else if (exception instanceof NotFoundError) {
      const errorMsg = isProduction ? 'Not found error' : exception.message;
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(NormalException.UNEXPECTED(errorMsg).toJSON());
    }

    response.status(statusCode).json({
      statusCode,
      status: false,
      data: null,
      message,
    });
    return;
  }
}
