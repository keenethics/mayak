import { z } from 'zod';

const zString = fieldName => z
  .string({
    required_error: `${fieldName} is required`,
    invalid_type_error: 'Must be a string',
  })
  .trim()
  .min(2, {
    message: 'Can not be empty',
  })
  .max(128, {
    message: 'Must not be longer than 128 characters',
  });

const SpecialistCreateDraftSchema = z.object({
  lastName: zString('Last name'),
  firstName: zString('First name'),
  specializations: z.string().array(),
});

const SpecialistCreateSchema = SpecialistCreateDraftSchema.extend({
  surname: zString('Surname').optional(),
  gender: z.string(),
  yearsOfExperience: z.number().nonnegative(),
  formatOfWork: z.string(),
  therapies: z.string(),
});

export { SpecialistCreateDraftSchema, SpecialistCreateSchema };
