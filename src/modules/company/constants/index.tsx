import * as Yup from 'yup';

const NAMESPACE = 'COMPANY';

export interface RegisterCompany {
  name: string;
  email: string;
  phone: string;
  companySector: string;
  website: string;
  tax: string;
  companyCode: string;
}

export const INITIAL_VALUES_REGISTER_COMPANY: RegisterCompany = {
    name: '',
    email: '',
    phone: '',
    companySector: '',
    website: '',
    tax: '',
    companyCode: '',
};

export const RegisterCompanySchema = Yup.object().shape({
  name: Yup.string().required('Company Name must be filled'),
  email: Yup.string().email().required('Email must be filled'),
  phone: Yup.string().required('Phone must be filled'),
  companySector: Yup.string().required('Company sector must be filled'),
  website: Yup.string().required('Website must be filled'),
  tax: Yup.string().required('Tax must be filled'),
  companyCode: Yup.string().optional(),
});

export const ENDPOINT = {
  list: '/dashboard-internal/company/get-list',
  register: '/dashboard-internal/company/',
};

/** ************************* For Actions *************************************** */
export const FETCH_LIST = `${NAMESPACE}_FETCH_LIST`;
export const POST_REGISTER = `${NAMESPACE}_POST_REGISTER`;
