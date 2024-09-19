import axios from 'axios';

const API_URL = 'http://localhost:8898/posts';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;