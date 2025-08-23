import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router';
import { Monitor, Backpack, Building2 } from 'lucide-react';
const { Sider } = Layout;
const labels = ['Dashboard', 'Jobs', 'Companies']
const routes = ['/admin', '/admin/jobs', '/admin/companies']
const items = [Monitor, Backpack, Building2].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: labels[index],
        path: routes[index],
    }),
);

const Sidebar = () => {
    const navigate = useNavigate()

    const handleMenuClick = (e) => {
        const selectedItem = items.find(item => item.key === e.key)
        if (selectedItem && selectedItem.path) {
            navigate(selectedItem.path)
        }
    }
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        siderBg: "black"
                    },
                    Menu: {
                        darkItemBg: "black"
                    }
                },
            }}
        >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{ height: '100vh' }}
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className='flex-col items-center'>
                    <div className='h-[70px] flex justify-center'>
                        <img src="https://itviec.com/assets/logo-itviec-4492a2f2577a15a0a1d55444c21c0fa55810822b3b189fc689b450fb62ce0b5b.png" alt="logo" className="h-auto w-32 self-center" />
                    </div>
                    <div className="mt-2">
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={items}
                            onClick={handleMenuClick}
                        />
                    </div>
                </div>
            </Sider>
        </ConfigProvider>
    );
};
export default Sidebar;