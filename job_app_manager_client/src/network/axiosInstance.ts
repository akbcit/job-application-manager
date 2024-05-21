import axios from 'axios';

// Function to retrieve the stored access token
const getAccessToken = () => localStorage.getItem('accessToken');

// Function to save the access token
const saveAccessToken = (token:string) => localStorage.setItem('accessToken', token);


// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle new access tokens
axiosInstance.interceptors.response.use(
    (response) => {
        // Check if the response contains a new access token
        const newAccessToken = response.headers['authorization']?.split(' ')[1];
        if (newAccessToken) {
            saveAccessToken(newAccessToken);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle token refresh logic if necessary
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post('/api/auth/refresh-token');
                const { accessToken } = response.data;
                saveAccessToken(accessToken);
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle refresh token errors
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
