
const Button = ({
    children,
    variant = "primary",
    size = "medium",
    className = "",
    disabled = false,
    type = "button",
    onClick,
    ...props
}) => {
    const baseStyles = "font-bold flex items-center justify-center gap-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
        secondary: "border-1 bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
        ghost: "text-red-600 hover:bg-red-50 focus:ring-red-500",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
        success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
    }

    const sizes = {
        small: "w-[150px] px-5 py-1.5 text-sm",
        medium: "min-w-3xs h-[52px] px-12 py-2 text-base",
        large: "px-16 py-3 text-lg"
    }

    const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
        <button
            type={type}
            className={buttonStyles}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
