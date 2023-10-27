import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  transaction_date: yup.date().required(),
  transaction_status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  payment_id: yup.string().nullable().required(),
});
