import { Layout } from 'antd';
import Header from './Header';
import { Sidebar } from '../../ui/Sidebar';
const { Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default AdminLayout
