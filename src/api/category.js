import apiClient from './client';

export const categoriesApi = {
  getAll: () => apiClient.get('categories'),
  getOne: (id) => apiClient.get(`categories/${id}`),
  create: (data) => apiClient.post('categories', data),
  update: (id, data) => apiClient.patch(`categories/${id}`, data),
  delete: (id) => apiClient.patch(`categories/delete/${id}`),
};
