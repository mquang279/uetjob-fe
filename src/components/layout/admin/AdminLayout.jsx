import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
const { Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout style={{ marginLeft: '200px' }}>
                <Header />
                <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
