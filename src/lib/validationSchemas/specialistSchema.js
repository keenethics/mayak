import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { PHONE_REGEX } from '@/lib/consts';

const MESSAGES = {
  requiredField: `Обов'язкове поле`,
  unacceptableValue: 'Недопустиме значення',
};

const zString = z
  .string({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField,
  })
  .trim();

const zStringWithMax = zString.max(128, {
  message: 'Поле не повинно перевищувати 128 символів',
});

const zStringArray = zString.array().min(1, {
  message: MESSAGES.requiredField,
});

const zYearsOfExperience = z
  .number({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.unacceptableValue,
  })
  .nonnegative()
  .nullish();

const zAddressesSchema = z.array(
  z
    .object({
      fullAddress: zStringWithMax,
      nameOfClinic: z.string().nullish(),
      district: zString,
    })
    .default([]),
);

const defaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializations: zStringArray,
});

const restProps = z.object({
  isActive: z.boolean().optional(),
  surname: zStringWithMax.nullish(),
  gender: zString.refine(val => Object.values(Gender).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  yearsOfExperience: zYearsOfExperience,
  formatOfWork: zString.refine(val => Object.values(FormatOfWork).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  therapies: zStringArray,
  isFreeReception: z.boolean(),
  description: zString.nullish(),
  phone: zString
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Введіть номер телефона у форматі +380XXXXXXXXX',
    })
    .nullish(),
  email: zString.email().nullish(),
  website: zString.url().nullish(),
  addresses: zAddressesSchema.default([]),
});

const activeSpecialistSchema = restProps.extend({
  isActive: z.literal(true),
});

const draftSpecialistSchema = restProps.partial().extend({
  isActive: z.literal(false),
});

const specialistSchemaUnion = z.discriminatedUnion('isActive', [activeSpecialistSchema, draftSpecialistSchema]);

export const specialistValidationSchema = z
  .intersection(specialistSchemaUnion, defaultProps)
  .superRefine((schema, ctx) => {
    const { formatOfWork, isActive, addresses } = schema;

    if (isActive && formatOfWork !== FormatOfWork.ONLINE && !addresses.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'Необхідно вказати мінімум одне місце надання послуг',
        path: ['addresses'],
      });
    }

    if (formatOfWork === FormatOfWork.ONLINE) {
      return {
        ...schema,
        addresses: [],
      };
    }

    return schema;
  });
