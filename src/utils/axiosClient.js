import axios from "axios";
import { AuthService } from "../services/AuthService";

const API_URL = 'http://localhost:8080/api/v1'
const noAuthEndpoints = [
    '/auth/login',
    '/auth/register'
]

let isRefreshing = false;
let failedQueue = [];
let updateTokenCallback = null;

export const setUpdateTokenCallback = (callback) => {
    updateTokenCallback = callback;
};

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

axiosClient.interceptors.request.use(
    (config) => {
        const isNoAuthEndpoint = noAuthEndpoints.some(endpoint =>
            config.url?.includes(endpoint)
        )

        if (!isNoAuthEndpoint) {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const { response } = error;
        const status = response?.status;

        if ((status === 401 || status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!originalRequest.url?.includes('/auth/refresh')) {

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosClient(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                isRefreshing = true;

                try {
                    console.log('Token expired, attempting to refresh...');
                    const data = await AuthService.sendRefreshToken();
                    console.log(data.accessToken); if (data.accessToken) {
                        localStorage.setItem('token', data.accessToken);
                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                        // Update auth context if callback is available
                        if (updateTokenCallback) {
                            updateTokenCallback(data.accessToken);
                        }

                        processQueue(null, data.accessToken);
                        return axiosClient(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    localStorage.removeItem('token');

                    // Clear auth context if callback is available
                    if (updateTokenCallback) {
                        updateTokenCallback(null);
                    }

                    processQueue(refreshError, null);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;