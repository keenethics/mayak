import { z } from 'zod';
import { Gender } from '@prisma/client';
import {
  MESSAGES,
  createValidationSchema,
  specialistCore,
  zCreateAddressSchema,
  zEditAddressSchema,
  zInteger,
  zString,
  zStringArray,
  zStringWithMax,
} from './specialistCommonSchemas';

// ------------------ COMMON SECTION ---------------------

const zSpecialistSchema = specialistCore.extend({
  surname: zStringWithMax.nullish(),
  gender: zString.refine(val => Object.values(Gender).includes(val), {
    message: MESSAGES.unacceptableValue,
    invalid_type_error: 'Неприпустиме значення',
  }),
  yearsOfExperience: zInteger,
  description: zString.nullish(),
});

const restProps = zSpecialistSchema.extend({
  addresses: zCreateAddressSchema.array().default([]),
});

// ------------------ CREATE SECTION ---------------------

const createDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializations: zStringArray,
});

const activeSpecialistSchema = restProps.extend({
  therapies: zStringArray,
  isActive: z.literal(true),
});

const draftSpecialistSchema = restProps.partial().extend({
  isActive: z.literal(false),
});

export const specialistSchemaUnion = z.discriminatedUnion('isActive', [activeSpecialistSchema, draftSpecialistSchema]);
export const specialistCreateValidationSchema = createValidationSchema(specialistSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const editDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializationsIds: zStringArray,
});

const activeSpecialistEditSchema = restProps.extend({
  addresses: zEditAddressSchema
    .array()
    .min(1, {
      message: MESSAGES.requiredField,
    })
    .default([]),
  therapiesIds: zStringArray,
  isActive: z.literal(true),
});

const draftSpecialistEditSchema = restProps.partial().extend({
  addresses: zEditAddressSchema.array(),
  isActive: z.literal(false),
});

const specialistSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeSpecialistEditSchema,
  draftSpecialistEditSchema,
]);

export const specialistEditValidationSchema = createValidationSchema(specialistSchemaEditUnion, editDefaultProps);
