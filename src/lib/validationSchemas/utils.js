import { z } from 'zod';

export function minMaxString(min, max, fieldName) {
  return z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a string`,
    })
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters long`,
    })
    .max(max, {
      message: `${fieldName} must not be longer than ${max} characters`,
    });
}
