import api from './api';

export const meditationService = {
  createSession: async (sessionData) => {
    const response = await api.post('/meditation/session', sessionData);
    return response.data;
  },

  getUserSessions: async () => {
    const response = await api.get('/meditation/sessions');
    return response.data;
  },

  getSessionStats: async () => {
    const response = await api.get('/meditation/stats');
    return response.data;
  }
};