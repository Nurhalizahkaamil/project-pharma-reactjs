// Import fetchData dari api.service.ts
import { fetchData } from './api.service';
import { BaseDto } from '../Dto/Base/base.dto';
import { CreateCategoriesDto, UpdateCategoriesDto } from '../Dto/categories/categories.dto';

// Mengambil data kategori
export const getCategories = async (params: BaseDto) => {
  try {
    const data = await fetchData({
      method: 'GET',
      endpoint: '/categories',
      params: { ...params },
    });
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Membuat kategori baru
export const createCategories = async (payload: CreateCategoriesDto) => {
  try {
    const data = await fetchData({
      method: 'POST',
      endpoint: '/categories',
      data: { ...payload },
    });
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Memperbarui kategori
export const updateCategories = async (id: number, payload: UpdateCategoriesDto) => {
  try {
    const data = await fetchData({
      method: 'PATCH',
      endpoint: `/categories/${id}`,
      data: { ...payload },
    });
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Menghapus kategori
export const deleteCategories = async (id: number) => {
  try {
    const data = await fetchData({
      method: 'DELETE',
      endpoint: `/categories/${id}`,
    });
    return data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
