import api from "./api"; // ← utilise le client axios configuré

const API_URL = "/challenges";

const ChallengeService = {
  // Liste tous les challenges actifs
  async listChallenges() {
    const res = await api.get(API_URL);
    return res.data.data;
  },

  // Obtient les détails d’un challenge
  async getChallenge(id) {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data.data;
  },

  // Soumission des réponses
  async submitScore(id, answers) {
    const res = await api.post(`${API_URL}/${id}/submit`, { answers });
    return res.data.data;
  },

  // Récupérer leaderboard d’un challenge
  async getLeaderboard(id) {
    const res = await api.get(`${API_URL}/${id}/leaderboard`);
    return res.data.data.leaderboard;
  },

  // CRUD admin : créer
  async createChallenge(data) {
    const res = await api.post(API_URL, data);
    return res.data.data;
  },

  // Supprimer un challenge
  async deleteChallenge(id) {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data.data;
  }
};

export default ChallengeService;
