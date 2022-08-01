import shallow from 'zustand/shallow';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import {useAsync, useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import {useAuth} from './index';

import * as authServices from '../services';

import * as TYPES from '../constants';
import {Login} from '../constants';

type useLogin = [(payload: Login) => Promise<void>, string, string, any];

export function useLogin(): useLogin {
  const navigate = useNavigate();
  const {execute, status, value, errorMessage, fieldErrors} = useAsync<
    any,
    Login
  >(authServices.login);
  const [setAuth] = useAuth(state => [state.setAuth], shallow);

  useEffect(() => {
    if (status === 'resolved') {
      setAuth(value.data);
      navigate('/');
    }
  }, [status]);

  async function login(payload: Login): Promise<void> {
    try {
      await execute(payload);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return [login, status, errorMessage, fieldErrors];
}

type useLogout = [() => void];

export function useLogout(): useLogout {
  const navigate = useNavigate();
  const [clearSession] = useAuth(state => [state.clearSession], shallow);

  function logout(): void {
    clearSession();
    navigate('/');
  }

  return [logout];
}

export const useProfile = (): IUseGetQuery => {
  const [setUser] = useAuth(state => [state.setUser], shallow);

  const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
    queryKey: TYPES.FETCH_PROFILE,
    queryFn: async () => {
      const response = await authServices.me();
      setUser(response.data.data);
      return response.data;
    },
  });

  return {
    data,
    status,
    errorMessage,
    isIdle,
    refetch,
  };
};
