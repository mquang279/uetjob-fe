import { useMemo, useState } from "react"
import FormInput from "../../components/login/FormInput"
import PasswordInput from "../../components/login/PasswordInput"
import { Check, X } from "lucide-react"
import { useRegister } from "../../hooks/auth/useRegister"
import { useAuth } from "../../providers/AuthProvider"
import { useNavigate } from "react-router"

const PASSWORD_REGEX = {
    specialChar: /[^A-Za-z0-9]/,
    number: /\d/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/
}

const PASSWORD_RULES = [
    { field: "hasAtLeast8Chars", text: "Ít nhất 8 ký tự" },
    { field: "hasSpecialChar", text: "Ít nhất 1 ký tự đặc biệt (! @ # $ ...)" },
    { field: "hasNumber", text: "Ít nhất 1 chữ số" },
    { field: "hasUppercase", text: "Ít nhất 1 chữ cái in hoa" },
    { field: "hasLowercase", text: "Ít nhất 1 chữ cái in thường" }
]

const RegisterPage = () => {
    const useRegisterMutation = useRegister()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState()
    const { login } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const passwordValidation = useMemo(() => {
        const password = formData.password
        return {
            hasAtLeast8Chars: password.length >= 8,
            hasSpecialChar: PASSWORD_REGEX.specialChar.test(password),
            hasNumber: PASSWORD_REGEX.number.test(password),
            hasUppercase: PASSWORD_REGEX.uppercase.test(password),
            hasLowercase: PASSWORD_REGEX.lowercase.test(password)
        }
    }, [formData.password])

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await useRegisterMutation.mutateAsync(formData)
            await login(formData.email, formData.password)
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    const PasswordValidateItem = ({ rule, text }) => {
        return (
            <li className={`flex gap-2 ${rule ? 'text-green-500' : 'text-red-600'}`}>
                {rule ? <Check className="w-3 h-auto" /> : <X className="w-3 h-auto" />}
                {text}
            </li>
        )
    }

    return (
        <div className="px-12 lg:px-100 2xl:px-150 mt-8 text-gray-900 my-4">
            <h2 className="font-bold text-xl">Welcome to UET Job</h2>
            <h1 className="font-extrabold text-3xl my-3">Sign Up</h1>
            <form action={handleRegister} onSubmit={handleRegister}>
                <FormInput
                    label="Họ và tên"
                    type="text"
                    values={formData.username}
                    onChange={handleInputChange('username')}
                    placeholder='Nhập họ tên'
                    required={true}
                />

                <FormInput
                    label="Email"
                    type="email"
                    values={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder='Nhập email'
                    required={true}
                />

                <div className="password-field mb-2">
                    <PasswordInput
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        showPassword={showPassword}
                        toggleShowPassword={() => setShowPassword(!showPassword)}
                        register={true}
                    />
                    <div>
                        <p className="text-md">Mật khẩu cần có:</p>
                        <ul className="text-sm ml-2">
                            {PASSWORD_RULES.map((rule, index) => (
                                <PasswordValidateItem key={index} rule={passwordValidation[rule.field]} text={rule.text} />
                            ))}
                        </ul>
                    </div>
                </div>

                {error &&
                    (<div>
                        {error}
                    </div>)
                }

                <button type="submit" className="bg-gray-900 text-white w-full py-3 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!Object.values(passwordValidation).every(Boolean)}>
                    Đăng ký
                </button>

            </form>
        </div>
    )
}

export default RegisterPage