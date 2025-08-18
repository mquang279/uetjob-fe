import Footer from "./Footer"
import Header from "./Header"

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default DefaultLayout