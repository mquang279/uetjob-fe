import { useState } from "react"
import Button from "../../components/ui/button"
import Header from "../../components/layout/header"
import { Check } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {

    }

    return (
        <>
            <Header />
            <div className="login-page flex px-8 pt-8 gap-28 items-center">
                <div className="login-form basis-xl">
                    <h1 className="text-2xl font-bold">Welcome to UETJob</h1>
                    <p className="my-2 text-sm text-gray-700">
                        By signing in, you agree to UETJob's {' '}
                        <a href="#" className="text-blue-600 font-medium">
                            Terms & Conditions
                        </a> {' '}
                        and {' '}
                        <a href="#" className="text-blue-600 font-medium">
                            Privacy Policy
                        </a> {' '}
                        in relation to your privacy information.
                    </p>
                    <Button className="w-full" variant="secondary">
                        <img className="w-6 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" alt="google_icon" />
                        Sign In with Google
                    </Button>

                    <div className="flex items-center text-black py-[12px]">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-3 font-medium">or</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email field */}
                        <label className="block font-medium">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="px-3 py-2 w-full border border-gray-400 rounded-md my-2"
                        />

                        {/* Password field */}
                        <div className="flex mb-1 font-medium justify-between items-center">
                            <label className="">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <a href="#" className="text-blue-600 text-sm" tabIndex={-1}>
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="px-3 py-2 w-full border border-gray-400 rounded-md my-2"
                            />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowPassword(!showPassword)
                                }}
                            >
                                {showPassword ? <Eye /> : < EyeOff />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <Button variant="primary" className="w-full my-2">
                            Sign In with Email
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-gray-700 mt-4">
                            Do not have an account?{" "}
                            <a href="#" className="text-blue-600 font-medium">
                                Sign up now!
                            </a>
                        </p>
                    </form>
                </div>

                <div className="information">
                    <h1 className="font-bold text-2xl">Sign in to get instant access to thousands of reviews and salary information</h1>
                    <ul className="mt-4">
                        <li className="mb-2 flex items-center gap-2">
                            <Check className="text-green-500 flex-shrink-0" />
                            <span>View salary to help you negotiate your offer or pay rise</span>
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <Check className="text-green-500 flex-shrink-0" />
                            <span>Find out about benefits, interview, company culture via reviews</span>
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <Check className="text-green-500 flex-shrink-0" />
                            <span>Easy apply with only 1 click</span>
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <Check className="text-green-500 flex-shrink-0" />
                            <span>Manage your own profile & privacy</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>

    )
}

export default LoginPage