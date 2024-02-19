export const LOGIN_URL = '/admin#/login';
export const PHONE_REGEX = /^\+380\d{9}$/;
export const TIME_RANGE_REGEX = /^([0-1][0-9]|2[0-3]):([0-5][0-9])-([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
export const BASE_ERROR_MESSAGES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  405: 'Method Not Allowed',
  422: 'Unprocessable entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
};
