import {useMemo} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useAsync, useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import * as services from '../services';
import * as TYPES from '../constants';

import {RegisterKiosk, Assign, unAssign} from '../constants';

type useRegister = {
    register: (payload: RegisterKiosk) => Promise<void>;
    status: string;
    value: any;
    errorMessage: string;
    fieldErrors: any;
  };
  
  export function useRegister(): useRegister {
    const {execute, status, value, errorMessage, fieldErrors} = useAsync<
      any,
      TYPES.RegisterKiosk
    >(services.register);
  
    async function register(payload: RegisterKiosk): Promise<void> {
      try {
        await execute(payload);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        throw err;
      }
    }
  
    return {register, status, value, errorMessage, fieldErrors};
  }

  type useAssign = {
    assign: (payload: Assign) => Promise<void>;
    status: string;
    value: any;
    errorMessage: string;
    fieldErrors: any;
  };
  
  export function useAssign(): useAssign {
    const {execute, status, value, errorMessage, fieldErrors} = useAsync<
      any,
      TYPES.Assign
    >(services.assign);
  
    async function assign(payload: Assign): Promise<void> {
      try {
        await execute(payload);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        throw err;
      }
    }
  
    return {assign, status, value, errorMessage, fieldErrors};
  }

  type useUnAssign = {
    unassign: (payload: unAssign) => Promise<void>;
    status: string;
    value: any;
    errorMessage: string;
    fieldErrors: any;
  };
  
  export function useUnAssign(): useUnAssign {
    const {execute, status, value, errorMessage, fieldErrors} = useAsync<
      any,
      TYPES.unAssign
    >(services.UnAssign);
  
    async function unassign(payload: unAssign): Promise<void> {
      try {
        await execute(payload);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        throw err;
      }
    }
  
    return {unassign, status, value, errorMessage, fieldErrors};
  }

  export const useListDevice = (params: any): IUseGetQuery => {
    const search = params?.search;
    const page = params?.page;

    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_LIST,
            search,
            page,
          ],
          queryFn: async () => {
            const response = await services.listDevice(params);
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
}

type useRemove = {
  mutate: any;
  status: string;
  fieldErrors: any;
  errorMessage: string;
};

export function useRemove({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onMutate?: (payload: any) => void;
}): useRemove {
  const queryClient = useQueryClient();

  const {mutate, error, status} = useMutation(services.remove, {
    onMutate: async payload => {
      // check if function
      if (onMutate && typeof onMutate === 'function') onMutate(payload);
    },
    onError: async (err: any) => {
      if (onError && typeof onError === 'function') onError(err);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(TYPES.FETCH_LIST);
      if (onSuccess && typeof onSuccess === 'function') onSuccess();
    },
  });

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

  return {mutate, status, errorMessage, fieldErrors};
}

type useUpdate = {
  mutate: any;
  status: string;
  fieldErrors: any;
  errorMessage: string;
};

export function useUpdate ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onMutate?: (payload: any) => void;
}): useUpdate {
  const queryClient = useQueryClient();

  const {mutate, error, status} = useMutation(services.update, {
    onMutate: async payload => {
      // check if function
      if (onMutate && typeof onMutate === 'function') onMutate(payload);
    },
    onError: async (err: any) => {
      if (onError && typeof onError === 'function') onError(err);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(TYPES.FETCH_LIST);
      if (onSuccess && typeof onSuccess === 'function') onSuccess();
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  } , [error]);

  const fieldErrors = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.errors;
      }
      return {};
    }
    return null;
  } , [error]);

  return {mutate, status, errorMessage, fieldErrors};
}