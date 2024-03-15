import { z } from 'zod';
import { FormatOfWork } from '@prisma/client';
import { PHONE_REGEX } from '@/lib/consts';

// ------------------ COMMON SECTION ---------------------
export const MESSAGES = {
  requiredField: `Обов'язкове поле`,
  unacceptableValue: 'Недопустиме значення',
};

export const zString = z
  .string({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField,
  })
  .trim();

export const zStringWithMax = zString.max(128, {
  message: 'Поле не повинно перевищувати 128 символів',
});

export const zStringArray = zString.array().min(1, {
  message: MESSAGES.requiredField,
});

export const zInteger = z
  .number({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.unacceptableValue,
  })
  .nonnegative()
  .nullish();

export const zUrl = zString.url({ message: MESSAGES.unacceptableValue });

export const specialistCore = z.object({
  isActive: z.boolean().optional(),
  formatOfWork: zString.refine(val => Object.values(FormatOfWork).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  isFreeReception: z.boolean(),
  phone: zString
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Введіть номер телефона у форматі +380XXXXXXXXX',
    })
    .nullish(),
  email: zString.email().nullish(),
  addressesIds: zString.array().nullish(),
  website: zString.url({ message: MESSAGES.unacceptableValue }).nullish(),
  instagram: zUrl.nullish(),
  facebook: zUrl.nullish(),
  youtube: zUrl.nullish(),
  linkedin: zUrl.nullish(),
  tiktok: zUrl.nullish(),
  viber: zUrl.nullish(),
  telegram: zUrl.nullish(),
});

// ---- ADDRESS SECTION ----

export const zEditAddressSchema = z.object({
  id: z.string().nullish(),
  fullAddress: zStringWithMax,
  nameOfClinic: z.string().nullish(),
  districtId: zString,
  district: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullish(),
});

export const zCreateAddressSchema = z.object({
  fullAddress: zStringWithMax,
  district: zStringWithMax,
  nameOfClinic: zStringWithMax.nullish(),
});

// ---- THERAPY CUT SECTION ----
export const zCreateTherapyCutSchema = z.object({
  therapyId: zString,
  requests: zString.array().min(1, {
    message: 'Необхідно обрати хоча б один запит',
  }),
});

export const createValidationSchema = (schemaUnion, defaultProperties) =>
  z.intersection(schemaUnion, defaultProperties).superRefine((schema, ctx) => {
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
