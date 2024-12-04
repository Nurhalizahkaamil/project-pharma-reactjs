import { CreateTransactionDetailDto, TransactionDetailDtoOut } from './transaction.detail.dto';

export enum TransactionType {
  GENERIC = 'Generic',
  PRESCRIPTION = 'Prescription',
}

export enum CategoryType {
  IN = 'In',
  OUT = 'Out',
}

export enum PaymentMethod {
  CASH = 'Cash',
  DEBIT = 'Debit',
}

export interface TransactionDtoOut {
  status: number;
  data: any;
  id: number;
  userId: string;
  transactionDate: Date;
  transactionType: TransactionType;
  categoryType: CategoryType;
  note: string;
  tax: number;
  subTotal: number;
  grandTotal: number;
  paymentMethod?: PaymentMethod;
  items: CreateTransactionDetailDto[];
}

export interface CreateTransactionDto {
  id: number;
  userId: string;
  transactionDate: Date;
  transactionType: TransactionType;
  categoryType: CategoryType;
  note: string;
  tax: number;
  subTotal: number;
  grandTotal: number;
  paymentMethod?: PaymentMethod;
  items: TransactionDetailDtoOut[];
}

export type UpdateTransactionDto = Partial<CreateTransactionDto>;
