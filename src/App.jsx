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

            let Guard = route.guard ? route.guard : Fragment

            return (
              <Route key={index} path={route.path}
                element={
                  <Layout>
                    <Guard>
                      <Page />
                    </Guard>
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
