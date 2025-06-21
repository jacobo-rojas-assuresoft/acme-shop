import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const contextType = gqlHost.getType();

    if ((contextType as string) === 'graphql') {
      let status = 500;
      let message = 'Internal server error';
      let code = 'INTERNAL_SERVER_ERROR';
      let originalError = exception;

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const response = exception.getResponse();

        if (typeof response === 'object' && response !== null) {
          const res = response as { message?: string | string[]; error?: string };
          message = Array.isArray(res.message) ? res.message[0] : (res.message ?? message);
          code = res.error ?? (status === 401 ? 'UNAUTHENTICATED' : code);
          originalError = res;
        } else if (typeof response === 'string') {
          message = response;
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      throw new GraphQLError(message, {
        extensions: {
          code,
          status,
          originalError,
        },
      });
    }

    // fallback HTTP
    super.catch(exception, host);
  }
}
