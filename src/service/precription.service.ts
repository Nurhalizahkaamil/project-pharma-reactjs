// src/service/prescription.service.ts
import axios from 'axios';
import {
  PrescriptionDtoOut,
  CreatePrescriptionDto,
  UpdatePrescriptionDto,
} from '../Dto/prescriptions/prescription.dto';
import { DoctorDtoOut } from '../Dto/doctor/doctor.dto';
import { CustomerDto } from '../Dto/customer/customer.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/prescriptions`;
const DOCTOR_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/doctors`;
const CUSTOMER_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/customers`;

// Fetch all prescriptions with pagination metadata
export const getPrescriptions = async (
  params: BaseDto,
): Promise<{
  totalItems(totalItems: any): unknown;
  data: PrescriptionDtoOut[];
  metadata: { total: number; totalPages: number };
}> => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw new Error('Failed to fetch prescriptions');
  }
};

// Create a new prescription
export const createPrescription = async (
  payload: CreatePrescriptionDto,
): Promise<PrescriptionDtoOut> => {
  try {
    const response = await axios.post<PrescriptionDtoOut>(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating prescription:', error);
    throw new Error('Failed to create prescription');
  }
};

// Update an existing prescription
export const updatePrescription = async (
  id: number,
  payload: UpdatePrescriptionDto,
): Promise<PrescriptionDtoOut> => {
  try {
    const response = await axios.patch<PrescriptionDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating prescription:', error);
    throw new Error('Failed to update prescription');
  }
};

// Delete a prescription
export const deletePrescription = async (id: number) => {
  try {
    console.log(`Deleting prescription with ID ${id}`);
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Prescription deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error deleting prescription:',
      error.response ? error.response.data : error.message,
    );
    throw new Error('Failed to delete prescription');
  }
};

// Fetch a prescription by ID
export const getPrescriptionById = async (id: number): Promise<PrescriptionDtoOut> => {
  try {
    const response = await axios.get<PrescriptionDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prescription by ID:', error);
    throw new Error('Failed to fetch prescription by ID');
  }
};

// Fetch all doctors
// Fetch all doctors
// Fetch all doctors
export const getDoctors = async (): Promise<DoctorDtoOut[]> => {
  try {
    const response = await axios.get(DOCTOR_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data; // Directly return response.data as an array
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors');
  }
};

// Fetch all customers
export const getCustomers = async (): Promise<CustomerDto[]> => {
  try {
    const response = await axios.get(CUSTOMER_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data; // Directly return response.data as an array
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers');
  }
};
