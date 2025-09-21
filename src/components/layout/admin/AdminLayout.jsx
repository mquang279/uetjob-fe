import { Layout } from 'antd';
import Header from './Header';
import { Sidebar } from '../../ui/Sidebar';
const { Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
                {children}
            </Content>
        </div>
    )
}

export default AdminLayout
