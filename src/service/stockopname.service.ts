import axios from 'axios';
import {
  CreateStockOpnameDto,
  updateStockOpnameDto,
  StockOpnameDtoOut,
} from '../Dto/stock opname/stock.opname.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';
import { ProductDtoOut, ProductResponse } from 'Dto/product/product.dto';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/stock-opname-entries`;
const PRODUCT_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/products`;

// Fetch all stock opname entries
export const getStockOpnameEntries = async (
  params: BaseDto,
): Promise<{
  meta: any;
  data: StockOpnameDtoOut[];
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
    console.error('Error fetching stock opname entries:', error);
    throw new Error('Failed to fetch stock opname entries');
  }
};

// Fetch a single stock opname entry by ID
export const getStockOpnameById = async (id: number): Promise<StockOpnameDtoOut> => {
  try {
    const response = await axios.get<StockOpnameDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock opname entry by ID:', error);
    throw new Error('Failed to fetch stock opname entry by ID');
  }
};

// Create a new stock opname entry
export const createStockOpname = async (
  payload: CreateStockOpnameDto,
): Promise<StockOpnameDtoOut[]> => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating stock opname entry:', error);
    throw new Error('Failed to create stock opname entry');
  }
};

// Update a stock opname entry by ID
export const updateStockOpname = async (
  id: number,
  payload: updateStockOpnameDto,
): Promise<StockOpnameDtoOut> => {
  try {
    const response = await axios.patch<StockOpnameDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating stock opname entry:', error);
    throw new Error('Failed to update stock opname entry');
  }
};

// Delete a stock opname entry by ID (soft delete)
export const deleteStockOpname = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    console.error('Error deleting stock opname entry:', error);
    throw new Error('Failed to delete stock opname entry');
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
