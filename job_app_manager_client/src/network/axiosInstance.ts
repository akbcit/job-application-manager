import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
