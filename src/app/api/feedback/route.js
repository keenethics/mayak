import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/db';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+380\d{9}$/;

const Feedback = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .max(128, {
        message: 'Name must not be longer than 128 characters',
      }),
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .refine(val => phoneRegex.test(val), {
        message: 'Please, enter phone number in format +380XXXXXXXXX',
      }),
    callMe: z.boolean({
      required_error: 'callMe is required',
      invalid_type_error: 'callMe must be a boolean',
    }),
    email: z
      .string()
      .refine(val => emailRegex.test(val) && val.length <= 320, {
        message: 'Please, enter valid email',
      }),
    message: z
      .string({
        required_error: 'Message is required',
        invalid_type_error: 'Message must be a string',
      })
      .max(320, { message: 'Message must not be longer than 320 characters' }),
  })
  .partial({ email: true });

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
    const feedback = await prisma.feedback.create({ data: feedbackData });
    return NextResponse.json(feedback);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
