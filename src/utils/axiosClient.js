import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1'
const noAuthEndpoints = ['/auth/login', '/auth/register']

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
    (error => {
        return Promise.reject(error)
    })
)

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;