import { NavLink } from "react-router"

const NAV_ITEMS = [
    { name: 'All Jobs', link: '/' },
    { name: 'IT Companies', link: '/companies' },
    { name: 'Blog', link: '/blogs' },
    { name: 'CV IT Templates', link: '/templates' }
]

const Header = () => {
    return (
        <div className="header w-full">
            <div className="sticky top-0 bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full h-[70px] flex justify-between items-center px-[30px] border-b-[0.5px] border-gray-600">
                <NavLink to="/" className="header-logo pr-[36px]">
                    <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" alt="logo" className="h-auto w-32" />
                </NavLink>
                <div className="header-nav w-full flex">
                    <ul className="flex w-full gap-9 font-medium text-[rgb(166,166,166)]">
                        {NAV_ITEMS.map((item, index) =>
                            <li key={index} className="hover:text-white cursor-pointer">
                                <NavLink to={item.link}>{item.name}</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="header-action flex items-center text-nowrap font-medium gap-8 flex-shrink-0">
                    <NavLink to="/employers" className="hover:underline cursor-pointer">For Employers</NavLink>
                    <NavLink to="/login" className="w-full hover:underline cursor-pointer">Sign in/Sign up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header