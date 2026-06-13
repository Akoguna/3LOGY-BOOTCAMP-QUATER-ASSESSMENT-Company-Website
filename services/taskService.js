import api from './api';

const taskService = {
  getAll: async () => {
    const response = await api.get('/api/tasks');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/api/tasks', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/api/tasks/${id}`, data);
    return response.data;
  },
  remove: async (id) => {
    await api.delete(`/api/tasks/${id}`);
    return id;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/api/tasks/${id}/status`, { status });
    return response.data;
  }
};

export default taskService;