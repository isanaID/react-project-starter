import {AxiosResponse} from 'axios';

import client from 'lib/client';

import {ENDPOINT} from '../constants';

function listAdmin(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.adminlist, {
      params: {
        ...arg,
      },
    });
  }

function deleteAdmin(id: any): Promise<AxiosResponse<any, any>> {
    return client.delete(ENDPOINT.delete, {
      params: {
        adminId: id,
      },
    });
  }

export {listAdmin, deleteAdmin};