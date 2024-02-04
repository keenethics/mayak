import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Feedback } from '@/lib/validationSchemas';

export async function POST(request) {
  try {
    const feedbackData = await request.json();
    const validatedFeedback = Feedback.safeParse(feedbackData);
    if (!validatedFeedback.success) {
      return NextResponse.json(
        { errors: validatedFeedback.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const validatedFeedbackData = validatedFeedback.data;
    await prisma.feedback.create({ data: validatedFeedbackData });
    return NextResponse.json(validatedFeedbackData);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
