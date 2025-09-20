import AdminLayout from "../components/layout/admin/AdminLayout";
import DefaultLayout from "../components/layout/default/DefaultLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminJobsPage from "../pages/admin/AdminJobsPage";
import AdminCompaniesPage from "../pages/admin/AdminCompaniesPage";
import HomePage from "../pages/home/Home";
import JobPage from "../pages/job/JobPage";
import CompanyPage from "../pages/company/CompanyPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import GuestGuard from "../components/guards/GuestGuard";

const publicRoutes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: DefaultLayout, guard: GuestGuard },
    { path: '/jobs/:id', component: JobPage, layout: DefaultLayout },
    { path: '/admin', component: AdminPage, layout: AdminLayout },
    { path: '/admin/jobs', component: AdminJobsPage, layout: AdminLayout },
    { path: '/admin/companies', component: AdminCompaniesPage, layout: AdminLayout },
    { path: '/companies/:id', component: CompanyPage, layout: DefaultLayout },
    { path: '/register', component: RegisterPage, layout: DefaultLayout, guard: GuestGuard }
]

const privateRoutes = [
]

export { publicRoutes, privateRoutes }