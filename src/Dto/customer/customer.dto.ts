export interface CustomerDto {
  id: number;
  name: string;
  age: number;
  address: string;
}

export interface CreateCustomerDto {
  name: string;
  age: number;
  address: string;
}

export type UpdateCustomerDto = Partial<CreateCustomerDto>;
