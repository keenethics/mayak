import { RESOURCES } from '@/app/admin/_lib/consts';

export const LOGIN_URL = '/admin#/login';
export const PHONE_REGEX = /^\+380\d{9}$/;
export const FAQ_PRIORITY_CHANGE_STEP = 1;
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

export const MODEL_INCLUDES = {
  [RESOURCES.specialist]: {
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
  [RESOURCES.organization]: {
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
  [RESOURCES.event]: {
    additionalLink: { select: { label: true, link: true } },
    tags: { select: { name: true } },
  },
};
