import {useAsync, useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import * as services from '../services';
import * as TYPES from '../constants';

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