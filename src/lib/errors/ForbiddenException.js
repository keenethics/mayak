import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class ForbiddenException extends BaseError {
  constructor(data = null) {
    const { 403: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 403, data);
    this.name = errorMessage;
  }
}
