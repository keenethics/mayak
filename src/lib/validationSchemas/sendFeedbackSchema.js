import { z } from 'zod';
import { PHONE_REGEX } from '../consts';
import { minMaxString } from './utils';

const SendFeedback = z.object({
  name: minMaxString(1, 128, 'Name'),
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
  message: minMaxString(1, 320, 'Message').optional(),
});

export default SendFeedback;
