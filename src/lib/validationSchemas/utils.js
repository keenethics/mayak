import { z } from 'zod';

export const errors = fieldName => ({
  required: `${fieldName} - обов'язкове поле`,
  nonEmpty: `${fieldName} - не може бути пустим`,
  format: expected => `${fieldName} - має бути ${expected}`,
  string: {
    type: `${fieldName} має бути рядком`,
    min: length => `${fieldName} має містити не менше ніж ${length} символів`,
    max: length => `${fieldName} має містити не більше ніж ${length} символів`,
  },
  date: {
    format: `${fieldName} - невірний формат дати`,
    min: date => `${fieldName} не може бути ранішою за ${date}`,
  },
});

export const string = (
  fieldName,
  opts = { required: true },
  schema = z
    .string({
      required_error: opts.required ? errors(fieldName).required : undefined,
      invalid_type_error: errors(fieldName).string.type,
    })
    .trim(),
) => ({
  min: minLength =>
    string(fieldName, opts, schema.min(minLength, { message: errors(fieldName).string.min(minLength) })),
  max: maxLength =>
    string(fieldName, opts, schema.max(maxLength, { message: errors(fieldName).string.max(maxLength) })),
  nullish: () => string(fieldName, opts, schema.nullish()),
  zod: schema,
});

export const date = (
  fieldName,
  opts = { required: true },
  schema = z.coerce
    .date({
      required_error: opts.required ? errors(fieldName).required : undefined,
      invalid_type_error: errors(fieldName).date.format,
    })
    .trim(),
) => ({
  min: d => date(fieldName, opts, schema.min(d, { message: errors(fieldName).date.min(d) })),
  zod: schema,
});
