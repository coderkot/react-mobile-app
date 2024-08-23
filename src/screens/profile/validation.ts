import * as yup from 'yup';

export const validationResumeSchema = yup.object({
  additionally: yup.string().max(500, 'Может быть не более 500 символов'),
  description: yup.string().max(500, 'Может быть не более 500 символов'),
  experience: yup.number(),
});
