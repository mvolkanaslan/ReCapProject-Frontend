import { Customer } from './customer';

export interface CustomerDetails extends Customer {
  email: string;
  password: string;
  customerName: string;
  claims: string[];
}
