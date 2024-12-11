import { CreateStockOpnameItemDto, StockOpnameItemDtoOut } from './stock.opname.item';

export interface StockOpnameDtoOut {
  productId: number;
  id: number;
  opnameDate: string;
  note: string;
  items: StockOpnameItemDtoOut[];
}

export interface CreateStockOpnameDto {
  opnameDate: string;
  note: string;
  items: CreateStockOpnameItemDto[];
}

export type updateStockOpnameDto = Partial<CreateStockOpnameDto>;
