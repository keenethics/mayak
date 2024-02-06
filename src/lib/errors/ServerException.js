import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class ServerException extends BaseError {
  constructor(data = null) {
    const { 500: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 500, data);
    this.name = errorMessage;
  }
}
