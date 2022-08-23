import * as Yup from 'yup';

const NAMESPACE = 'FATMOR';

export interface RegisterFatmor {
  imei: string;
  macAddress: string;
  name: string | undefined;
  address: string;
  setting : {
    distinguishScore: number;
    distinguishRange: number;
    openDelay: number;
    alarmTemperature: number;
    enableFR: boolean;
    enableTD: boolean;
    enableMD: boolean;
  };
}

export const INITIAL_VALUES_REGISTER_FATMOR: RegisterFatmor = {
  imei: '',
  macAddress: '',
  name: '',
  address: '',
  setting : {
    distinguishScore: 100,
    distinguishRange: 100,
    openDelay: 100,
    alarmTemperature: 37,
    enableFR: false,
    enableTD: false,
    enableMD: false,
  }
};

export const RegisterDeviceSchemaFatmor = Yup.object().shape({
  imei: Yup.string().required('Imei Device is required'),
  macAddress: Yup.string().required('Mac Device Address is required'),
  name: Yup.string().required('Device Name is required'),
  address: Yup.string().required('Location is required'),
});

export interface Assign {
  companyId: string;
  deviceId: string;
}

export const INITIAL_VALUES_ASSIGN_FATMOR: Assign = {
  companyId: '',
  deviceId: '',
};

export const AssignDeviceSchemaFatmor = Yup.object().shape({
  companyId: Yup.string().required('Company ID is required'),
  deviceId: Yup.string().required('Device ID is required')
});

export interface unAssign {
  deviceId: string;
}

export const INITIAL_VALUES_UNASSIGN_FATMOR: unAssign = {
  deviceId: '',
};

export const unAssignDeviceSchemaFatmor = Yup.object().shape({
  deviceId: Yup.string().required('Device ID is required')
});

export const ENDPOINT = {
  assign: '/dashboard-internal/device-fatmor/assign-company',
  register: '/dashboard-internal/device-fatmor/register',
  unAssign: '/dashboard-internal/device-fatmor/unassign-company',
  list: 'dashboard-internal/device-fatmor/get-list',
  remove: '/dashboard-internal/device-fatmor/',
  update: '/dashboard-internal/device-fatmor',
};

/** ************************* For Actions *************************************** */
export const POST_REGISTER = `${NAMESPACE}_POST_REGISTER`;
export const POST_ASSIGN = `${NAMESPACE}_POST_ASSIGN`;
export const POST_UNASSIGN = `${NAMESPACE}_POST_UNASSIGN`;
export const FETCH_LIST = `${NAMESPACE}_FETCH_LIST`;
export const UPDATE_FATMOR = `${NAMESPACE}_UPDATE_FATMOR`;
