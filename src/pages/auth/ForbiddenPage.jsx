import Footer from "../../components/layout/default/Footer"
import Header from "../../components/layout/default/Header"
import { useNavigate } from "react-router"

const ForbiddenPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="text-red-500 flex flex-col items-center justify-center h-[calc(100vh-80px)]">
                <h1 className="text-6xl font-bold mb-4">403</h1>
                <h2 className="text-2xl mb-6">Access Forbidden</h2>
                <p className="text-gray-600 mb-8 text-center">You don't have permission to access this page.</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                >
                    Go Home
                </button>
            </div>
        </>
    )
}

export default ForbiddenPage