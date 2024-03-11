import { BASE_ERROR_MESSAGES } from '../consts';
import { BaseError } from './BaseError';

export class TooManyRequestsException extends BaseError {
  constructor(data = null) {
    const { 429: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 429, data);
  }
}
