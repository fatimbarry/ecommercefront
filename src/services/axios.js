import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',  // Remplacez par l'URL de votre backend
  timeout: 10000,  // Timeout après 10 secondes
});

export default axiosInstance;
