import Footer from "./Footer"
import Header from "./Header"

const DefaultLayout = ({ children }) => {
    return (
        <div className="relative z-10 bg-gray-100">
            <Header />
            {children}
            <Footer />
        </div>
    )
}



export default DefaultLayout