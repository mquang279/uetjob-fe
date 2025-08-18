
const Divider = ({ text }) => (
    <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-gray-500 font-medium">{text}</span>
        <hr className="flex-grow border-gray-300" />
    </div>
)

export default Divider