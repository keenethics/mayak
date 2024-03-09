import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { PHONE_REGEX } from '@/lib/consts';

// ------------------ COMMON SECTION ---------------------
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

const zAddressSchema = z.object({
  id: z.string().nullish(),
  fullAddress: zStringWithMax,
  nameOfClinic: z.string().nullish(),
  districtId: z.string(),
  district: z
    .object({
      id: z.string(),
      name: zString,
    })
    .nullish(),
});

const organizationCore = z.object({
  isActive: z.boolean().optional(),
  surname: zStringWithMax.nullish(),
  gender: zString.refine(val => Object.values(Gender).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  yearsOfExperience: zYearsOfExperience,
  formatOfWork: zString.refine(val => Object.values(FormatOfWork).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  isFreeReception: z.boolean(),
  description: zString.nullish(),
  phone: zString
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Введіть номер телефона у форматі +380XXXXXXXXX',
    })
    .nullish(),
  email: zString.email().nullish(),
  website: zString.url().nullish(),
  addressesIds: zString.array(),
});

const editDefaultProps = z.object({
  name: zStringWithMax,
  organizationTypesIds: zStringArray,
});

const activeOrganizationEditSchema = organizationCore.extend({
  addresses: zAddressSchema
    .array()
    .min(1, {
      message: MESSAGES.requiredField,
    })
    .default([]),
  therapiesIds: zStringArray,
  isActive: z.literal(true),
});

const draftOrganizationEditSchema = organizationCore.partial().extend({
  addresses: zAddressSchema.array(),
  isActive: z.literal(false),
});

const organizationSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeOrganizationEditSchema,
  draftOrganizationEditSchema,
]);

export const organizationEditValidationSchema = z
  .intersection(organizationSchemaEditUnion, editDefaultProps)
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
