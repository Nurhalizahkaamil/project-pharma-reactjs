import { ProductDtoOut } from "Dto/product/product.dto";

export interface InventoryItemDto {
    product: ProductDtoOut; 
    productId: number;
    productName: string;
    qtyItem: number; 
    noteItem: string; 
  }

  export interface CreateInventoryItemDto { 
    productId: number;
    productName: string;
    qtyItem: number; 
    noteItem: string; 
  }

  export type UpdateInventoryItemDto = Partial<CreateInventoryItemDto>;