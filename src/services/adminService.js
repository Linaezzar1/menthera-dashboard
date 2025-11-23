import api from './api';

const AdminService = {
  /**
   * Récupérer les statistiques du dashboard (Utilisateurs, Premium, etc.)
   */
  async getDashboardStats() {
    const response = await api.get('/admin/dashboard');
    return response.data.data;
  },

  /**
   * Statistiques : Moyenne de messages vocaux par utilisateur
   */
  async getAverageVoiceMessages() {
    const response = await api.get('/admin/statistics/voice-messages-average');
    return response.data.data; // { averageVoiceMessagesPerUser, totalVoiceMessages, usersWithVoiceMessages }
  },

  /**
   * Statistiques : Répartition des émotions de la communauté (période = day|week|month)
   */
  async getCommunityEmotionTrends(period = 'week') {
    const response = await api.get('/admin/statistics/community-emotions', {
      params: { period }
    });
    return response.data.data; // { period, emotions, ... }
  },

  /**
   * Statistiques : Courbe émotionnelle d'un utilisateur
   */
  async getUserEmotionalCurve(userId) {
    const response = await api.get(`/admin/statistics/user-emotions/${userId}`);
    return response.data.data; // { userId, emotionCurve }
  },

  /**
   * Statistiques : Evolution du nombre de messages (période = day|week|month)
   */
  async getMessagesOverTime(period = 'week') {
    const response = await api.get('/admin/statistics/messages-over-time', {
      params: { period }
    });
    return response.data.data; // { messagesByDate, totalMessages... }
  },

  /**
   * Statistiques : Notes/rating globales sur les conseils
   */
  async getGeneralRatingStats() {
    const response = await api.get('/admin/statistics/general-ratings');
    return response.data.data; // { averageRating, totalRatings, ratingDistribution... }
  },

  /**
   * Liste des utilisateurs avec pagination/recherche
   */
  async getUsersList({ page = 1, limit = 50, q = '' }) {
    const response = await api.get('/admin/users', {
      params: { page, limit, q }
    });
    return response.data.data;
  },

  /**
   * Récupérer un utilisateur par ID
   */
  async getUserById(userId) {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data.data;
  },

  /**
   * Créer un utilisateur
   */
  async createUser(userData) {
    const response = await api.post('/admin/users', userData);
    return response.data.data;
  },

  /**
   * Mettre à jour un utilisateur (ban, role, etc.)
   */
  async updateUser(userId, updates) {
    const response = await api.put(`/admin/users/${userId}`, updates);
    return response.data.data;
  },

  /**
   * Bannir / Débannir un utilisateur
   */
  async toggleUserBan(userId, isActive) {
    const response = await api.put(`/admin/users/${userId}`, { isActive });
    return response.data.data;
  },

  /**
   * Supprimer un utilisateur
   */
  async deleteUser(userId) {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
};

export default AdminService;
