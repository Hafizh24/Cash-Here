import apiClient from './client';

export const usersApi = {
  resetPassword: (email) => apiClient.post('users/reset-password', email),
  updatePassword: (password, token) =>
    apiClient.patch('users/update-password', password, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
