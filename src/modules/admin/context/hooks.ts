import {useAsync, useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import * as services from '../services';
import * as TYPES from '../constants';

import {RegisterAdmin} from '../constants';

export const useListAdmin = (params: any): IUseGetQuery => {
    const search = params?.search;
    const page = params?.page;

    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_LIST,
            search,
            page,
          ],
          queryFn: async () => {
            const response = await services.listAdmin(params);
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

type useRegister = {
    register: (payload: RegisterAdmin) => Promise<void>;
    status: string;
    value: any;
    errorMessage: string;
    fieldErrors: any;
  };
  
  export function useRegister(): useRegister {
    const {execute, status, value, errorMessage, fieldErrors} = useAsync<
      any,
      TYPES.RegisterAdmin
    >(services.register);
  
    async function register(payload: RegisterAdmin): Promise<void> {
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