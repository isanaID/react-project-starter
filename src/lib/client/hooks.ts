import {useState, useMemo} from 'react';
import {useQuery} from 'react-query';

export type Status = 'idle' | 'fetching' | 'resolved' | 'rejected';

export const useAsync = <T, P>(
  asyncFunction: (arg?: P) => Promise<T>,
): {
  execute: (arg?: P) => Promise<void>;
  status: Status;
  value: T | null;
  error: unknown | null;
  errorMessage: string;
  fieldErrors: any;
} => {
  const [status, setStatus] = useState<Status>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  const fieldErrors = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.errors;
      }
      return {};
    }
    return null;
  }, [error]);

  const execute = async (arg: P): Promise<void> => {
    setStatus('fetching');
    setValue(null);
    setError(null);
    try {
      const {data} = (await asyncFunction(arg)) as any;
      setValue(data);
      setStatus('resolved');
    } catch (err) {
      setError(err);
      setStatus('rejected');
      throw err;
    }
  };

  return {execute, status, value, error, errorMessage, fieldErrors};
};

export interface IUseGetQuery {
  data: any;
  refetch: any;
  status: string;
  errorMessage: string;
  isIdle: boolean;
}

export const useGetQuery = ({
  queryKey,
  queryFn,
  enabled = true,
}: {
  queryKey: string | string[];
  queryFn: () => Promise<any>;
  enabled?: boolean;
}): IUseGetQuery => {
  const {data, status, error, isIdle, refetch} = useQuery<any, any>(
    queryKey,
    queryFn,
    {
      enabled,
    },
  );

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  return {data, status, isIdle, errorMessage, refetch};
};
