import { z } from 'zod';
import { FormatOfWork } from '@prisma/client';
import { minMaxString } from '@/lib/validationSchemas/utils';
import { PHONE_REGEX } from '@/lib/consts';

const DefaultSchema = z.object({
  name: minMaxString(1, 128, 'Назва'),
});

const TypeSchema = z.array(minMaxString(1, 64, 'Тип організації'), {
  required_error: "Тип організації - обов'язкове поле",
});

const TherapiesSchema = z.array(minMaxString(1, 64, 'Тип терапії'), {
  required_error: "Тип терапії - обов'язкове поле",
});

const FormatOfWorkSchema = z.enum(Object.values(FormatOfWork), {
  required_error: "Формат - обов'язкове поле",
  invalid_type_error: 'Формат має бути Офлайн/Онлайн/Офлайн + онлайн',
});

const invalidUrlMessage = 'Посилання має бути рядком';
const RestSchema = z.object({
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
  instagram: z.string({ invalid_type_error: invalidUrlMessage }).trim().url().nullish(),
  facebook: z.string({ invalid_type_error: invalidUrlMessage }).trim().url().nullish(),
  youtube: z.string({ invalid_type_error: invalidUrlMessage }).trim().url().nullish(),
  linkedin: z.string({ invalid_type_error: invalidUrlMessage }).trim().url().nullish(),
  tiktok: z.string({ invalid_type_error: invalidUrlMessage }).trim().url().nullish(),
  yearsOnMarket: z
    .number({ invalid_type_error: 'Роки на ринку мають бути числом' })
    .int('Введіть ціле число')
    .positive('Введіть додатнє число')
    .nullish(),
  addresses: z
    .array(
      z.object({
        fullAddress: minMaxString(1, 128, 'Повна адреса').nullish(),
        district: minMaxString(1, 64, 'Район').nullish(),
      }),
    )
    .nullish(),
  isFreeReception: z.boolean({
    required_error: "Безкоштовний прийом - обов'язкове поле",
    invalid_type_error: "Оберіть 'Так' чи 'Ні' для активного спеціаліста",
  }),
  isActive: z.boolean(),
});

const DraftOrganizationSchema = RestSchema.partial().extend({
  isActive: z.literal(false),
  isFreeReception: z.boolean().nullish(),
  type: TypeSchema.optional(),
  thearpies: TherapiesSchema.optional(),
  formatOfWork: FormatOfWorkSchema.nullish(),
});
const ActiveOrganizationSchema = RestSchema.extend({
  isActive: z.literal(true),
  type: TypeSchema.nonempty({ message: 'Оберіть хоча б один тип організації' }),
  therapies: TherapiesSchema.nonempty({ message: 'Оберіть хоча б один тип терапії' }),
  formatOfWork: FormatOfWorkSchema,
});

const OrganizationSchemaUnion = z.discriminatedUnion('isActive', [ActiveOrganizationSchema, DraftOrganizationSchema]);

export const OrganizationSchema = z.intersection(OrganizationSchemaUnion, DefaultSchema).superRefine((data, ctx) => {
  const { addresses, formatOfWork, isActive } = data;
  // there should be no addresses for online org or for draft org without format of work
  if ((!formatOfWork || formatOfWork === 'ONLINE') && addresses?.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['addresses'],
      message: 'Приберіть всі адреси, якщо організація працює онлайн або нема інформації про формат роботи',
    });
  }
  // at least 1 address for active org is required
  if (formatOfWork !== 'ONLINE' && isActive && !addresses?.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['addresses'],
      message: 'Додайте хоча б одну адресу',
    });
  }
  // no empty address and district for active org
  if (addresses && formatOfWork && formatOfWork !== 'ONLINE') {
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
