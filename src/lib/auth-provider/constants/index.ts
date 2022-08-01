/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as Yup from 'yup';

const NAMESPACE = 'AUTH';

const APP_NAME = require('../../../../package.json').name;

const ENVIRONMENT = process.env.REACT_APP_STAGE || 'local';

export const TOKEN_STORAGE_KEY = `${APP_NAME}_${ENVIRONMENT}_token`;
export const USER_STORAGE_KEY = `${APP_NAME}_${ENVIRONMENT}_user`;

export const AUTH_PROVIDER_CONFIG = {
  endpoint: {
    login: '/dashboard-internal/login/superuser',
    logout: '/logout',
    me: '/dashboard-internal/superuser/profile',
  },
};

export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  fullname: string;
  phone: string;
  isActive: boolean;
  createAt: string;
  updateAt: string;
}

export interface Login {
  email: string;
  password: string;
}

export const INITIAL_VALUES: Login = {
  email: '',
  password: '',
};

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email must be filled'),
  password: Yup.string().required('Password must be filled'),
});

/** ************************* For Actions *************************************** */
export const FETCH_PROFILE = `${NAMESPACE}_FETCH_PROFILE`;