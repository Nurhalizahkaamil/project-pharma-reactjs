// categories.dto.ts
export interface CategoriesDto {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export interface CreateCategoriesDto {
  name: string;
  description: string;
  status: boolean;
}

export type UpdateCategoriesDto = CreateCategoriesDto;
