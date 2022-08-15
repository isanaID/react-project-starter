import {useAsync, useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import * as services from '../services';
import * as TYPES from '../constants';

import {RegisterCompany} from '../constants';

export const useListCompany = (params: any): IUseGetQuery => {
    const search = params?.search;
    const page = params?.page;

    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_LIST,
            search,
            page,
          ],
          queryFn: async () => {
            const response = await services.listCompany(params);
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
    register: (payload: RegisterCompany) => Promise<void>;
    status: string;
    value: any;
    errorMessage: string;
    fieldErrors: any;
  };
  
  export function useRegister(): useRegister {
    const {execute, status, value, errorMessage, fieldErrors} = useAsync<
      any,
      TYPES.RegisterCompany
    >(services.register);
  
    async function register(payload: RegisterCompany): Promise<void> {
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