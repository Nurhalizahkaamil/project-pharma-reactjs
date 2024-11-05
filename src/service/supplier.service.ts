import axios from 'axios';
import { CreateSupplierDto, UpdateSupplierDto } from '../Dto/supplierDto/supplier.dto'; // Sesuaikan dengan DTO Anda
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service'; // Fungsi untuk mendapatkan token

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/suppliers`;

// Service untuk mengambil semua suppliers (GET)
export const getSuppliers = async (params: BaseDto) => {
  try {
    const response = await axios.get(API_URL, {
      params, // Menggunakan params untuk pagination dan pencarian
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Tambahkan token ke header
      },
    });
    console.log('GET suppliers response:', response.data); // Log respons
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw new Error('Failed to fetch suppliers');
  }
};

// Service untuk membuat supplier baru (POST)
export const createSupplier = async (payload: CreateSupplierDto) => {
  try {
    console.log('Creating supplier with payload:', payload); // Log payload
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    console.log('Supplier created successfully:', response.data); // Log respons
    return response.data;
  } catch (error) {
    console.error('Error creating supplier:', error.response ? error.response.data : error.message); // Log kesalahan dengan detail
    throw new Error('Failed to create supplier');
  }
};

// Service untuk memperbarui supplier (PATCH)
export const updateSupplier = async (id: number, payload: UpdateSupplierDto) => {
  try {
    console.log(`Updating supplier with ID ${id} and payload:`, payload); // Log ID dan payload
    const response = await axios.patch(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    console.log('Supplier updated successfully:', response.data); // Log respons
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error.response ? error.response.data : error.message); // Log kesalahan dengan detail
    throw new Error('Failed to update supplier');
  }
};

// Service untuk menghapus supplier (DELETE)
export const deleteSupplier = async (id: number) => {
  try {
    console.log(`Deleting supplier with ID ${id}`); // Log ID
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    console.log('Supplier deleted successfully:', response.data); // Log respons
    return response.data;
  } catch (error) {
    console.error('Error deleting supplier:', error.response ? error.response.data : error.message); // Log kesalahan dengan detail
    throw new Error('Failed to delete supplier');
  }
};

// Service untuk mengambil supplier berdasarkan ID (GET by ID)
export const getSupplierById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, // Sertakan token di sini
      },
    });
    console.log('Fetched supplier by ID:', response.data); // Log respons
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching supplier by ID:',
      error.response ? error.response.data : error.message,
    ); // Log kesalahan dengan detail
    throw new Error('Failed to fetch supplier by ID');
  }
};
