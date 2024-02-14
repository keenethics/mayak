import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { PHONE_REGEX } from '@/lib/consts';

const zString = fieldName =>
  z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: 'Must be a string',
    })
    .trim();

const zStringWithMinMax = fieldName =>
  zString(fieldName)
    .min(2, {
      message: 'Must have at least 2 characters',
    })
    .max(128, {
      message: 'Must not be longer than 128 characters',
    });

const zStringArray = z.string().array().min(1);

const placesOfWorkSchema = z.object({
  fullAddress: zString('Full address'),
  nameOfClinic: z.string().nullish(),
  district: zString('District'),
});

const yearsOfExperience = z
  .number({
    required_error: 'Field is required',
    invalid_type_error: 'Years must be greater then or equal to 0',
  })
  .nonnegative();

const specialistSharedFields = {
  lastName: zStringWithMinMax('Last name'),
  firstName: zStringWithMinMax('First name'),
  specializations: zStringArray,
};

const specialistFields = z.object({
  surname: zStringWithMinMax('Surname').nullish(),
  gender: z.string().refine(val => Object.values(Gender).includes(val), {
    message: 'Unacceptable value',
  }),
  yearsOfExperience,
  formatOfWork: z.string().refine(val => Object.values(FormatOfWork).includes(val), {
    message: 'Unacceptable value',
  }),
  therapies: zStringArray,
  isFreeReception: z.boolean(),
  description: z.string().trim().nullish(),
  phone: zString('Phone number')
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Please, enter phone number in format +380XXXXXXXXX',
    })
    .nullish(),
  email: z.string().trim().email().nullish(),
  website: z.string().trim().url().nullish(),
  placesOfWork: z.array(placesOfWorkSchema),
  isActive: z.boolean().optional(),
});

const SpecialistCreateSchema = specialistFields.extend(specialistSharedFields);

const SpecialistCreateDraftSchema = specialistFields.partial().extend({
  ...specialistSharedFields,
  yearsOfExperience: yearsOfExperience.nullish(),
});

export { SpecialistCreateDraftSchema, SpecialistCreateSchema };
