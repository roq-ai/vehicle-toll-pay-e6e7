import * as yup from 'yup';

export const paymentValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  payment_date: yup.date().required(),
  payment_status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  toll_id: yup.string().nullable().required(),
});
