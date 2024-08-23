import * as yup from 'yup';

export const validationSupportQuestionSchema = yup.object({
  title: yup
    .string()
    .min(5, 'Короткая тема сообщения')
    .max(300, 'Длинная тема сообщения')
    .required('Заполните поле тема сообщения'),
  description: yup
    .string()
    .min(5, 'Короткое описание')
    .max(1000, 'Длинное описание')
    .required('Заполните поле описание'),
});
