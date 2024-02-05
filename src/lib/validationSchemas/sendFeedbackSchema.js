import { z } from 'zod';
import { PHONE_REGEX } from '../consts';

const SendFeedback = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .min(1, {
      message: 'Name can not be empty',
    })
    .max(128, {
      message: 'Name must not be longer than 128 characters',
    }),
  phone: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    })
    .trim()
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Please, enter phone number in format +380XXXXXXXXX',
    }),
  callMe: z.boolean({
    required_error: 'callMe is required',
    invalid_type_error: 'callMe must be a boolean',
  }),
  email: z.string().trim().email(),
  message: z
    .string({
      required_error: 'Message is required',
      invalid_type_error: 'Message must be a string',
    })
    .trim()
    .min(1, {
      message: 'Message can not be empty',
    })
    .max(320, {
      message: 'Message must not be longer than 320 characters',
    })
    .optional(),
});

export default SendFeedback;
