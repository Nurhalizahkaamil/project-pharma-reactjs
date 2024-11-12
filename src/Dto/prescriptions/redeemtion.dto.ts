import { TransactionDtoOut } from 'Dto/transaction/transaction.dto';
import { PrescriptionDtoOut } from './prescription.dto';

export interface PrescriptionRedemptionDtoOut {
  id?: number; // Optional, sesuai definisi backend
  prescription: PrescriptionDtoOut;
  isPaid: boolean;
  isRedeem: boolean;
}

export interface CreatePrescriptionRedemptionDto {
  prescriptionId: number;
  isPaid: boolean;
  isRedeem: boolean;
  transaction: TransactionDtoOut;
}

export type UpdatePrescriptionRedemptionDto = Partial<CreatePrescriptionRedemptionDto>;
