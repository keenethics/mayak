import { z } from 'zod';
import { minMaxString } from './utils';

export const CreateEventSchema = z
  .object({
    eventName: minMaxString(1, 128, 'Event name'),
    organizerName: minMaxString(1, 128, 'Organizer name'),
    eventDate: z.date({
      required_error: 'Date is required',
      invalid_type_error: 'Please, input correct type of date',
    }),
    notes: minMaxString(1, 350, 'Notes').optional(),
    locationLink: z.string({ invalid_type_error: 'Location link must be string' }).trim().optional(),
    additionalLink: z
      .object({
        label: minMaxString(1, 30, 'Label'),
        link: z.string({ required_error: 'Link is required', invalid_type_error: 'Link must be string' }).trim(),
      })
      .optional(),
    format: z.enum(['ONLINE', 'OFFLINE'], {
      required_error: 'Format is required',
      invalid_type_error: 'Format must be OFFLINE/ONLINE',
    }),
    priceType: z.enum(['FREE', 'FIXED_PRICE', 'MIN_PRICE'], {
      required_error: 'Price type is required',
      invalid_type_error: 'Price type must be FREE/FIXED_PRICE/MIN_PRICE',
    }),
    price: z.number().optional(),
    address: minMaxString(1, 128, 'address').optional(),
  })
  .superRefine((data, ctx) => {
    const {
      price, format, address, priceType,
    } = data;
    if (format === 'ONLINE' && address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'There must not be address for online event',
      });
    }
    if (format === 'OFFLINE' && !address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['address'],
        message: 'Address is required',
      });
    }
    if (priceType === 'FREE' && price) {
      ctx.addIssue({
        path: ['price'],
        message: 'There must not be price for free event',
      });
    }
    if (priceType !== 'FREE' && (!price || price <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: 'Non-negative price is required for paid events',
      });
    }
  });
