import ForbiddenPage from "../../pages/auth/ForbiddenPage"
import { useAuth } from "../../providers/AuthProvider"
import LoadingSpinner from "../ui/LoadingSpinner"

const RoleBasedGuard = ({ accessibleRoles, children }) => {
    const { user, token, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!token || !user) {
        return <ForbiddenPage />
    }

    if (!user.role || !accessibleRoles.includes(user.role.name)) {
        return <ForbiddenPage />
    }

    return <>{children}</>
}

export default RoleBasedGuard