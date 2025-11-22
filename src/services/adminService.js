import api from './api';

const AdminService = {
  /**
   * Récupérer les statistiques du dashboard
   */
  async getDashboardStats() {
    const response = await api.get('/admin/dashboard');
    return response.data.data;
  },

  /**
   * Liste des utilisateurs avec pagination et recherche
   */
  async getUsersList({ page = 1, limit = 50, q = '' }) {
    const response = await api.get('/admin/users', {
      params: { page, limit, q }
    });
    // La réponse est dans data.data.items selon ton Postman
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
   * Bannir/Débannir un utilisateur
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
