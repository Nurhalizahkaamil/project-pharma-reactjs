// src/service/warehouses.service.ts
import axios from 'axios';
import {
  CreateWarehouseDto,
  UpdateWarehouseDto,
  WarehouseDtoOut,
} from '../Dto/warehousesDto/warehouses.dto';
import { SupplierResponse } from '../Dto/supplierDto/supplier.dto'; // Import the interfaces
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/warehouse`;
const SUPPLIER_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/suppliers`;

// Fetch all warehouses
export const getWarehouses = async (
  params: BaseDto,
): Promise<{ data: WarehouseDtoOut[]; metadata: { total: number; totalPages: number } }> => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    throw new Error('Failed to fetch warehouses');
  }
};

// Create a new warehouse
export const createWarehouse = async (payload: CreateWarehouseDto): Promise<WarehouseDtoOut> => {
  try {
    const response = await axios.post<WarehouseDtoOut>(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating warehouse:', error);
    throw new Error('Failed to create warehouse');
  }
};

// Update an existing warehouse
export const updateWarehouse = async (
  id: number,
  payload: UpdateWarehouseDto,
): Promise<WarehouseDtoOut> => {
  try {
    const response = await axios.patch<WarehouseDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating warehouse:', error);
    throw new Error('Failed to update warehouse');
  }
};

// Delete a warehouse
export const deleteWarehouse = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    console.error('Error deleting warehouse:', error);
    throw new Error('Failed to delete warehouse');
  }
};

// Fetch a warehouse by ID
export const getWarehouseById = async (id: number): Promise<WarehouseDtoOut> => {
  try {
    const response = await axios.get<WarehouseDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching warehouse by ID:', error);
    throw new Error('Failed to fetch warehouse by ID');
  }
};

// Fetch all suppliers
export const getSuppliers = async (): Promise<SupplierResponse> => {
  try {
    const response = await axios.get<SupplierResponse>(SUPPLIER_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data; // Correctly typed response
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw new Error('Failed to fetch suppliers');
  }
};
