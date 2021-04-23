import { CreditCard } from './creditCard';

export interface Payment extends CreditCard {
  amount: number;
}
