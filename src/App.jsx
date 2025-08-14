import Footer from "./components/layout/footer"
import Header from "./components/layout/header"
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router"
import HomePage from "./pages/home/Home"

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
