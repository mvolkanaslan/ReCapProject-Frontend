import { Customer } from './customer';

export interface CustomerDetails extends Customer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  findexScore: number;
  claims: string[];
}
