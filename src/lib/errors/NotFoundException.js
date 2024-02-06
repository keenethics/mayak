import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class NotFoundException extends BaseError {
  constructor(data = null) {
    const { 404: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 404, data);
    this.name = errorMessage;
  }
}
