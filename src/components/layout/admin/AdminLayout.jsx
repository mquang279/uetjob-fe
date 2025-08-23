import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
const { Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px 16px 0' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
