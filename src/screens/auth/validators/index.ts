import * as yup from 'yup';
import { passwordRegExp, phoneRegExp } from '../../../utils/utils';

export const loginValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .min(1, 'Короткий номер')
    .max(100, 'Длинный номер')
    .matches(phoneRegExp, 'Некорректный номер телефона')
    .required('Заполните поле телефон'),
  password: yup.string().required('Укажите пароль'),
});

export const signupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'Слишком короткое поле Имя')
    .max(100, 'Слишком длинное поле Имя')
    .required('Необходимо ввести Имя'),
  surname: yup
    .string()
    .min(1, 'Слишком короткое поле Фамилия')
    .max(100, 'Слишком длинное поле Фамилия')
    .required('Необходимо ввести Фамилия'),
  patronymic: yup
    .string()
    .min(1, 'Слишком короткое поле Отчество')
    .max(100, 'Слишком длинное поле Отчество')
    .required('Необходимо ввести Отчество'),
  phone: yup
    .string()
    .min(1, 'Короткий номер')
    .max(100, 'Длинный номер')
    .matches(phoneRegExp, 'Некорректный номер телефона')
    .required('Заполните поле телефон'),
  password: yup
    .string()
    .min(8, 'Пароль должен быть больше 8 символов')
    .max(50, 'Слишком длинный пароль')
    .oneOf([yup.ref('passwordConfirm'), null], 'Пароли не совпадают')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .required('Поле пароль должно быть заполнено'),
  passwordConfirm: yup
    .string()
    .min(8, 'Пароль должен быть больше 8 символов')
    .max(50, 'Слишком длинный пароль')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Поле подтверждение пароля должно быть заполнено'),
});

export const recoveryValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .min(1, 'Короткий номер')
    .max(100, 'Длинный номер')
    .matches(phoneRegExp, 'Некорректный номер телефона')
    .required('Заполните поле телефон'),
});

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Пароль должен быть больше 8 символов')
    .max(50, 'Слишком длинный пароль')
    .oneOf([yup.ref('passwordConfirm'), null], 'Пароли не совпадают')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .required('Поле пароль должно быть заполнено'),
  confirmPassword: yup
    .string()
    .min(8, 'Пароль должен быть больше 8 символов')
    .max(50, 'Слишком длинный пароль')
    .matches(
      passwordRegExp,
      'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву'
    )
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Поле подтверждение пароля должно быть заполнено'),
});
