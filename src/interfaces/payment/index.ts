import { TransactionInterface } from 'interfaces/transaction';
import { UserInterface } from 'interfaces/user';
import { TollInterface } from 'interfaces/toll';
import { GetQueryInterface } from 'interfaces';

export interface PaymentInterface {
  id?: string;
  amount: number;
  payment_date: any;
  payment_status: string;
  user_id: string;
  toll_id: string;
  created_at?: any;
  updated_at?: any;
  transaction?: TransactionInterface[];
  user?: UserInterface;
  toll?: TollInterface;
  _count?: {
    transaction?: number;
  };
}

export interface PaymentGetQueryInterface extends GetQueryInterface {
  id?: string;
  payment_status?: string;
  user_id?: string;
  toll_id?: string;
}
