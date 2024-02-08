import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const POST = withErrorHandler(async request => {
  const feedbackData = await request.json();
  const validatedFeedback = SendFeedback.parse(feedbackData);
  await prisma.feedback.create({ data: validatedFeedback });
  return NextResponse.json({ feedbackSent: true });
});
