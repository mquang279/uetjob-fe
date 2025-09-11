import { ChevronFirst, ChevronLast, ClosedCaption, SidebarClose } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"

const Sidebar = ({ children }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        !expanded ? <ChevronFirst onClick={() => setExpanded(true)} /> :
            <aside className={`h-screen lg:hidden fixed top-0 left-0 z-50`}>
                <nav className="h-full w-full flex flex-col bg-black shadow-sm">
                    <div className="p-4 pb-2 flex justify-end items-center">
                        <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" alt="logo" className="h-8 md:h-12 w-32 object-contain" />
                        <button onClick={() => setExpanded(false)} className="p-1.5 rounded-lg text-white hover:text-red-600">
                            <SidebarClose />
                        </button>
                    </div>

                    {expanded &&
                        <ul className="flex-1 px-3 mt-4 text-white font-medium">
                            {children}
                        </ul>
                    }
                </nav>
            </aside>
    )
}

const SideBarItem = ({ icon, text, link }) => {
    return (
        <li className=" flex relative items-center py-2 px-2 gap-3 rounded-lg hover:bg-red-600">
            {icon}
            <NavLink to={link}>{text}</NavLink>
        </li >
    )
}

export { Sidebar, SideBarItem }