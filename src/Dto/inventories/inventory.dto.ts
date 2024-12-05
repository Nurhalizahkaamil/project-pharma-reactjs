import { CreateInventoryItemDto, InventoryItemDto } from "./inventory.items";

export type InventoryType = 'In' | 'Out'; // Menghapus 'Adjust' karena tidak ada dalam entitas backend

export type ReasonType = 
  | 'Purchase'
  | 'Replacement'
  | 'Bonus'
  | 'Expired'
  | 'Damage'
  | 'Lost'; 


// DTO untuk output data inventaris
export interface InventoryDtoOut {
  productId(productId: any): string;
  id: number; 
  inventoryDate: string; 
  inventoryType: InventoryType; 
  reasonType?: ReasonType; 
  note: string; 
  items: InventoryItemDto[]; 
}


export interface CreateInventoryDto {
  inventoryDate: string; 
  inventoryType: InventoryType; 
  reasonType?: ReasonType; 
  note: string; 
  items: CreateInventoryItemDto[]; 
}

// DTO untuk memperbarui inventaris (semua properti opsional)
export type UpdateInventoryDto = Partial<CreateInventoryDto>;
