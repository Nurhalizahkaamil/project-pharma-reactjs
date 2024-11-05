import axios from 'axios';
import { CreateUnitsDto, UpdateUnitsDto } from '../Dto/unitsDto/units.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service'; // Fungsi untuk mendapatkan token

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/units`;

// Service untuk mengambil semua kategori (GET)
export const getUnits = async (params: BaseDto) => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Tambahkan token ke header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw new Error('Failed to fetch units');
  }
};

// Service untuk membuat kategori baru (POST)
export const createUnits = async (payload: CreateUnitsDto) => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating units:', error);
    throw new Error('Failed to create units');
  }
};

// Service untuk memperbarui kategori (PATCH)
export const updateUnits = async (id: number, payload: UpdateUnitsDto) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating units:', error);
    throw new Error('Failed to update units');
  }
};

// Service untuk menghapus kategori (DELETE)
export const deleteUnits = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting units:', error);
    throw new Error('Failed to delete units');
  }
};

// Service untuk mengambil kategori berdasarkan ID (GET by ID)
export const getUnitsById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching units by ID:', error);
    throw new Error('Failed to fetch units by ID');
  }
};
