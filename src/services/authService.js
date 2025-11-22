import api from './api';

const AuthService = {
  /**
   * Login utilisateur
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data.data;

    // Sauvegarder les tokens et les infos user
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  },

  /**
   * Signup utilisateur
   */
  async signup(name, email, password) {
    const response = await api.post('/auth/signup', { name, email, password });
    const { user, accessToken, refreshToken } = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  },

  /**
   * Récupérer l'utilisateur connecté
   */
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  /**
   * Logout
   */
  async logout() {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Erreur lors de la déconnexion', error);
  } finally {
    // Nettoyer le localStorage
    localStorage.clear();
    // Redirection vers login
    window.location.href = '/login';
  }
},

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Obtenir l'utilisateur depuis localStorage
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default AuthService;
