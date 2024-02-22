import { z } from 'zod';
import { minMaxString } from '@/lib/validationSchemas/utils';
import { PHONE_REGEX } from '@/lib/consts';

const organizationTypes = ['HOSPITAL', 'SOCIAL_SERVICE', 'PSY_CENTER'];
const districts = ['Личаківський', 'Залізничний', 'Шевченківський', 'Галицький', 'Сихівський', 'Франківський'];
const therapies = ['Індивідуальна', 'Для дітей і підлітків', 'Сімейна', 'Групова', 'Для пар', 'Для бізнесу'];

const DefaultSchema = z.object({
  name: minMaxString(1, 128, 'Назва'),
});

const RestSchema = z.object({
  formatOfWork: z.enum(['ONLINE', 'OFFLINE', 'BOTH'], {
    required_error: "Формат - обов'язкове поле",
    invalid_type_error: 'Формат має бути OFFLINE/ONLINE/BOTH',
  }),
  description: z
    .string({ required_error: "Опис - обов'язкове поле", invalid_type_error: 'Опис має бути рядком' })
    .trim(),
  email: z.string().trim().email({ message: 'Введіть пошту у коректному форматі' }).nullish(),
  phone: z
    .string()
    .trim()
    .refine(val => PHONE_REGEX.test(val), { message: 'Введіть номер телефону у форматі +380ХХХХХХХХХ' })
    .nullish(),
  website: z.string({ invalid_type_error: 'Вебсайт має бути рядком' }).trim().nullish(),
  type: z
    .array(z.enum(organizationTypes, { invalid_type_error: 'Тип має бути HOSPITAL/SOCIAL_SERVICE/PSY_CENTER' }), {
      required_error: "Тип організації - обов'зякове поле",
    })
    .nonempty({ message: 'Оберіть хоча б один тип організації' }),
  yearsOnMarket: z.number({ invalid_type_error: 'Роки на ринку мають бути числом' }).nullish(),
  addresses: z.array(
    z.object({
      fullAddress: minMaxString(1, 128, 'Повна адреса').nullish(),
      district: z
        .enum(districts, {
          invalid_type_error: 'Оберіть існуючий район',
        })
        .nullish(),
    }),
  ),
  therapies: z
    .array(z.enum(therapies, { invalid_type_error: 'Оберіть існуючий вид терапії' }), {
      required_error: "Тип терапії - обов'язкове поле",
    })
    .nonempty({ message: 'Оберіть хоча б один тип терапії' }),
  isFreeReception: z.boolean({
    required_error: "Безкоштовна консультація - обов'язкове поле",
    invalid_type_error: "Оберіть 'Так' чи 'Ні' для активного спеціаліста",
  }),
  isActive: z.boolean().refine(val => console.log(val)),
});

const DraftOrganizationSchema = RestSchema.partial().extend({
  isActive: z.literal(false),
  isFreeReception: z.boolean().nullish(),
});
const ActiveOrganizationSchema = RestSchema.extend({ isActive: z.literal(true) });

const OrganizationSchemaUnion = z.discriminatedUnion('isActive', [ActiveOrganizationSchema, DraftOrganizationSchema]);

export const OrganizationSchema = z.intersection(OrganizationSchemaUnion, DefaultSchema).superRefine((data, ctx) => {
  const { addresses, formatOfWork, isActive } = data;
  // there should be no addresses for online org
  if (formatOfWork === 'ONLINE' && addresses.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['addresses'],
      message: 'Приберіть всі адреси, якщо організація працює онлайн',
    });
  }
  // at least 1 address for active org is required
  if (formatOfWork !== 'ONLINE' && isActive && !addresses.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['addresses'],
      message: 'Додайте хоча б одну адресу',
    });
  }
  // no empty address and district for active org
  if (formatOfWork !== 'ONLINE' && isActive) {
    addresses.forEach((address, index) => {
      if (!address.fullAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['addresses', index, 'fullAddress'],
          message: "Повна адреса - обов'язкове поле",
        });
      }
      if (!address.district) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['addresses', index, 'district'],
          message: "Район - обов'язкове поле",
        });
      }
    });
  }
});
