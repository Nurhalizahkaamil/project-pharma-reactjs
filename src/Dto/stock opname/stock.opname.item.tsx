import { ProductDtoOut } from 'Dto/product/product.dto';

export interface StockOpnameItemDtoOut {
  product: ProductDtoOut;
  productId: number;
  productName: string;
  physicalStock: number;
  discrepancy: number;
}

export interface CreateStockOpnameItemDto {
  productId: number;
  productName: string;
  physicalStock: number;
  discrepancy: number;
}

export type UpdateInventoryItemDto = Partial<CreateStockOpnameItemDto>;
