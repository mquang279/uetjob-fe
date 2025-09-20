import { Navigate } from "react-router"
import { useAuth } from "../../providers/AuthProvider"

const GuestGuard = ({ children }) => {
    const { isAuthenticated } = useAuth()
    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return <>{children}</>
}

export default GuestGuard