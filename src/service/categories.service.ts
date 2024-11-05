import axios from 'axios';
import { CreateCategoriesDto, UpdateCategoriesDto } from '../Dto/categories/categories.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/categories`;

// Service untuk mengambil semua kategori (GET)
export const getCategories = async (params: BaseDto) => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

// Service untuk membuat kategori baru (POST)
export const createCategories = async (payload: CreateCategoriesDto) => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
};

// Service untuk memperbarui kategori (PATCH)
export const updateCategories = async (categories_id: number, payload: UpdateCategoriesDto) => {
  try {
    const response = await axios.patch(`${API_URL}/${categories_id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category');
  }
};

// Service untuk menghapus kategori (DELETE)
export const deleteCategories = async (categories_id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${categories_id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category');
  }
};

// Service untuk mengambil kategori berdasarkan ID (GET by ID)
export const getCategoryById = async (categories_id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${categories_id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Failed to fetch category by ID');
  }
};
