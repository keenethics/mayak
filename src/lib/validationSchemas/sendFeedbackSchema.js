import { z } from 'zod';
import { PHONE_REGEX } from '../consts';
import { minMaxString } from './utils';

const SendFeedback = z.object({
  name: minMaxString(1, 128, 'Вкажіть Ваше Імʼя'),
  phone: z
    .string({
      required_error: 'Мобільний телефон є обовʼязковим',
      invalid_type_error: 'Phone number must be a string',
    })
    .trim()
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Будь ласка введіть номер у форматі +380XXXXXXXXX',
    }),
  callMe: z.boolean({
    required_error: 'callMe is required',
    invalid_type_error: 'callMe must be a boolean',
  }),
  email: z.string().trim().email().optional(),
  message: minMaxString(5, 320, 'Повідомлення'),
});

export default SendFeedback;
