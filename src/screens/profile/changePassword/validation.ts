import * as yup from 'yup';
import { passwordRegExp } from '../../../utils/utils';

export const validationChangePasswordSchema = yup.object({
  passwordOld: yup
    .string()
    .min(8, 'Пароль должен быть больше 7 символов')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .notOneOf([yup.ref('passwordNew'), null], 'Пароли не должны совпадать')
    .required('Поле должно быть заполнено'),
  passwordNew: yup
    .string()
    .min(8, 'Пароль должен быть больше 8 символов')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .oneOf([yup.ref('passwordConfirm'), null], 'Пароли не совпадают')
    .notOneOf([yup.ref('passwordOld'), null], 'Пароли не должны совпадать')
    .required('Поле должно быть заполнено'),
  passwordConfirm: yup
    .string()
    .min(8, 'Пароль должен быть больше 7 символов')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .oneOf([yup.ref('passwordNew'), null], 'Пароли не совпадают')
    .required('Поле должно быть заполнено'),
});
