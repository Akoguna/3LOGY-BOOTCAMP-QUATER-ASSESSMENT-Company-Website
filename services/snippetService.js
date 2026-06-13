import api from './api';

const snippetService = {
  getAll: async () => {
    const response = await api.get('/api/snippets');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/snippets/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/api/snippets', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/snippets/${id}`, data);
    return response.data;
  },

  remove: async (id) => {
    await api.delete(`/api/snippets/${id}`);
    return id;
  }
};

export default snippetService;