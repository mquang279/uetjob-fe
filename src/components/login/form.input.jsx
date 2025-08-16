
const FormInput = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    className = ""
}) => (
    <div className={`mb-4 ${className}`}>
        <label className="block font-medium text-black mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
    </div>
)

export default FormInput