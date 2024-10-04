// app/services/auth.service.ts

import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from 'cookies-next'; // Impor setCookie, deleteCookie, dan getCookie
import { UserDto } from '../Dto/authDto/UserDto';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/auth/`;

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      username,
      password,
    });

    // Jika login berhasil, set cookie 'isLoggedIn'
    if (response.data) {
      setCookie('isLoggedIn', 'true', { maxAge: 60 * 60 * 24 }); // Set cookie untuk 24 jam
      setCookie('accessToken', response.data.accessToken, { maxAge: 60 * 60 * 24 }); // Set cookie untuk access token
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      throw error.response ? error.response.data : new Error('An error occurred during login.');
    } else if (error instanceof Error) {
      // Generic error handling
      throw new Error(error.message);
    } else {
      // Fallback for unknown error types
      throw new Error('An unknown error occurred during login.');
    }
  }
};

// Fungsi logout
export const logoutUser = () => {
  deleteCookie('isLoggedIn');
  deleteCookie('accessToken');
  localStorage.clear();
};

// Fungsi untuk mendapatkan access token
export const getAccessToken = () => {
  return getCookie('accessToken'); // Ambil access token dari cookie
};

// Fungsi untuk mendapatkan informasi pengguna dari token
export const getUserInfo = (): UserDto | null => {
  const token = getAccessToken();
  if (token) {
    try {
      const decodedToken = jwtDecode<UserDto>(token);
      return decodedToken;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  return null;
};
