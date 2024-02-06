import { NextResponse } from 'next/server';

export function withErrorHandler(fn) {
  return async function handle(request, ...args) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      return NextResponse.json(
        { message: error.message || 'Something went wrong', data: error.data },
        { status: error.status || 500 },
      );
    }
  };
}
