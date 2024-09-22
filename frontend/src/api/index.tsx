import axios from 'axios';

// Verifique e acesse a variável de ambiente
const apiBaseUrl = (typeof window._env_ === 'object' && window._env_ !== null)
  ? (window._env_ as { [key: string]: string }).REACT_APP_API_BASE || 'http://localhost:3000/'
  : 'http://localhost:3000/';

// Configuração do Axios
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
