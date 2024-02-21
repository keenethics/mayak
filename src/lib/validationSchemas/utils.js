import { z } from 'zod';

export function minMaxString(min, max, fieldName) {
  return z
    .string({
      required_error: `${fieldName} - обов'язкове поле`,
      invalid_type_error: `${fieldName} має бути рядком`,
    })
    .trim()
    .min(min, {
      message: `${fieldName} має містити не менше ніж ${min} символів`,
    })
    .max(max, {
      message: `${fieldName} має містити не більше ніж ${max} символів`,
    });
}
