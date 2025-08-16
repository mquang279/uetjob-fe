import Footer from "./components/layout/footer"
import Header from "./components/layout/header"
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router"
import HomePage from "./pages/home/Home"
import { publicRoutes } from "./routes"
import DefaultLayout from "./components/layout/default.layout"
import { Fragment } from "react"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component

            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return (
              <Route key={index} path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
