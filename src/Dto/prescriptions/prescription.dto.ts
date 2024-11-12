import { CustomerDto } from 'Dto/customer/customer.dto';
import { DoctorDtoOut } from 'Dto/doctor/doctor.dto';

export interface PrescriptionDtoOut {
  [x: string]: any;
  statusCode: number;
  id?: number;
  prescriptionCode: string;
  prescriptions: string;
  prescriptionDate: Date;
  doctor: DoctorDtoOut;
  customer: CustomerDto;
  isRedeem?: boolean;
}

export interface CreatePrescriptionDto {
  prescriptionCode: string;
  prescriptions: string;
  prescriptionDate: Date;
  doctorId: number;
  customerId: number;
  isRedeem: any;
}

export type UpdatePrescriptionDto = Partial<CreatePrescriptionDto>;
