import { z } from 'zod';
import { minMaxString } from '@/lib/validationSchemas/utils';

const ActiveEventSchema = z.object({
  isActive: z.literal(true),
  title: minMaxString(1, 128, 'Назва події'),
  organizerName: minMaxString(1, 128, 'Організатор'),
  eventDate: z.coerce
    .date({
      required_error: "Дата події - обов'язкове поле",
      invalid_type_error: 'Невірний формат дати',
    })
    .min(new Date(), { message: 'Дата не може бути ранішою за поточну' }),
  notes: minMaxString(1, 350, 'Коментарі').nullish(),
  locationLink: z.string({ invalid_type_error: 'Коментарі мають бути рядком' }).trim().nullish(),
  additionalLink: z
    .object({
      label: minMaxString(1, 30, 'Тип').nullish(),
      link: z
        .string({ invalid_type_error: 'Посилання має бути рядком' })
        .min(1, 'Посилання не має бути пустим')
        .trim()
        .nullish(),
    })
    .superRefine((data, ctx) => {
      const { label, link } = data;
      if (label && !link) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['link'],
          message: "Посилання - обов'язкове поле",
        });
      }
      if (link && !label) {
        ctx.addIssue({ code: z.ZodIssueCode.invalid_type, path: ['label'], message: "Тип - обов'язкове поле" });
      }
    }),
  format: z.enum(['ONLINE', 'OFFLINE'], {
    required_error: 'Формат - необхідне поле',
    invalid_type_error: 'Формат має бути OFFLINE/ONLINE',
  }),
  priceType: z.enum(['FREE', 'FIXED_PRICE', 'MIN_PRICE'], {
    required_error: "Варіант вартості - обов'язкове поле",
    invalid_type_error: 'Варіант має бути FREE/FIXED_PRICE/MIN_PRICE',
  }),
  price: z.number().nullish(),
  address: minMaxString(1, 128, 'Address').nullish(),
});

const DraftEventSchema = z.object({
  isActive: z.literal(false),
  title: minMaxString(1, 128, 'Назва події'),
  organizerName: minMaxString(1, 128, 'Організатор'),
});

export const EventSchema = z
  .discriminatedUnion('isActive', [ActiveEventSchema, DraftEventSchema])
  .superRefine((data, ctx) => {
    const { price, format, address, priceType } = data;
    if (format === 'ONLINE' && address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'Онлайн подія не повинна мати адресу',
      });
    }
    if (format === 'OFFLINE' && !address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'Адреса чи назва приміщення необхідні для офлайн події',
      });
    }
    if (priceType === 'FREE' && price) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: 'Безкоштовна подія не може мати ціну',
      });
    }
    if (priceType !== 'FREE' && (!price || price <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: "Невід'ємна ціна необхідна для небезкоштовної події",
      });
    }
  });
