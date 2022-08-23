import * as Yup from 'yup';

const NAMESPACE = 'KIOSK';

export interface RegisterKiosk {
  imei: string;
  macAddress: string;
  name: string | undefined;
  address: string;
  coordinate: string;
}

export const INITIAL_VALUES_REGISTER_KIOSK: RegisterKiosk = {
  imei: '',
  macAddress: '',
  name: '',
  address: '',
  coordinate: '',
};

export const RegisterDeviceSchemaKiosk = Yup.object().shape({
  imei: Yup.string().required('Imei Device is required'),
  macAddress: Yup.string().required('Mac Device Address is required'),
  name: Yup.string().required('Device Name is required'),
  address: Yup.string().required('Location is required'),
  coordinate: Yup.string().required('Coordinate is required'),
});

export interface Assign {
  companyId: string;
  deviceId: string;
}

export const INITIAL_VALUES_ASSIGN_KIOSK: Assign = {
  companyId: '',
  deviceId: '',
};

export const AssignDeviceSchemaKiosk = Yup.object().shape({
  companyId: Yup.string().required('Company ID is required'),
  deviceId: Yup.string().required('Device ID is required')
});

export interface unAssign {
  deviceId: string;
}

export const INITIAL_VALUES_UNASSIGN_KIOSK: unAssign = {
  deviceId: '',
};

export const unAssignDeviceSchemaKiosk = Yup.object().shape({
  deviceId: Yup.string().required('Device ID is required')
});

export const ENDPOINT = {
  assign: '/dashboard-internal/device-kiosk/assign-company',
  register: '/dashboard-internal/device-kiosk/register',
  unAssign: '/dashboard-internal/device-kiosk/unassign-company',
  list: '/dashboard-internal/device-kiosk/get-list',
  remove: '/dashboard-internal/device-kiosk/',
  update: '/dashboard-internal/device-kiosk',
};

/** ************************* For Actions *************************************** */
export const POST_REGISTER = `${NAMESPACE}_POST_REGISTER`;
export const POST_ASSIGN = `${NAMESPACE}_POST_ASSIGN`;
export const POST_UNASSIGN = `${NAMESPACE}_POST_UNASSIGN`;
export const FETCH_LIST = `${NAMESPACE}_FETCH_LIST`;
export const UPDATE_KIOSK = `${NAMESPACE}_UPDATE_KIOSK`;
