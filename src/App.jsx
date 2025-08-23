import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router"
import { publicRoutes } from "./routes"
import DefaultLayout from "./components/layout/default/DefaultLayout"
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
