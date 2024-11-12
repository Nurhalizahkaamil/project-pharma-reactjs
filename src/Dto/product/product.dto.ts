import { CategoriesDto } from 'Dto/categories/categories.dto';
import { UnitsDto } from 'Dto/unitsDto/units.dto';

export enum DrugClass {
  OBAT_BEBAS = 'Obat Bebas',
  OBAT_BEBAS_TERBATAS = 'Obat Bebas Terbatas',
  OBAT_KERAS = 'Obat Keras',
}

export interface ProductDtoOut {
  code: string;
  id: number; // Made optional as per backend definition
  productCode: string;
  name: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  expiryDate: Date;
  stockQuantity: number;
  category: CategoriesDto;
  unit: UnitsDto;
  productImageUrl?: string;
  drugClass?: DrugClass;
}

export interface CreateProductDto {
  productCode: string;
  name: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  expiryDate: Date;
  stockQuantity: number;
  categoryId: number;
  unitId: number;
  productImageUrl?: string;
  drugClass?: DrugClass;
}

export type UpdateProductDto = Partial<CreateProductDto>;
