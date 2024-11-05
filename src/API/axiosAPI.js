import axios from 'axios';
import { clearTokens, getAccessToken, updateTokens } from '../utils/handleTokens';
import { refreshToken } from '../services/apiAuth';
const axiosAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
axiosAPI.interceptors.response.use(response => {
    return response;
}, async (error) => {
    const request = error.request;
    const endpoint = request.responseURL.split('/').slice(-1)[0]
    if (endpoint === 'refresh-token') {
        clearTokens();
        return error;
    }
    if (error.code === 'ERR_NETWORK') { // must be switched to Error.status === 401
        const response = await refreshToken();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        updateTokens(newAccessToken, newRefreshToken)

        axiosAPI.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosAPI(request);

    }
    return error;
});
export default axiosAPI;