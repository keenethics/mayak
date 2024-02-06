import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class TooManyRequestsException extends BaseError {
  constructor(data = null) {
    const { 429: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 429, data);
    this.name = errorMessage;
  }
}
