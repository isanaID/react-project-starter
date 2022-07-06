/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */

const APP_NAME = require('../../../../package.json').name;

const ENVIRONMENT = process.env.REACT_APP_STAGE || 'local';

export const TOKEN_STORAGE_KEY = `${APP_NAME}_${ENVIRONMENT}_token`;
export const USER_STORAGE_KEY = `${APP_NAME}_${ENVIRONMENT}_user`;

export const AUTH_PROVIDER_CONFIG = {
  endpoint: {
    login: '/login',
    logout: '/logout',
    me: '/me',
  },
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}
