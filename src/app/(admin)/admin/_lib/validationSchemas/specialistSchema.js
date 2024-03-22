import { z } from 'zod';
import { Gender } from '@prisma/client';
import {
  MESSAGES,
  createValidationSchema,
  singlePrimaryAddressRefine,
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
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
  therapies: zStringArray,
  therapyPricesCreate: z.record(z.string(), z.any()).nullish(),
});

const createDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializations: zStringArray,
});

const activeSpecialistSchema = restCreateProps.extend({
  clientCategories: z
    .object({
      clientCategory: zString,
      isWorkingWith: z.boolean(),
    })
    .array()
    .default([]),
  therapies: zStringArray,
  isActive: z.literal(true),
});

const draftSpecialistSchema = restCreateProps.partial().extend({
  clientCategories: z
    .object({
      clientCategory: zString,
      isWorkingWith: z.boolean(),
    })
    .array()
    .nullish()
    .default([]),
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
  therapiesIds: zStringArray,
  therapyPrices: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      therapy: z.object({
        id: z.string(),
      }),
    }),
  ),
  therapyPricesEdit: z.record(z.string(), z.any()),
});

const editDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializationsIds: zStringArray,
});

const activeSpecialistEditSchema = restEditProps.extend({
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
