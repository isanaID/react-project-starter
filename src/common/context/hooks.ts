import {useGetQuery, IUseGetQuery} from 'lib/client/hooks';

import * as commonService from '../services';
import * as TYPES from '../constants';

export const useListCompany = (): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
      queryKey: TYPES.FETCH_LIST_COMPANY,
      queryFn: async () => {
        const response = await commonService.listCompany();
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

  export const useListKiosk = (): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
      queryKey: TYPES.FETCH_LIST_KIOSK,
      queryFn: async () => {
        const response = await commonService.listKiosk();
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

    export const useListFatmor = (): IUseGetQuery => {
    const {data, status, errorMessage, isIdle, refetch} = useGetQuery({
      queryKey: TYPES.FETCH_LIST_FATMOR,
      queryFn: async () => {
        const response = await commonService.listFatmor();
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