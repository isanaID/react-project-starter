const NAMESPACE = 'DETAIL';

export const ENDPOINT = {
    adminlist: '/dashboard-internal/admin/get-list',
    register: '/dashboard-internal/company/',
    delete: '/dashboard-internal/admin/'
  };
  
  /** ************************* For Actions *************************************** */
  export const FETCH_LIST = `${NAMESPACE}_FETCH_LIST`;
  export const POST_REGISTER = `${NAMESPACE}_POST_REGISTER`;
  export const DELETE_ADMIN = `${NAMESPACE}_DELETE_ADMIN`;