import {useAsync, useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import * as services from '../services';
import * as TYPES from '../constants';

export const useLogDashboard = (params: any): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_LOG_DASHBOARD,
            params?.page,
            params?.limit,
          ],
          queryFn: async () => {
            const response = await services.logDashboard(params);
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

export const useLogTraffic = (params: any): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_LOG_TRAFFIC,
            params?.page,
            params?.limit,
          ],
          queryFn: async () => {
            const response = await services.logTraffic(params);
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

export const useTotalAccess = (params: any): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_TOTAL_ACCESS,
            params?.page,
            params?.limit,
          ],
          queryFn: async () => {
            const response = await services.totalAccess(params);
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

export const useDetailAccess = (params: any): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
        queryKey: [
            TYPES.FETCH_DETAIL_ACCESS,
            params?.page,
            params?.limit,
          ],
          queryFn: async () => {
            const response = await services.detailAccess(params);
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