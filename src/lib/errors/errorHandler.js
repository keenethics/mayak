import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { BASE_ERROR_MESSAGES } from '../consts';

export function withErrorHandler(fn) {
  return async function handle(request, ...args) {
    try {
      return await fn(request, ...args);
    } catch (error) {
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
