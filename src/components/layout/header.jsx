import { NavLink } from "react-router"

const Header = () => {
    return (
        <div className="header sticky top-0 bg-[linear-gradient(90deg,rgba(20,20,20,1)_55%,rgba(110,21,25,1)_100%,rgba(0,212,255,1)_100%)] text-white w-full h-[70px] flex justify items-center px-[30px] border-b-[0.5px] border-gray-600">
            <NavLink href="/" className="header-logo pr-[36px]">
                <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" alt="logo" className="h-auto w-32" />
            </NavLink>

            <div className="header-nav w-full flex">
                <ul className="flex w-full gap-9 font-medium text-[rgb(166,166,166)]">
                    <li className="hover:text-white cursor-pointer">All Jobs</li>
                    <li className="hover:text-white cursor-pointer">IT Companies</li>
                    <li className=" hover:text-white cursor-pointer">Blog</li>
                    <li className="hover:text-white cursor-pointer">CV IT Templates</li>
                </ul>
            </div>

            <div className="header-action">
                <ul className="flex text-nowrap font-medium gap-8">
                    <li className="w-full hover:underline cursor-pointer">For Employers</li>
                    <li className="w-full hover:underline cursor-pointer">Sign in/Sign up</li>
                </ul>
            </div>
        </div>
    )
}

export default Header