import { useAuth } from "../../../providers/AuthProvider"

const Header = () => {
    const { user } = useAuth()

    return (
        <div className="header w-full">
            <div className="sticky top-0 bg-black text-white w-full h-[70px] flex justify-end items-center px-[30px] border-b-[0.5px] border-gray-600">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <p className="font-semibold">Hello, {user?.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Header