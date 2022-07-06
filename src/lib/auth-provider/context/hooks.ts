import {useState, useEffect, useMemo} from 'react';

import shallow from 'zustand/shallow';

import {useAuth} from './index';

import * as authServices from '../services';

import {Login} from '../constants';

type useLogin = [(payload: Login) => Promise<void>, string, string];

type Status = 'idle' | 'fetching' | 'resolved' | 'rejected';

export function useLogin(): useLogin {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<any | null>(null);
  const [setAuth] = useAuth(state => [state.setAuth], shallow);

  useEffect(() => {
    if (status === 'resolved') {
      setTimeout(() => {
        setStatus('idle');
      }, 1000);
    }

    if (status === 'rejected') {
      setTimeout(() => {
        setStatus('idle');
      }, 10000);
    }
  }, [status]);

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  async function login(payload: Login): Promise<void> {
    setStatus('fetching');

    try {
      const {data} = await authServices.login(payload);
      await setAuth(data);
      setStatus('resolved');
    } catch (err: any) {
      setStatus('rejected');
      setError(err);
    }
  }

  return [login, status, errorMessage];
}
