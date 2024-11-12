// src/service/transaction.service.ts
import axios from 'axios';
import {
  TransactionDtoOut,
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../Dto/transaction/transaction.dto';
import { getAccessToken } from './auth.service';
import { BaseDto } from 'Dto/Base/base.dto';
import { PrescriptionRedemptionDtoOut } from 'Dto/prescriptions/redeemtion.dto';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/transactions`;
const REDEMPTION_API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/prescription-redemptions`;

// Create a new transaction
export const createTransaction = async (
  params: BaseDto,
): Promise<{
  totalItems(totalItems: any): unknown;
  data: TransactionDtoOut[];
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
    console.error('Error fetching prescription redemptions:', error);
    throw new Error('Failed to fetch prescription redemptions');
  }
};

// Fetch all transactions
export const getTransactions = async (): Promise<TransactionDtoOut[]> => {
  try {
    const response = await axios.get<TransactionDtoOut[]>(API_URL, {
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

// Fetch a single transaction by ID
export const getTransactionById = async (transaction_id: number): Promise<TransactionDtoOut> => {
  try {
    const response = await axios.get<TransactionDtoOut>(`${API_URL}/${transaction_id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error('Failed to fetch transaction');
  }
};

// Update an existing transaction
export const updateTransaction = async (
  transaction_id: number,
  payload: UpdateTransactionDto,
): Promise<TransactionDtoOut> => {
  try {
    const response = await axios.patch<TransactionDtoOut>(`${API_URL}/${transaction_id}`, payload, {
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
export const deleteTransaction = async (transaction_id: number) => {
  try {
    console.log(`Deleting transaction with ID ${transaction_id}`);
    const response = await axios.delete(`${API_URL}/${transaction_id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Transaction deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error deleting transaction:',
      error.response ? error.response.data : error.message,
    );
    throw new Error('Failed to delete transaction');
  }
};

// Fetch all prescription redemptions
export const getRedemptionTransactions = async (): Promise<PrescriptionRedemptionDtoOut[]> => {
  try {
    const response = await axios.get<PrescriptionRedemptionDtoOut[]>(REDEMPTION_API_URL, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prescription redemptions:', error);
    throw new Error('Failed to fetch prescription redemptions');
  }
};
