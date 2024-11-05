import axios from 'axios';
import { BaseDto } from 'Dto/Base/base.dto';
import { getAccessToken } from './auth.service';
import { CreateCustomerDto } from 'Dto/customer/customer.dto';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/customers`;

export const getCustomers = async (params: BaseDto) => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('GET customers response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers');
  }
};

export const createCustomer = async (payload: CreateCustomerDto) => {
  try {
    console.log('Creating customer with payload:', payload);
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Customer created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create customer');
  }
};

export const updateCustomer = async (id: number, payload: CreateCustomerDto) => {
  try {
    console.log(`Updating customer with ID ${id} and payload:`, payload);
    const response = await axios.patch(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Customer updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error.response ? error.response.data : error.message);
    throw new Error('Failed to update customer');
  }
};

export const deleteCustomer = async (id: number) => {
  try {
    console.log(`Deleting customer with ID ${id}`);
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Customer deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer:', error.response ? error.response.data : error.message);
    throw new Error('Failed to delete customer');
  }
};

export const getCustomerById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Fetched customer by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching customer by ID:',
      error.response ? error.response.data : error.message,
    );
    throw new Error('Failed to fetch customer by ID');
  }
};
