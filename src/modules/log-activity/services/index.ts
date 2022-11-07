import { AxiosResponse } from "axios";

import client from "lib/client";

import { ENDPOINT } from "../constants";

function logDashboard(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.logDashboard, {
        params: {
        ...arg,
        },
    });
    }
    
function logTraffic(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.logTraffic, {
        params: {
        ...arg,
        },
    });
    }

function totalAccess(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(ENDPOINT.totalAccess, {
        params: {
        ...arg,
        },
    });
    }

function detailAccess(arg: any): Promise<AxiosResponse<any, any>> {
    return client.get(`${ENDPOINT.detailAccess}${arg.adminId}`, {
        params: {
        ...arg,
        },
    });
    }

export {
    logDashboard,
    logTraffic,
    totalAccess,
    detailAccess,
}