import { z } from 'zod';
import { DaysOfWeek, FormatOfWork, Gender } from '@prisma/client';
import { PHONE_REGEX, TIME_RANGE_REGEX } from '@/lib/consts';

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

const zStringInEnum = prismaEnum =>
  z.string().refine(val => Object.values(prismaEnum).includes(val), { message: MESSAGES.unacceptableValue });

const zYearsOfExperience = z
  .number({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.unacceptableValue,
  })
  .nonnegative()
  .nullish();

const zPlacesOfWorkSchema = z.array(
  z
    .object({
      fullAddress: zStringWithMax,
      nameOfClinic: z.string().nullish(),
      district: zString,
    })
    .default([]),
);
const zDaysOfWorkSchema = z.array(
  z.object({
    daysOfWeek: z.array(zStringInEnum(DaysOfWeek)).min(1),
    timeRanges: z
      .array(
        z.object({
          timeRange: z.string().refine(val => TIME_RANGE_REGEX.test(val), {
            message: 'Введіть проміжок часу у форматі: hh:mm-hh:mm',
          }),
        }),
      )
      .min(1),
  }),
);

const defaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializations: zStringArray,
});

const restProps = z.object({
  isActive: z.boolean().optional(),
  surname: zStringWithMax.nullish(),
  gender: zStringInEnum(Gender),
  yearsOfExperience: zYearsOfExperience,
  formatOfWork: zStringInEnum(FormatOfWork),
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
  placesOfWork: zPlacesOfWorkSchema.default([]),
});

const activeSpecialistSchema = restProps.extend({
  isActive: z.literal(true),
  daysOfWork: zDaysOfWorkSchema.min(1, {
    message: 'Необхідно ввести мінімум один робочий день',
  }),
});

const draftSpecialistSchema = restProps.partial().extend({
  isActive: z.literal(false),
  daysOfWork: zDaysOfWorkSchema,
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

    return schema;
  });
