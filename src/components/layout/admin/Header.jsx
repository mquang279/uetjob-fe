import { NavLink } from "react-router"
import { useAuth } from "../../../providers/AuthProvider"
import { Sidebar, SideBarItem } from "../../ui/Sidebar"

const NAV_ITEMS = [
    { name: "Dashboard", link: "/admin" },
    { name: "Company", link: "/admin/companies" },
    { name: "Job", link: "/admin/jobs" },
]

const Header = () => {
    const { user } = useAuth()

    return (
        <div className="header w-full">
            <div className="sticky top-0 bg-black text-white w-full h-[70px] flex justify-between items-center px-[30px] border-b-[0.5px] border-gray-600">
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
                <div className="flex items-center">
                    <NavLink to="/" className="header-logo pr-[36px]">
                        <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" alt="logo" className="h-8 md:h-12 w-20 object-contain" />
                    </NavLink>
                    <ul className="hidden lg:flex gap-6">
                        {NAV_ITEMS.map((item, index) => (
                            <li key={index} className="text-white font-semibold">
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <p className="hidden lg:flex font-semibold">Hello, {user?.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Header