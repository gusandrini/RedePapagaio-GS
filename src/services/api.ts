import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.20.10.2:8080', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
