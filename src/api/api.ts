import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from '../constants/api';

export const createApiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['X-Token'];
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const apiClient = createApiClient();
