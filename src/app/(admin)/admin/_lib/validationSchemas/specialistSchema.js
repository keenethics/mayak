import { z } from 'zod';
import { Gender } from '@prisma/client';
import {
  MESSAGES,
  createValidationSchema,
  singlePrimaryAddressRefine,
  specialistCore,
  zCreateAddressSchema,
  zEditAddressSchema,
  zEditTherapyCutSchema,
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
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
});

const createDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializations: zStringArray,
});

const activeSpecialistSchema = restCreateProps.extend({
  therapiesCuts: zEditTherapyCutSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  isActive: z.literal(true),
});

const draftSpecialistSchema = restCreateProps.partial().extend({
  therapiesCuts: zEditTherapyCutSchema.array().nullish(),
  addresses: zCreateAddressSchema.array().nullish(),
  isActive: z.literal(false),
});

export const specialistSchemaUnion = z.discriminatedUnion('isActive', [activeSpecialistSchema, draftSpecialistSchema]);
export const specialistCreateValidationSchema = createValidationSchema(specialistSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const restEditProps = zSpecialistSchema.extend({
  addresses: zEditAddressSchema
    .array()
    .default([])
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
  therapiesCutsIds: z.string().array().nullish(),
});

const editDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializationsIds: zStringArray,
});

const activeSpecialistEditSchema = restEditProps.extend({
  therapiesCuts: zEditTherapyCutSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  isActive: z.literal(true),
});

const draftSpecialistEditSchema = restEditProps.partial().extend({
  therapiesCuts: zEditTherapyCutSchema.array().nullish(),
  addresses: zEditAddressSchema.array().nullish(),
  isActive: z.literal(false),
});

const specialistSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeSpecialistEditSchema,
  draftSpecialistEditSchema,
]);

export const specialistEditValidationSchema = createValidationSchema(specialistSchemaEditUnion, editDefaultProps);
