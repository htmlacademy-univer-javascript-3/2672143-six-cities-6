import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApiClient = (): AxiosInstance =>
  axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

export const apiClient = createApiClient();
