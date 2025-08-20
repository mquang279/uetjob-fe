import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/constant";
import { AuthService } from "../services/AuthService";

const AuthContext = createContext(undefined)

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('useAuth must be used with a AuthProvider')
    }

    return authContext
}

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await AuthService.fetchUserInfo()
            setUser(response.user)
            setToken(response.accessToken)
        }
        fetchUserData()
    }, [])

    const login = async (email, password) => {
        const response = await AuthService.login(email, password)
        setToken(response.accessToken)
        setUser(response.user)
        localStorage.setItem('token', response.accessToken)
        return response
    }

    const logout = async () => {
        await AuthService.logout()
        setToken(null)
        setUser(null)
        localStorage.clear('token')
    }

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider