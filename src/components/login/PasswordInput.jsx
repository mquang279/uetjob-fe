import { NavLink } from "react-router"
import { Eye, EyeOff } from 'lucide-react'

const PasswordInput = ({ value, onChange, showPassword, toggleShowPassword }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-black">
                Password <span className="text-red-500">*</span>
            </label>
            <NavLink
                to="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
                tabIndex={-1}
            >
                Forgot password?
            </NavLink>
        </div>
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder="Password"
                className="px-3 py-2 w-full border border-gray-400 rounded-md my-2"
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={toggleShowPassword}
            >
                {showPassword ? <Eye /> : <EyeOff />}
            </button>
        </div>
    </div>
)

export default PasswordInput