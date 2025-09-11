import { NavLink, useLocation } from "react-router"
import { useAuth } from "../../../providers/AuthProvider"
import { Sidebar, SideBarItem } from "../../ui/Sidebar"
import { BriefcaseBusiness, Building2, FileUser, LayoutDashboard, NotebookText } from "lucide-react"

const NAV_ITEMS = [
    { name: 'All Jobs', link: '/', icon: <BriefcaseBusiness /> },
    { name: 'IT Companies', link: '/companies', icon: <Building2 /> },
    { name: 'Blog', link: '/blogs', icon: <NotebookText /> },
    { name: 'CV IT Templates', link: '/templates', icon: <FileUser /> }
]

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <div className="header w-full sticky top-0 z-50">
            <div className="bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full h-[70px] flex justify-between items-center px-[30px] border-b-[0.5px] border-gray-600">
                {/* <Sidebar /> */}
                <Sidebar>
                    <>
                        {NAV_ITEMS.map((item, index) => {
                            return (
                                <SideBarItem
                                    key={index}
                                    icon={item.icon}
                                    text={item.name}
                                    link={item.link}
                                />)
                        })}
                    </>
                </Sidebar>

                {/* Logo */}
                <NavLink to="/" className="header-logo pr-[36px]">
                    <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" alt="logo" className="h-8 md:h-12 w-32 object-contain" />
                </NavLink>

                {/* Nav items */}
                <div className="hidden lg:flex header-nav w-full">
                    <ul className="flex w-full gap-9 font-medium text-[rgb(166,166,166)]">
                        {NAV_ITEMS.map((item, index) =>
                            <li key={index} className="hover:text-white cursor-pointer">
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                {/* User */}
                <div className="header-action flex items-center text-nowrap font-medium gap-8 flex-shrink-0">
                    <NavLink to="/employers" className="hidden lg:flex hover:underline cursor-pointer">For Employers</NavLink>
                    {!isAuthenticated && !(location.pathname === '/login') &&
                        <NavLink to="/login" className="w-full hover:underline cursor-pointer">Sign in</NavLink>
                    }
                    {isAuthenticated && user && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                    {user.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="hidden lg:flex text-white">{user.username || user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="hidden lg:flex hover:underline cursor-pointer text-white"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Header