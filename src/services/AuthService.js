import { API_BASE_URL } from "../constants/constant"
import axiosClient from "../utils/axiosClient"

export const AuthService = {
    login: async (username, password) => {
        try {
            const body = { username, password }
            const response = await axiosClient.post('/auth/login', body)
            return response.data
        } catch (error) {
            console.error('Login action failed:', error.response?.data || error.message)
            throw error
        }
    },

    logout: async () => {
        try {
            await axiosClient.post('/auth/logout', {})
        } catch (error) {
            console.error('Logout action failed:', error.response?.data || error.message)
            throw error
        }
    },

    fetchUserInfo: async () => {
        try {
            const response = await axiosClient.get('/auth/account')
            return response.data
        } catch (error) {
            console.log('User are not authenticated')
            throw error
        }
    }
}