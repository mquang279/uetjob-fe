import { useAuth } from "../../providers/AuthProvider"

const UserProfile = () => {
    const { user, isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated || !user) {
        return <div>Please log in to view your profile</div>
    }

    return (
        <div className="user-profile p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID:</label>
                    <p className="text-gray-900">{user.id}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username:</label>
                    <p className="text-gray-900">{user.username}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>

                {user.age && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age:</label>
                        <p className="text-gray-900">{user.age}</p>
                    </div>
                )}

                {user.gender && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <p className="text-gray-900">{user.gender}</p>
                    </div>
                )}

                {user.address && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address:</label>
                        <p className="text-gray-900">{user.address}</p>
                    </div>
                )}

                {user.role && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role:</label>
                        <p className="text-gray-900">{user.role.name || user.role}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Created At:</label>
                    <p className="text-gray-900">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
