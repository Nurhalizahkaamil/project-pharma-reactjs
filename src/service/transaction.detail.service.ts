import axios from 'axios';
import {
  CreateTransactionDetailDto,
  TransactionDetailDtoOut,
  UpdateTransactionDetailDto,
} from '../Dto/transaction/transaction.detail.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/transaction-details`;

// Fetch all transaction details
export const getTransactionDetails = async (
  params: BaseDto,
): Promise<{
  data: TransactionDetailDtoOut[];
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
    console.error('Error fetching transaction details:', error);
    throw new Error('Failed to fetch transaction details');
  }
};

// Fetch a transaction detail by ID
export const getTransactionDetailById = async (id: number): Promise<TransactionDetailDtoOut> => {
  try {
    const response = await axios.get<TransactionDetailDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction detail by ID:', error);
    throw new Error('Failed to fetch transaction detail by ID');
  }
};

// Create a new transaction detail
export const createTransactionDetail = async (
  payload: CreateTransactionDetailDto,
): Promise<TransactionDetailDtoOut> => {
  try {
    const response = await axios.post<TransactionDetailDtoOut>(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating transaction detail:', error);
    throw new Error('Failed to create transaction detail');
  }
};

// Update an existing transaction detail
export const updateTransactionDetail = async (
  id: number,
  payload: UpdateTransactionDetailDto,
): Promise<TransactionDetailDtoOut> => {
  try {
    const response = await axios.patch<TransactionDetailDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating transaction detail:', error);
    throw new Error('Failed to update transaction detail');
  }
};

// Delete a transaction detail
export const deleteTransactionDetail = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    console.error('Error deleting transaction detail:', error);
    throw new Error('Failed to delete transaction detail');
  }
};
