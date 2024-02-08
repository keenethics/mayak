export const LOGIN_URL = '/admin#/login';
export const PHONE_REGEX = /^\+380\d{9}$/;
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
export const MODEL_SEARCH_FIELDS = {
  Specialist: ['firstName', 'lastName', 'surname'],
  Organization: ['name'],
};
export const MODEL_INCLUDES = {
  Specialist: {
    therapies: { select: { name: true } },
    specializations: { select: { name: true } },
    placesOfWork: {
      select: {
        addresses: {
          select: {
            nameOfClinic: true,
            fullAddress: true,
            district: { select: { name: true } },
          },
        },
      },
    },
  },
  Organization: {
    therapies: { select: { name: true } },
    types: { select: { name: true } },
    addresses: {
      select: {
        nameOfClinic: true,
        fullAddress: true,
        district: { select: { name: true } },
      },
    },
  },
};
