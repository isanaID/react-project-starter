import {AxiosResponse} from 'axios';

import client from 'lib/client';

import {ENDPOINT} from '../constants';

function listCompany(): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.listCompany, {
        params: {
          "page": 1,
          "limit": 100,
        },
      });
  }

function listKiosk(): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.listKiosk, {
        params: {
            "page": 1,
            "limit": 100,
        },
    });
}

function listFatmor(): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.listFatmor, {
        params: {
            "page": 1,
            "limit": 100,
        },
    });
}

  export {
    listCompany,
    listKiosk,
    listFatmor,
  }