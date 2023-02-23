import axios from 'axios';
import { getCookie } from '../utils/cookie';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 토큰 가져오기
const accessToken = getCookie('accessToken');

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
});
