import {AxiosResponse} from 'axios';

import client from 'lib/client';

import {ENDPOINT, RegisterCompany} from '../constants';

function register(payload: RegisterCompany): Promise<AxiosResponse<any, any>> {
    return client.post(ENDPOINT.register, payload);
  }

function listCompany(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.list, {
      params: {
        ...arg,
      },
    });
  }

export {register, listCompany};