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
    invalid_type_error: MESSAGES.unacceptableValue,
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

const zPlacesOfWorkSchema = z.array(
  z.object({
    fullAddress: zStringWithMax,
    nameOfClinic: z.string().nullish(),
    district: zString,
  }),
  // .default([]),
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
  placesOfWork: zPlacesOfWorkSchema.nullish(),
});

const activeSpecialistSchema = restProps.extend({
  isActive: z.literal(true),
  placesOfWork: zPlacesOfWorkSchema.nullish(),
});

const draftSpecialistSchema = restProps.partial().extend({
  isActive: z.literal(false),
  placesOfWork: zPlacesOfWorkSchema.nullish(),
});

const specialistSchemaUnion = z.discriminatedUnion('isActive', [activeSpecialistSchema, draftSpecialistSchema]);

export const specialistValidationSchema = z
  .intersection(specialistSchemaUnion, defaultProps)
  .superRefine((schema, ctx) => {
    const { formatOfWork, isActive, placesOfWork } = schema;

    if (isActive && formatOfWork !== FormatOfWork.ONLINE && !placesOfWork.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'Необхідно вказати мінімум одне місце надання послуг',
        path: ['placesOfWork'],
      });
    }

    if (formatOfWork === FormatOfWork.ONLINE) {
      return {
        ...schema,
        placesOfWork: [],
      };
    }

    return true;
  });
