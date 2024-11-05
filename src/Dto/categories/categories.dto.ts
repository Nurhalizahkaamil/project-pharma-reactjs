export interface CategoriesDto {
  id: number;
  name: string;
  description: string;
  categoryImageUrl?: string; // Kolom opsional yang sesuai dengan backend
}

export interface CreateCategoriesDto {
  name: string;
  description: string;
  categoryImageUrl?: string;
}

export interface CategoriesResponse {
  message: string;
  statusCode: number;
  data: CategoriesDto[];
}

export type UpdateCategoriesDto = Partial<CreateCategoriesDto>;
