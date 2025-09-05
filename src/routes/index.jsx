import AdminLayout from "../components/layout/admin/AdminLayout";
import DefaultLayout from "../components/layout/default/DefaultLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminJobsPage from "../pages/admin/AdminJobsPage";
import AdminCompaniesPage from "../pages/admin/AdminCompaniesPage";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/LoginPage";
import JobPage from "../pages/job/JobPage";

const publicRoutes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: null },
    { path: '/jobs/:id', component: JobPage, layout: DefaultLayout },
    { path: '/admin', component: AdminPage, layout: AdminLayout },
    { path: '/admin/jobs', component: AdminJobsPage, layout: AdminLayout },
    { path: '/admin/companies', component: AdminCompaniesPage, layout: AdminLayout }
]

const privateRoutes = [
]

export { publicRoutes, privateRoutes }