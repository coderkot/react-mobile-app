import * as yup from 'yup';
import { phoneRegExp } from '../../../utils/utils';

export const validationSchema = yup.object({
  email: yup.string().email('Enter valid email').required('Enter email'),

  phone: yup
    .string()
    .min(2, 'Short number')
    .max(20, 'Long number')
    .matches(phoneRegExp, 'Enter valid phone')
    .required('Enter phone'),
});
