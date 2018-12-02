import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : axios.defaults.baseURL
});

export default instance;