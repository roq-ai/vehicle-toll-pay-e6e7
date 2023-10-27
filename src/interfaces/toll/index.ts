import { PaymentInterface } from 'interfaces/payment';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface TollInterface {
  id?: string;
  name: string;
  location: string;
  price: number;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  payment?: PaymentInterface[];
  company?: CompanyInterface;
  _count?: {
    payment?: number;
  };
}

export interface TollGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  company_id?: string;
}
