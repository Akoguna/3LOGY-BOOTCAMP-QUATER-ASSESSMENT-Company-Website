import api from './api';

const resourceService = {
  getAll: async () => {
    const response = await api.get('/api/resources');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/api/resources', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/api/resources/${id}`, data);
    return response.data;
  },
  remove: async (id) => {
    await api.delete(`/api/resources/${id}`);
    return id;
  }
};

export default resourceService;