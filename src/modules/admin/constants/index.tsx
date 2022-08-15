import * as Yup from 'yup';

const NAMESPACE = 'ADMIN';

export interface RegisterAdmin {
  fullname: string;
  email: string;
  phone: string;
  role: string;
  companyId: string;  
}

export const INITIAL_VALUES_REGISTER_ADMIN: RegisterAdmin = {
    fullname: '',
    email: '',
    phone: '',
    role: 'admin',
    companyId: '',
};

export const RegisterAdminSchema = Yup.object().shape({
  fullname: Yup.string().required('Name must be filled'),
  email: Yup.string().email().required('Email must be filled'),
  phone: Yup.string().required('Phone must be filled'),
  companyId: Yup.string().required('Company is required'),
});

export const ENDPOINT = {
  list: '/dashboard-internal/admin/get-list',
  register: '/dashboard-internal/register/admin',
};

/** ************************* For Actions *************************************** */
export const FETCH_LIST = `${NAMESPACE}_FETCH_LIST`;
export const POST_REGISTER = `${NAMESPACE}_POST_REGISTER`;
