import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from 'cookies-next'; // Impor setCookie, deleteCookie, dan getCookie
import { UserDto } from '../Dto/authDto/UserDto';
import jwtDecode from 'jwt-decode';

const API_URL = `${import.meta.env.VITE_PUBLIC_SERVER}/auth/`;

export const loginUser = async (username: string, password: string) => {
  try {
    // Mengirimkan permintaan login ke server
    const response = await axios.post(`${API_URL}login`, { username, password });

    // Jika login berhasil, set cookies untuk sesi
    if (response.data) {
      setCookie('isLoggedIn', 'true', { maxAge: 60 * 60 * 24 }); // Set cookie untuk status login
      setCookie('accessToken', response.data.accessToken, { maxAge: 60 * 60 * 24 }); // Simpan access token

      // Mendekode token untuk mendapatkan informasi user (userId)
      const decodedToken = jwtDecode<{ sub: string }>(response.data.accessToken); // Decode JWT untuk mendapatkan user ID
      setCookie('userId', decodedToken.sub, { maxAge: 60 * 60 * 24 }); // Simpan user ID di cookie

      // Simpan user info jika diperlukan
      setCookie('userInfo', JSON.stringify(response.data.data), { maxAge: 60 * 60 * 24 });

      return response.data; // Mengembalikan data pengguna dan access token
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('An error occurred during login.');
    } else {
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
  if (!token) {
    console.error('No access token found.');
    return null; // Token tidak ditemukan
  }

  try {
    const decodedToken = jwtDecode<UserDto>(token);

    // Cek apakah token sudah kedaluwarsa
    const currentTime = Math.floor(Date.now() / 1000); // Waktu dalam detik

    // Pastikan exp adalah angka sebelum membandingkannya
    if (
      decodedToken.exp &&
      typeof decodedToken.exp === 'number' &&
      decodedToken.exp < currentTime
    ) {
      console.error('Token has expired.');
      logoutUser(); // Logout jika token kedaluwarsa
      return null; // Token kedaluwarsa
    }

    return decodedToken;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

// auth.service.ts (Menambahkan pengecekan token yang lebih baik)
export const getCurrentUserId = (): string | null => {
  const userInfo = getCookie('userInfo'); // Ambil userInfo dari cookie
  if (!userInfo) {
    console.error('No userInfo found.');
    return null; // Jika userInfo tidak ditemukan
  }

  try {
    const parsedUserInfo = JSON.parse(userInfo as string); // Parse userInfo dari string ke objek
    return parsedUserInfo.id || null; // Ambil userId (id) dari userInfo, jika ada
  } catch (error) {
    console.error('Error parsing userInfo:', error);
    return null; // Gagal mem-parse userInfo
  }
};
