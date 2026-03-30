import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// Este bloco anexa o token automaticamente em TODAS as chamadas futuras
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Nome que você usou no Login

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;