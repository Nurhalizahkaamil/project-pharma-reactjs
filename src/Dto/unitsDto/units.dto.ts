// categories.dto.ts
export interface UnitsDto {
  id: number;
  name: string;
  description: string;
}

export interface CreateUnitsDto {
  name: string;
  description: string;
}

export interface UnitsResponse {
  message: string;
  statusCode: number;
  data: UnitsDto[];
}

export interface UpdateUnitsDto extends Partial<CreateUnitsDto> {}
