import apiClient from './client';

export const cashiersApi = {
  getAll: () => apiClient.get('cashiers'),
  create: (data) => apiClient.post('cashiers', data),
  updateStatus: (id, data) => apiClient.patch(`cashiers/update-status/${id}`, data),
  delete: (id) => apiClient.delete(`cashiers/${id}`),
};
