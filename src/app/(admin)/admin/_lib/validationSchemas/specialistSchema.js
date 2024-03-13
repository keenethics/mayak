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

// ------------------ CREATE SECTION ---------------------

const restCreateProps = zSpecialistSchema.extend({
  addresses: zCreateAddressSchema
    .array()
    .default([])
    .refine(
      addresses => {
        if (!addresses.length) return true;
        return addresses.filter(el => el.isPrimary).length === 1;
      },
      { message: 'Необхідно вказати одну головну адресу' },
    ),
});

const createDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializations: zStringArray,
});

const activeSpecialistSchema = restCreateProps.extend({
  therapies: zStringArray,
  isActive: z.literal(true),
});

const draftSpecialistSchema = restCreateProps.partial().extend({
  isActive: z.literal(false),
});

export const specialistSchemaUnion = z.discriminatedUnion('isActive', [activeSpecialistSchema, draftSpecialistSchema]);
export const specialistCreateValidationSchema = createValidationSchema(specialistSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const restEditProps = zSpecialistSchema.extend({
  addresses: zEditAddressSchema.array().default([]),
});

const editDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializationsIds: zStringArray,
});

const activeSpecialistEditSchema = restEditProps.extend({
  therapiesIds: zStringArray,
  isActive: z.literal(true),
});

const draftSpecialistEditSchema = restEditProps.partial().extend({
  isActive: z.literal(false),
});

const specialistSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeSpecialistEditSchema,
  draftSpecialistEditSchema,
]);

export const specialistEditValidationSchema = createValidationSchema(specialistSchemaEditUnion, editDefaultProps);
