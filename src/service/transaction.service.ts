import axios from 'axios';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  TransactionDtoOut,
} from '../Dto/transaction/transaction.dto';
import { BaseDto } from '../Dto/Base/base.dto';
import { getAccessToken, getCurrentUserId } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/transactions`;

// Fetch all transactions
export const getTransactions = async (
  params: BaseDto,
): Promise<{ data: TransactionDtoOut[]; metadata: { total: number; totalPages: number } }> => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
};

// Fetch a transaction by ID
export const getTransactionById = async (id: number): Promise<TransactionDtoOut> => {
  try {
    const response = await axios.get<TransactionDtoOut>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    throw new Error('Failed to fetch transaction by ID');
  }
};

// Create a new transaction
// Create a new transaction
export const createTransaction = async (
  payload: Omit<CreateTransactionDto, 'userId'>,
): Promise<TransactionDtoOut> => {
  const userId = getCurrentUserId();

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const finalPayload = {
      ...payload,
      userId, // Inject the current user's ID
      items: payload.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        note: item.note,
      })),
    };

    // Log the payload for debugging
    console.log('Payload being sent to API:', finalPayload);

    const response = await axios.post<TransactionDtoOut>(
      API_URL,
      finalPayload,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    // Log detailed error response from the backend
    console.error('Error creating transaction:', error.response?.data || error);
    throw new Error('Failed to create transaction');
  }
};

// Update an existing transaction
export const updateTransaction = async (
  id: number,
  payload: UpdateTransactionDto,
): Promise<TransactionDtoOut> => {
  try {
    const response = await axios.patch<TransactionDtoOut>(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

// Delete a transaction
export const deleteTransaction = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
};
