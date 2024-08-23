import * as yup from 'yup';

export const validationStatementSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Короткое поле Название ведомости')
    .max(100, 'Длинное поле Название ведомости')
    .required('Заполните поле Название ведомости'),
  createdAt: yup.date().required('Укажите дату публикации').nullable(),
  controlObjectDescription: yup
    .string()
    .min(2, 'Короткое значение поля')
    .max(500, 'Длинное значение поля')
    .required('Заполните поле'),
  controlMethodDescription: yup
    .string()
    .min(2, 'Короткое значение поля')
    .max(500, 'Длинное значение поля')
    .required('Заполните поле'),
});
