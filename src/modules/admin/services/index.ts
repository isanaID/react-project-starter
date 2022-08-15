import {AxiosResponse} from 'axios';

import client from 'lib/client';

import {ENDPOINT, RegisterAdmin} from '../constants';

function register(payload: RegisterAdmin): Promise<AxiosResponse<any, any>> {
    return client.post(ENDPOINT.register, payload);
  }

function listAdmin(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.list, {
      params: {
        ...arg,
      },
    });
  }

export {register, listAdmin};