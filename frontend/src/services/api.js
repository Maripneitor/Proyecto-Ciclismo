import axios from 'axios';

// Crea una instancia de Axios con la URL base de tu backend
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // La URL de tu servidor backend
});

// Interceptor para añadir el token JWT a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;