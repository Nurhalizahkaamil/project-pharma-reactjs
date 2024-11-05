export interface SupplierDtoOut {
  id: number; // Optional di frontend
  name: string;
  contactNumber: string;
  email: string;
  address: string;
}

// Sesuaikan interface CreateSupplierDto frontend
export interface CreateSupplierDto {
  name: string;
  contactNumber: string;
  email: string;
  address: string;
}

export interface SupplierResponse {
  message: string;
  statusCode: number;
  data: SupplierDtoOut[];
}

export interface UpdateSupplierDto extends Partial<CreateSupplierDto> {}
