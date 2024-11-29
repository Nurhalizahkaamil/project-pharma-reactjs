import { ProductDtoOut } from 'Dto/product/product.dto'; // Import TransactionDtoOut if needed

export interface TransactionDetailDtoOut {
  id?: number;
  productId: number;
  quantity: number;
  note: string;
}

// Input interface for creating a new transaction detail (this is the data you need to send in the request)
export interface CreateTransactionDetailDto {
  productId: number;
  quantity: number;
  note: string;
}

// Update interface for transaction detail (partially update fields, similar to the backend's CreateTransactionDetailDto)
export type UpdateTransactionDetailDto = Partial<CreateTransactionDetailDto>;
