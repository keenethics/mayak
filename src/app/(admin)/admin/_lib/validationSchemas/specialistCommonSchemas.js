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
  .nonnegative()
  .nullish();

export const zUrl = zString.url({ message: MESSAGES.unacceptableValue });

export const specialistCore = z.object({
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
  clients: z
    .object({
      workingWith: z.string().array().default([]),
      notWorkingWith: z.string().array().default([]),
    })
    .refine(
      clients => {
        const hasDuplicates = clients.workingWith.some(item => clients.notWorkingWith.includes(item));
        return !hasDuplicates;
      },
      { message: 'Категорія клієнта може бути вибрана лише один раз. Перевірте, чи не дублюються поля.' },
    ),
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
});

export const zCreateAddressSchema = z.object({
  fullAddress: zStringWithMax,
  district: zStringWithMax,
  nameOfClinic: zStringWithMax.nullish(),
  isPrimary: z.boolean(),
});

export const singlePrimaryAddressRefine = addresses => {
  if (!addresses.length) return true;
  return addresses.filter(el => el.isPrimary).length === 1;
};

export const createValidationSchema = (schemaUnion, defaultProperties) =>
  z.intersection(schemaUnion, defaultProperties).superRefine((schema, ctx) => {
    const { formatOfWork, isActive, addresses, therapyPricesCreate, therapyPricesEdit, therapies, therapiesIds } =
      schema;

    function mapInvalidTherapyPrices(id, type) {
      id?.forEach(el => {
        ctx.addIssue({
          code: 'custom',
          message: 'Ціна повинна бути цілим числом не менше 0',
          path: [`${type === 'create' ? 'therapyPricesCreate' : 'therapyPricesEdit'}.${el}`],
        });
      });
    }

    if (therapyPricesCreate) {
      mapInvalidTherapyPrices(
        therapies?.filter(el => !zInteger.safeParse(therapyPricesCreate[el]).success),
        'create',
      );
    }

    if (therapyPricesEdit) {
      mapInvalidTherapyPrices(
        therapiesIds?.filter(el => !zInteger.safeParse(therapyPricesEdit[el]).success),
        'edit',
      );
    }

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
