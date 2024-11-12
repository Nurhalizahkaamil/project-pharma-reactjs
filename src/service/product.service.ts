import axios from 'axios';
import { ProductDtoOut, CreateProductDto, UpdateProductDto } from '../Dto/product/product.dto';
import { CategoriesDto, CategoriesResponse } from '../Dto/categories/categories.dto';
import { UnitsDto, UnitsResponse } from '../Dto/unitsDto/units.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/products`;
const CATEGORY_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/categories`;
const UNIT_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/units`;

// Fetch all products with pagination metadata
export const getProducts = async (
  params?: BaseDto,
): Promise<{ data: ProductDtoOut[]; metadata: { total: number; totalPages: number } }> => {
  try {
    const response = await axios.get<{
      data: ProductDtoOut[];
      metadata: { total: number; totalPages: number };
    }>(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products:', error?.response?.data || error.message);
    throw new Error('Failed to fetch products');
  }
};

// Create a new product
export const createProduct = async (payload: CreateProductDto): Promise<ProductDtoOut> => {
  try {
    const response = await axios.post<ProductDtoOut>(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating product:', error?.response?.data || error.message);
    throw new Error('Failed to create product');
  }
};

// Update an existing product
export const updateProduct = async (
  id: number,
  payload: UpdateProductDto,
): Promise<ProductDtoOut> => {
  try {
    const response = await axios.patch<ProductDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error updating product:', error?.response?.data || error.message);
    throw new Error('Failed to update product');
  }
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log(`Product with ID ${id} deleted successfully`);
  } catch (error: any) {
    console.error('Error deleting product:', error?.response?.data || error.message);
    throw new Error('Failed to delete product');
  }
};

// Fetch a product by ID
export const getProductById = async (id: number): Promise<ProductDtoOut> => {
  try {
    const response = await axios.get<ProductDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching product by ID:', error?.response?.data || error.message);
    throw new Error('Failed to fetch product by ID');
  }
};

// Fetch all categories
export const getCategories = async (): Promise<CategoriesDto[]> => {
  try {
    const response = await axios.get<CategoriesResponse>(CATEGORY_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error?.response?.data || error.message);
    throw new Error('Failed to fetch categories');
  }
};

// Fetch all units
export const getUnits = async (): Promise<UnitsDto[]> => {
  try {
    const response = await axios.get<UnitsResponse>(UNIT_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching units:', error?.response?.data || error.message);
    throw new Error('Failed to fetch units');
  }
};
