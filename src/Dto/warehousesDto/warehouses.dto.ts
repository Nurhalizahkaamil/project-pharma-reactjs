import { SupplierDtoOut } from 'Dto/supplierDto/supplier.dto';

// warehouses.dto.ts
export interface WarehouseDtoOut {
  id: number;
  name: string;
  location: string;
  supplierId: number;
  supplierName: string;
  supplier: SupplierDtoOut;
}

export interface CreateWarehouseDto {
  name: string;
  location: string;
  supplierId: number;
  supplierName: string;
}

export type UpdateWarehouseDto = Partial<CreateWarehouseDto>;
