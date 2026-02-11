import apiClient from './client';

export const authApi = {
  login: (credentials) => apiClient.post('auth/login', credentials),
};
