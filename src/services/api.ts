import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.100:8080/api', // ⬅️ Troque pelo IP da sua máquina
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
