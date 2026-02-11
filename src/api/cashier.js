import apiClient from './client';

export const cashiersApi = {
  getAll: () => apiClient.get('cashiers'),
  getOne: (id) => apiClient.get(`cashiers/${id}`),
  create: (data) => apiClient.post('cashiers', data),
  update: (id, data) => apiClient.patch(`cashiers/${id}`, data),
  delete: (id) => apiClient.delete(`cashiers/${id}`),
};
