import {AxiosResponse} from 'axios';

import client from 'lib/client';

import {ENDPOINT, RegisterFatmor, Assign, unAssign} from '../constants';

function register(payload: RegisterFatmor): Promise<AxiosResponse<any, any>> {
    return client.post(ENDPOINT.register, payload);
  }

function assign(payload: Assign): Promise<AxiosResponse<any, any>> {
    return client.post(ENDPOINT.assign, payload);
  }

function UnAssign(payload: unAssign): Promise<AxiosResponse<any, any>> {
    return client.post(ENDPOINT.unAssign, payload);
  }

function listDevice(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.list, {
      params: {
        ...arg,
      },
    });
  }

  function remove(id: string): Promise<AxiosResponse<any, any>> {
    return client.delete(ENDPOINT.remove, {
      params: {
        deviceId: id,
      },
    });
  }

  function update(payload: any): Promise<AxiosResponse<any, any>> {
    return client.put(ENDPOINT.update, payload);
  }

export {register, assign, UnAssign, listDevice, remove, update};