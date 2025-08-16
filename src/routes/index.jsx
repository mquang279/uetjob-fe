import DefaultLayout from "../components/layout/default-layout";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/LoginPage";

const publicRoutes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: null }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }