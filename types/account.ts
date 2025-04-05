import { ICurrency } from "./currency.interface";

  export interface IAccount {
    id: number;
    createdAt: string;
    updatedAt: string;
    amount: number;
    currency: ICurrency;
  }