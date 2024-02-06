import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { BadRequestException } from '@/lib/errors/BadRequestException';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const POST = withErrorHandler(async (request) => {
  const feedbackData = await request.json();
  const validatedFeedback = SendFeedback.safeParse(feedbackData);
  if (!validatedFeedback.success) {
    throw new BadRequestException({
      fieldErrors: validatedFeedback.error.flatten().fieldErrors,
    });
  }
  await prisma.feedback.create({ data: validatedFeedback.data });
  return NextResponse.json({ feedbackSent: true });
});
