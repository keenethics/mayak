import { z } from 'zod';
import {
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

const zOrganizationSchema = specialistCore.extend({
  name: zStringWithMax,
  yearsOnMarket: zInteger,
  description: zString,
});

const restProps = zOrganizationSchema.extend({
  addresses: zCreateAddressSchema.array().default([]),
});

// ------------------ CREATE SECTION ---------------------

const createDefaultProps = z.object({
  name: zStringWithMax,
  type: zStringArray,
});

const activeOrganizationSchema = restProps.extend({
  isActive: z.literal(true),
});

const draftOrganizationSchema = restProps.partial().extend({
  isActive: z.literal(false),
});

export const organizationSchemaUnion = z.discriminatedUnion('isActive', [
  activeOrganizationSchema,
  draftOrganizationSchema,
]);
export const organizationCreateValidationSchema = createValidationSchema(organizationSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const editDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
  specializationsIds: zStringArray,
});

const activeOrganizationEditSchema = restProps.extend({
  addresses: zEditAddressSchema.array().default([]),
  therapiesIds: zStringArray,
  isActive: z.literal(true),
});

const draftOrganizationEditSchema = restProps.partial().extend({
  addresses: zEditAddressSchema.array(),
  isActive: z.literal(false),
});

const organizationSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeOrganizationEditSchema,
  draftOrganizationEditSchema,
]);

export const organizationEditValidationSchema = createValidationSchema(organizationSchemaEditUnion, editDefaultProps);
