const NAMESPACE = 'LOG_ACTIVITY';

export const ENDPOINT = {
    logDashboard: '/dashboard-internal/log-activity/dashboard',
    logTraffic: '/dashboard-internal/log-activity/traffic-api',
    totalAccess: '/dashboard-internal/log-activity/total-access',
    detailAccess: '/dashboard-internal/log-activity/detail-total-access/',
}

/** ************************* For Actions *************************************** */
export const FETCH_LOG_DASHBOARD = `${NAMESPACE}_FETCH_LOG_DASHBOARD`;
export const FETCH_LOG_TRAFFIC = `${NAMESPACE}_FETCH_LOG_TRAFFIC`;
export const FETCH_TOTAL_ACCESS = `${NAMESPACE}_FETCH_TOTAL_ACCESS`;
export const FETCH_DETAIL_ACCESS = `${NAMESPACE}_FETCH_DETAIL_ACCESS`;
