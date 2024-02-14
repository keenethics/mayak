import { z } from "zod";
import { FormatOfWork, Gender } from "@prisma/client";
import { PHONE_REGEX } from "@/lib/consts";

const MESSAGES = {
  requiredField: `Обов'язкове поле`,
  unacceptableValue: "Недопустиме значення"
};

const zString = z
  .string({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField
  })
  .trim();

const zStringWithMinMax = zString
  .min(2, {
    message: "Поле повинно мати не менше двох символів"
  })
  .max(128, {
    message: "Поле не повинно перевищувати 128 символів"
  });

const zStringArray = zString.array().min(1);

const yearsOfExperience = z
  .number({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField
  })
  .nonnegative();

const specialistSharedFields = {
  lastName: zStringWithMinMax,
  firstName: zStringWithMinMax,
  specializations: zStringArray
};

const specialistFields = z.object({
  surname: zStringWithMinMax.nullish(),
  gender: zString.refine(val => Object.values(Gender).includes(val), {
    message: MESSAGES.unacceptableValue
  }),
  yearsOfExperience,
  formatOfWork: zString.refine(val => Object.values(FormatOfWork).includes(val), {
    message: MESSAGES.unacceptableValue
  }),
  therapies: zStringArray,
  isFreeReception: z.boolean(),
  description: zString.trim().nullish(),
  phone: zString
    .refine(val => PHONE_REGEX.test(val), {
      message: "Введіть номер телефона у форматі +380XXXXXXXXX"
    })
    .nullish(),
  email: zString.email().nullish(),
  website: zString.url().nullish(),
  placesOfWork: z.array(z.object({
    fullAddress: zStringWithMinMax,
    nameOfClinic: z.string().nullish(),
    district: zString
  })),
  isActive: z.boolean().optional()
});

export const SpecialistSchema = specialistFields.extend(specialistSharedFields);

export const SpecialistCreateDraftSchema = specialistFields.partial().extend({
  ...specialistSharedFields,
  yearsOfExperience: yearsOfExperience.nullish()
});
