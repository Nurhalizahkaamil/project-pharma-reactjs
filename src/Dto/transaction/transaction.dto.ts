// src/dto/transactions/transaction.dto.ts
import { UUID } from 'crypto';
import { PrescriptionRedemptionDtoOut } from 'Dto/prescriptions/redeemtion.dto';

export enum TransactionType {
  PURCHASE = 'Purchase',
  SALE = 'Sale',
}

export enum CategoryType {
  MEDICINE = 'Medicine',
  SUPPLY = 'Supply',
  SERVICE = 'Service',
}

export enum PaymentMethod {
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  DEBIT_CARD = 'Debit Card',
  TRANSFER = 'Transfer',
}

export interface TransactionDtoOut {
  id?: number;
  userId: UUID;
  transactionDate: Date;
  transactionType: TransactionType;
  categoryType: CategoryType;
  note: string;
  tax: number;
  subTotal: number;
  grandTotal: number;
  paymentMethod?: PaymentMethod;
  redemption: PrescriptionRedemptionDtoOut;
}

export interface CreateTransactionDto {
  userId: UUID;
  transactionDate: Date;
  transactionType: TransactionType;
  categoryType: CategoryType;
  note: string;
  tax: number;
  subTotal: number;
  grandTotal: number;
  paymentMethod?: PaymentMethod;
  redemptionId: number;
}

export type UpdateTransactionDto = Partial<CreateTransactionDto>;
