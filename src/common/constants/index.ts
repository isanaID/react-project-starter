export const ENDPOINT = {
    listCompany: '/dashboard-internal/company/get-list',
    listKiosk: '/dashboard-internal/device-kiosk/get-list',
    listFatmor: '/dashboard-internal/device-fatmor/get-list',
}

const NAMESPACE = 'COMMON';

export const FETCH_LIST_COMPANY = `${NAMESPACE}/FETCH_LIST_COMPANY`;
export const FETCH_LIST_KIOSK = `${NAMESPACE}/FETCH_LIST_KIOSK`;
export const FETCH_LIST_FATMOR = `${NAMESPACE}/FETCH_LIST_FATMOR`;