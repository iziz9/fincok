import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': 'application/json ',
  },
});
