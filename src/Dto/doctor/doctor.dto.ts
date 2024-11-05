export interface DoctorDtoOut {
  id: number;
  name: string;
  specialization: string;
  phoneNumber: string;
  email: string;
}

export interface CreateDoctorDto {
  name: string;
  specialization: string;
  phoneNumber: string;
  email: string;
}

export type UpdateDoctorDto = Partial<CreateDoctorDto>;
