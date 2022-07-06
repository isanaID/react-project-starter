import {AxiosResponse} from 'axios';

import {Login} from '../constants';

import client from '../../client';

function login({email, password}: Login): Promise<AxiosResponse<any, any>> {
  return client.post('/login', {email, password});
}

async function logout(): Promise<AxiosResponse<any, any>> {
  return client.get('/logout');
}

export {login, logout};
