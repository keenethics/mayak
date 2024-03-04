import { BASE_ERROR_MESSAGES } from '../consts';
import { BaseError } from './BaseError';

export class NotAuthorizedException extends BaseError {
  constructor(data = null) {
    const { 401: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 401, data);
  }
}
