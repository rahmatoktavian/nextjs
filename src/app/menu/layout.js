'use client'

import { useRouter } from 'next/navigation'
import { ConfigProvider, Layout, Space, Menu, Button } from 'antd';
import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

//theme
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#f5f5f5',
  fontSize: 20
};
const contentStyle = {
  padding: 10,
  backgroundColor: '#fff',
};
const siderStyle = {
  lineHeight: '120px',
  backgroundColor: '#f5f5f5',
};
const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
};

//menu item
const menuItem = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <DashboardOutlined />,
    children: [
      {
        label: 'Chart',
        key: 'menu/chart',
      },
      {
        label: 'Report',
        key: 'menu/report'
      },
    ],
  },
  {
    label: 'Setting',
    key: 'setting',
    icon: <SettingOutlined />,
    children: [
      {
        label: 'Kategori',
        key: '#'
      },
    ],
  }
]

export default function RootLayout({children}) {
  const supabase = createClientComponentClient()
  const router = useRouter();

  const onClick = (menuData) => {
    let page = menuData.key;
    router.push('/'+page);
  };

  const onSignOut = async() => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: 'green',
        }
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>
            Header
            <Button type="primary" onClick={() => onSignOut()} style={{float:'right', marginTop:15}}>Sign out</Button>
          </Header>
          <Layout>
            <Sider style={siderStyle}>
              <Menu
                onClick={onClick}
                defaultOpenKeys={['dashboard']}
                defaultSelectedKeys={['menu/chart']}
                mode="inline"
                items={menuItem}
                style={{backgroundColor: '#f5f5f5',}}
              />
            </Sider>
            <Content style={contentStyle}>{children}</Content>
          </Layout>
        </Layout>
      </Space>
    </ConfigProvider>
  )
}