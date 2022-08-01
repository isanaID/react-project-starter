import {AxiosResponse} from 'axios';

import client from 'lib/client';
import {Login, AUTH_PROVIDER_CONFIG} from '../constants';

const {endpoint} = AUTH_PROVIDER_CONFIG;

function login({email, password}: Login): Promise<AxiosResponse<any, any>> {
  return client.post(endpoint.login, {email, password});
}

function me(): Promise<AxiosResponse<any, any>> {
  return client.get(endpoint.me);
}

export {login, me};
