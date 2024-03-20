'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ConfigProvider, Layout, Space, Menu, Button } from 'antd';
import Icon, { BookOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
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
const menuItemPetugas = [
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
    label: 'Peminjaman',
    key: 'menu/peminjaman/list',
    icon: <BookOutlined />,
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

const menuItemAnggota = [
  {
    label: 'Peminjaman Saya',
    key: 'menu/peminjaman_saya',
    icon: <BookOutlined />,
  },
  {
    label: 'Peminjaman Realtime',
    key: 'menu/peminjaman_saya_realtime',
    icon: <BookOutlined />,
  }
]

export default function RootLayout({children}) {
  const supabase = createClientComponentClient()
  const router = useRouter();

  const [userType, setUserType] = useState('')

  useEffect(() => {
    checkUser()
  }, []);

  //cara akses api via libary supabase
  async function checkUser() {
    const session = await supabase.auth.getSession()
    const email = session?.data ? session.data.session.user.email : null

    const { data, error } = await supabase
      .from('user')
      .select('anggota_id, petugas_id')
      .eq('email', email)
      .single()

    let userTypeData = '';

    //petugas login
    if(data.petugas_id !== null) {
      userTypeData = 'petugas'

    //anggota login
    } else if(data.anggota_id !== null) {
      userTypeData = 'anggota';
    }

    setUserType(userTypeData)
  }

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
                items={userType == 'petugas' ? menuItemPetugas : menuItemAnggota}
                style={{backgroundColor:'#f5f5f5'}}
              />
            </Sider>
            <Content style={contentStyle}>{children}</Content>
          </Layout>
        </Layout>
      </Space>
    </ConfigProvider>
  )
}