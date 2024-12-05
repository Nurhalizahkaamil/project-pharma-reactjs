// src/service/inventories.service.ts
import axios from 'axios';
import {
  InventoryDtoOut,
  CreateInventoryDto,
  UpdateInventoryDto,
} from '../Dto/inventories/inventory.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';
import { ProductDtoOut, ProductResponse } from 'Dto/product/product.dto';
import exp from 'constants';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/inventories`;
const PRODUCT_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/products`;

// Fetch all inventories
export const getInventories = async (
  params: BaseDto,
): Promise<{
  meta: any; data: InventoryDtoOut[]; metadata: { total: number; totalPages: number } 
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
    console.error('Error fetching inventories:', error);
    throw new Error('Failed to fetch inventories');
  }
};

// Fetch a single inventory by ID
export const getInventoryById = async (id: number): Promise<InventoryDtoOut> => {
  try {
    const response = await axios.get<InventoryDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory by ID:', error);
    throw new Error('Failed to fetch inventory by ID');
  }
};

// Create a new inventory
export const createInventory = async (
  payload: CreateInventoryDto,
): Promise<{ message: string; inventoryItems: InventoryDtoOut[] }> => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating inventory:', error);
    throw new Error('Failed to create inventory');
  }
};

// Update an inventory by ID
export const updateInventory = async (
  id: number,
  payload: UpdateInventoryDto,
): Promise<InventoryDtoOut> => {
  try {
    const response = await axios.patch<InventoryDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw new Error('Failed to update inventory');
  }
};

// Delete an inventory by ID
export const deleteInventory = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    throw new Error('Failed to delete inventory');
  }
};

// Fetch products By Id
export const getProductsById = async (id: number): Promise<ProductDtoOut> => {
  try {
    const response = await axios.get<ProductDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by ID:', error);
    throw new Error('Failed to fetch products  by ID');
  }
};

export const getProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await axios.get<ProductResponse>(PRODUCT_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data; // Correctly typed response
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
