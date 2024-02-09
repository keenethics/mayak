import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { BASE_ERROR_MESSAGES } from '../consts';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';

export function withErrorHandler(fn) {
  return async function handle(request, ...args) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      if (error instanceof NotAuthorizedException) {
        return NextResponse.json(
          { message: BASE_ERROR_MESSAGES[401] },
          {
            status: 401,
          },
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            message: BASE_ERROR_MESSAGES[400],
            data: error.flatten().fieldErrors,
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          message: error.message || 'Something went wrong',
          data: error.data,
        },
        { status: error.status || 500 },
      );
    }
  };
}
