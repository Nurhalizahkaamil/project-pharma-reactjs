import { UUID } from 'crypto';
import { PrescriptionRedemptionDtoOut } from 'Dto/prescriptions/redeemtion.dto';

export enum TransactionType {
  GENERIC = 'Genereric',
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
