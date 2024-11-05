import axios from 'axios';
import { getAccessToken } from '../utils/handleTokens';

const axiosAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-type': 'application/json'
    }
});


axiosAPI.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error.request)
);
// Handling 401 requests, so we have to decide if we have to logout or to refresh the token

export default axiosAPI;