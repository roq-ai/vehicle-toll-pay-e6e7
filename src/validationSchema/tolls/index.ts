import * as yup from 'yup';

export const tollValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  price: yup.number().integer().required(),
  company_id: yup.string().nullable().required(),
});
