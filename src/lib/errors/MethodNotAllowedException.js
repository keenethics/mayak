import { BaseError } from './BaseError';
import { BASE_ERROR_MESSAGES } from '../consts';

export class MethodNotAllowedException extends BaseError {
  constructor(data = null) {
    const { 405: errorMessage } = BASE_ERROR_MESSAGES;
    super(errorMessage, 405, data);
  }
}
