import { z } from 'zod';
import { FormatOfWork } from '@prisma/client';
import { MAX_NUM_SELECTED_SOCIAL_LINKS } from '@admin/_lib/consts';
import { PHONE_REGEX } from '@/lib/consts';

// ------------------ COMMON SECTION ---------------------
export const MESSAGES = {
  requiredField: `Обов'язкове поле`,
  unacceptableValue: 'Недопустиме значення',
  singlePrimaryAddress: 'Необхідно вказати одну головну адресу',
};

export const zString = z
  .string({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField,
  })
  .trim();

export const zStringWithMax = zString.max(128, {
  message: 'Поле не повинно перевищувати 128 символів',
});

export const zStringArray = zString.array().min(1, {
  message: MESSAGES.requiredField,
});

export const zInteger = z
  .number({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.unacceptableValue,
  })
  .nonnegative({
    message: 'Число має бути не менше 0',
  })
  .nullish();

export const zUrl = zString.url({ message: MESSAGES.unacceptableValue });

export const serviceProviderCore = z.object({
  isActive: z.boolean().optional(),
  formatOfWork: zString.refine(val => Object.values(FormatOfWork).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  isFreeReception: z.boolean(),
  phone: zString
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Введіть номер телефона у форматі +380XXXXXXXXX',
    })
    .nullish(),
  email: zString.email().nullish(),
  addressesIds: zString.array().nullish(),
  website: zString.url({ message: MESSAGES.unacceptableValue }).nullish(),
  socialLink: z
    .object({
      instagram: zUrl.nullish(),
      facebook: zUrl.nullish(),
      youtube: zUrl.nullish(),
      linkedin: zUrl.nullish(),
      tiktok: zUrl.nullish(),
      viber: zUrl.nullish(),
      telegram: zUrl.nullish(),
    })
    .refine(
      links => {
        const numLinks = Object.values(links).filter(link => link)?.length;
        return numLinks <= MAX_NUM_SELECTED_SOCIAL_LINKS;
      },
      {
        message: `Максимальна кількість вказаних соціальних мереж 
        не повинна перевищувати ${MAX_NUM_SELECTED_SOCIAL_LINKS}`,
      },
    ),
});

const zCoordinateSchema = z.object({
  latitude: z
    .number({ required_error: MESSAGES.requiredField, invalid_type_error: MESSAGES.unacceptableValue })
    .min(-180, { message: 'Мінімальне допустиме значення -180' })
    .max(180, { message: 'Максимальне допустиме значення 180' }),
  longitude: z
    .number({ required_error: MESSAGES.requiredField, invalid_type_error: MESSAGES.unacceptableValue })
    .min(-90, { message: 'Мінімальне допустиме значення -90' })
    .max(90, { message: 'Максимальне допустиме значення 90' }),
});

export const zEditAddressSchema = z.object({
  id: z.string().nullish(),
  fullAddress: zStringWithMax,
  nameOfClinic: z.string().nullish(),
  districtId: zString,
  district: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullish(),
  isPrimary: z
    .boolean()
    .nullish()
    .transform(arg => (arg === null ? false : arg)),
  ...zCoordinateSchema.shape,
});

export const zCreateAddressSchema = z.object({
  fullAddress: zStringWithMax,
  district: zStringWithMax,
  nameOfClinic: zStringWithMax.nullish(),
  isPrimary: z.boolean(),
  ...zCoordinateSchema.shape,
});

export const singlePrimaryAddressRefine = addresses => {
  if (!addresses.length) return true;
  return addresses.filter(el => el.isPrimary).length === 1;
};

// ---- SUPPORT FOCUS SECTION ----

export const zSupportFocusSchema = z.object({
  id: zString.nullish(),
  price: zInteger.nullish(),
  therapy: z.object({
    id: zString,
    title: zString,
  }),
  requestsIds: zString.array().min(1, {
    message: 'Необхідно обрати хоча б один запит',
  }),
});

export const createValidationSchema = (schemaUnion, defaultProperties) =>
  z.intersection(schemaUnion, defaultProperties).superRefine((schema, ctx) => {
    const { formatOfWork, isActive, addresses } = schema;

    if (isActive && formatOfWork !== FormatOfWork.ONLINE && !addresses.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'Необхідно вказати мінімум одне місце надання послуг',
        path: ['addresses'],
      });
    }

    if (formatOfWork === FormatOfWork.ONLINE) {
      return {
        ...schema,
        addresses: [],
      };
    }
    return schema;
  });
