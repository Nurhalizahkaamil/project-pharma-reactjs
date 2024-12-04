import axios from 'axios';
import {
  PrescriptionRedemptionDtoOut,
  CreatePrescriptionRedemptionDto,
  UpdatePrescriptionRedemptionDto,
} from '../Dto/prescriptions/redeemtion.dto';
import { getAccessToken } from './auth.service';
import { BaseDto } from 'Dto/Base/base.dto';
import { PrescriptionDtoOut } from 'Dto/prescriptions/prescription.dto';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/prescription-redemptions`;
const PRESCRIPTION_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/prescriptions`;

// Mendapatkan semua Prescription Redemption
export const getPrescriptionRedemptions = async (
  params: BaseDto,
): Promise<{
  totalItems: number;
  data: PrescriptionRedemptionDtoOut[];
  metadata: { total: number; totalPages: number };
}> => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    // Pastikan return sesuai dengan metadata dan totalItems yang diterima dari backend
    const { totalItems, totalPages, data } = response.data;
    return { totalItems, data, metadata: { total: totalItems, totalPages } };
  } catch (error) {
    console.error('Error fetching prescription redemptions:', error);
    throw new Error('Failed to fetch prescription redemptions');
  }
};

// Membuat Prescription Redemption
export const createPrescriptionRedemption = async (
  payload: CreatePrescriptionRedemptionDto,
): Promise<{ data: PrescriptionRedemptionDtoOut }> => {
  try {
    const response = await axios.post<{ data: PrescriptionRedemptionDtoOut }>(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data; // Mengembalikan respons penuh
  } catch (error) {
    console.error('Error creating prescription redemption:', error);
    throw new Error('Failed to create prescription redemption');
  }
};

// Mengupdate Prescription Redemption
export const updatePrescriptionRedemption = async (
  id: number,
  payload: UpdatePrescriptionRedemptionDto,
): Promise<PrescriptionRedemptionDtoOut> => {
  try {
    const response = await axios.patch<PrescriptionRedemptionDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating prescription redemption:', error);
    throw new Error('Failed to update prescription redemption');
  }
};

// Menghapus Prescription Redemption
export const deletePrescriptionRedemption = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Prescription redemption deleted successfully');
  } catch (error) {
    console.error('Error deleting prescription redemption:', error);
    throw new Error('Failed to delete prescription redemption');
  }
};

// Mendapatkan Prescription Redemption berdasarkan ID
export const getPrescriptionRedemptionById = async (
  id: number,
): Promise<PrescriptionRedemptionDtoOut> => {
  try {
    const response = await axios.get<PrescriptionRedemptionDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prescription redemption by ID:', error);
    throw new Error('Failed to fetch prescription redemption by ID');
  }
};

// Mendapatkan semua Prescriptions
export const getPrescriptions = async (): Promise<PrescriptionDtoOut[]> => {
  try {
    const response = await axios.get<PrescriptionDtoOut[]>(PRESCRIPTION_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prescription:', error);
    throw new Error('Failed to fetch prescription');
  }
};
