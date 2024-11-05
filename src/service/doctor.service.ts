import axios from 'axios';
import { BaseDto } from 'Dto/Base/base.dto';
import { CreateDoctorDto } from 'Dto/doctor/doctor.dto';
import { getAccessToken } from './auth.service';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/doctors`;

export const getDoctors = async (params: BaseDto) => {
  // Renamed for clarity
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('GET doctors response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors');
  }
};

export const createDoctor = async (payload: CreateDoctorDto) => {
  // Renamed for clarity
  try {
    console.log('Creating doctor with payload:', payload);
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Doctor created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating doctor:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create doctor');
  }
};

export const updateDoctor = async (id: number, payload: CreateDoctorDto) => {
  try {
    console.log(`Updating doctor with ID ${id} and payload:`, payload);
    const response = await axios.patch(`${API_URL}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Doctor updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating doctor:', error.response ? error.response.data : error.message);
    throw new Error('Failed to update doctor');
  }
};

export const deleteDoctor = async (id: number) => {
  try {
    console.log(`Deleting doctor with ID ${id}`);
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Doctor deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting doctor:', error.response ? error.response.data : error.message);
    throw new Error('Failed to delete doctor');
  }
};

export const getDoctorById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log('Fetched doctor by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching doctor by ID:',
      error.response ? error.response.data : error.message,
    );
    throw new Error('Failed to fetch doctor by ID'); // Updated error message
  }
};
