import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class UnprocessableException extends BaseError {
  constructor(data = null) {
    const { 422: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 422, data);
    this.name = errorMessage;
  }
}
