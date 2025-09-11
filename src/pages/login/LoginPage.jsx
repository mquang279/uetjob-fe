import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router"
import Button from "../../components/ui/button"
import { Check, Eye, EyeOff } from 'lucide-react'
import Divider from "../../components/login/Divider"
import PasswordInput from "../../components/login/PasswordInput"
import FormInput from "../../components/login/FormInput"
import { useAuth } from "../../providers/AuthProvider"

const GOOGLE_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"

const BENEFITS = [
    "View salary to help you negotiate your offer or pay rise",
    "Find out about benefits, interview, company culture via reviews",
    "Easy apply with only 1 click",
    "Manage your own profile & privacy"
]

const BenefitsList = () => (
    <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="font-bold text-xl lg:text-2xl text-black mb-6 leading-tight">
            Sign in to get instant access to thousands of reviews and salary information
        </h2>
        <ul className="space-y-4">
            {BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-black leading-relaxed">{benefit}</span>
                </li>
            ))}
        </ul>
    </div>
)


// Main LoginPage Component
const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { login, isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, loading, navigate])

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
        // Clear error when user starts typing
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await login(formData.email, formData.password)
            console.log('Login successful')
            // Redirect to home page after successful login
            navigate('/')
        } catch (error) {
            console.error('Login error:', error)
            setError('Invalid email or password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Show loading while checking authentication status
    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    const handleGoogleSignIn = () => {
        console.log('Google sign in clicked')
    }

    return (
        <div className="bg-gray-50 min-h-screen flex items-center">
            <main className="container mx-auto px-4 py-6 lg:py-8 w-full">
                <div className="flex flex-col items-center lg:flex-row gap-8 lg:gap-16 xl:gap-24 max-w-6xl mx-auto">
                    {/* Login Form Section */}
                    <div className="flex-1 max-w-md mx-auto lg:mx-0">
                        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-sm lg:border">
                            <header className="mb-6">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                                    Welcome to UETJob
                                </h1>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    By signing in, you agree to UETJob's{' '}
                                    <NavLink to="/terms" className="text-blue-600 font-medium hover:underline">
                                        Terms & Conditions
                                    </NavLink>{' '}
                                    and{' '}
                                    <NavLink to="/privacy" className="text-blue-600 font-medium hover:underline">
                                        Privacy Policy
                                    </NavLink>{' '}
                                    in relation to your privacy information.
                                </p>
                            </header>

                            {/* Google Sign In */}
                            <Button
                                className="w-full mb-4"
                                variant="secondary"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                            >
                                <img
                                    className="w-5 h-5 mr-3"
                                    src={GOOGLE_LOGO_URL}
                                    alt="Google"
                                />
                                Sign In with Google
                            </Button>

                            <Divider text="or" />

                            {/* Email/Password Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormInput
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    placeholder="Enter your email"
                                    required
                                />

                                <PasswordInput
                                    value={formData.password}
                                    onChange={handleInputChange('password')}
                                    showPassword={showPassword}
                                    toggleShowPassword={() => setShowPassword(!showPassword)}
                                />

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    disabled={isLoading || !formData.email || !formData.password}
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In with Email'}
                                </Button>
                            </form>

                            {/* Sign Up Link */}
                            <p className="text-center text-gray-600 mt-6">
                                Don't have an account?{' '}
                                <NavLink to="/register" className="text-blue-600 font-medium hover:underline">
                                    Sign up now!
                                </NavLink>
                            </p>
                        </div>
                    </div>

                    <div className="flex-1">
                        <BenefitsList />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LoginPage