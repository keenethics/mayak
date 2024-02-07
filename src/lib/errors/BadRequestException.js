import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class BadRequestException extends BaseError {
  constructor(data = null) {
    const { 400: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 400, data);
  }
}
