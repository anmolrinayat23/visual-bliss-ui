import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

if (!VITE_API_URL) {
  console.error(
    'VITE_API_URL is not defined. Please set it in your .env file.'
  );
  if (import.meta.env.DEV) {
    alert(
      'VITE_API_URL is not defined. API calls will fail. Please check your .env file.'
    );
  }
}

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

export default api;
