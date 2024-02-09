import { z } from 'zod';
import { PHONE_REGEX } from '@/lib/consts';

const zString = fieldName => z
  .string({
    required_error: `${fieldName} is required`,
    invalid_type_error: 'Must be a string',
  })
  .trim();

const zStringWithMinMax = fieldName => zString(fieldName)
  .min(2, {
    message: 'Can not be empty',
  })
  .max(128, {
    message: 'Must not be longer than 128 characters',
  });

const zArray = z.string().array().min(1);

const placesOfWorkSchema = z.object({
  fullAddress: zString('Full address'),
  nameOfClinic: z.string().nullish(),
  district: zString('District'),
});

const SpecialistCreateDraftSchema = z.object({
  lastName: zStringWithMinMax('Last name'),
  firstName: zStringWithMinMax('First name'),
  specializations: zArray,
});

const SpecialistCreateSchema = SpecialistCreateDraftSchema.extend({
  surname: zStringWithMinMax('Surname').nullish(),
  gender: z.string(),
  yearsOfExperience: z.number().nonnegative(),
  formatOfWork: z.string(),
  therapies: zArray,
  isFreeReception: z.boolean(),
  description: z.string().trim().nullish(),
  phone: zString('Phone number').refine(val => PHONE_REGEX.test(val), {
    message: 'Please, enter phone number in format +380XXXXXXXXX',
  }),
  email: z.string().trim().email().nullish(),
  website: z.string().trim().url().nullish(),
  placesOfWork: z.array(placesOfWorkSchema),
  isActive: z.boolean().optional(),
});

export { SpecialistCreateDraftSchema, SpecialistCreateSchema };
