import apiClient from './client';

export const productsApi = {
  getAll: () => apiClient.get('products'),
  getOne: (id) => apiClient.get(`products/${id}`),
  create: (data) =>
    apiClient.post('products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  update: (id, data) => apiClient.patch(`products/${id}`, data),
  delete: (id) => apiClient.patch(`products/delete/${id}`),
};
