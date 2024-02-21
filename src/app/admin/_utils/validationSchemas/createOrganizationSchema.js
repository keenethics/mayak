import { z } from 'zod';
import { minMaxString } from '@/lib/validationSchemas/utils';
import { PHONE_REGEX } from '@/lib/consts';

const organizationTypes = ['HOSPITAL', 'SOCIAL_SERVICE', 'PSY_CENTER'];

const OrganizationSchema = z.object({
  name: minMaxString(1, 128, 'Назва'),
  format: z.enum(['ONLINE', 'OFFLINE', 'BOTH'], {
    required_error: 'Формат - необхідне поле',
    invalid_type_error: 'Формат має бути OFFLINE/ONLINE/BOTH',
  }),
  description: z
    .string({ required_error: 'Опис - необхідне поле', invalid_type_error: 'Коментарі мають бути рядком' })
    .trim(),
  email: z.string().trim().email().nullish(),
  phone: z
    .string()
    .trim()
    .refine(val => PHONE_REGEX.test(val), { message: 'Введіть номер телефону у форматі +380ХХХХХХХХХ' })
    .nullish(),
  website: z.string({ invalid_type_error: 'Коментарі мають бути рядком' }).nullish(),
  type: z
    .array()
    .nonempty({ message: 'Будь ласка, оберіть хоча б одини тип' })
    .max(3, { message: 'Організація не може мати більше трьох типів' })
    .refine(types => types.every(type => type in organizationTypes)),
});
