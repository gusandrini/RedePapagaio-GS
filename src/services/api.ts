import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.149.101.196:8080', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
