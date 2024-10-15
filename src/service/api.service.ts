import axios, { Method } from 'axios';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/auth/`;

interface FetchOptions<T = unknown, P = Record<string, unknown>> {
  method: Method;
  endpoint: string;
  params?: P; // Using a generic type for params
  data?: T; // Using a generic type for data
  headers?: Record<string, string>;
}

// Function fetchData that automatically includes getAccessToken in the header
export const fetchData = async <T = unknown, P = Record<string, unknown>>({
  method,
  endpoint,
  params = {} as P, // Default as an empty object
  data,
  headers = {},
}: FetchOptions<T, P>) => {
  const token = getAccessToken();

  const defaultHeaders = {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      params, // Including params in the request
      data,
      headers: defaultHeaders,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Request failed');
    } else {
      throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
};
