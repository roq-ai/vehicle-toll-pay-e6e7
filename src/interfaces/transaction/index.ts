import { UserInterface } from 'interfaces/user';
import { PaymentInterface } from 'interfaces/payment';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  transaction_date: any;
  transaction_status: string;
  user_id: string;
  payment_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  payment?: PaymentInterface;
  _count?: {};
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  transaction_status?: string;
  user_id?: string;
  payment_id?: string;
}
