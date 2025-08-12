import React, { useState } from 'react';
import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  UploadOutlined, UserOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function TestflowLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const siderItems = [
    {
        key: 'listTestflow',
        icon: <UploadOutlined />,
        lable: <Link to="/list_testflow">测试流列表</Link>
    }
  ]



  return (
    <Layout
      style={{
        margin: 0,
        position: 'fixed', 
        inset: 0,
        display: 'flex',
        minWidth: 0,                   
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <UserOutlined />, label: 'nav 1' },
            { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2' },
            { key: '3', icon: <UploadOutlined />, label: 'nav 3' },
          ]}
        />
      </Sider>

      <Layout style={{ minWidth: 0 }}>
        <Header 
        style={{ 
            padding: 0, 
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start' 
            }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
          <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
            { key: '1', icon: <UserOutlined />, label: 'nav 1' },
            { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2' },
            { key: '3', icon: <UploadOutlined />, label: 'nav 3' },
          ]}
          style={{ flex: 1, minWidth: 0 }}
          />
        </Header>

        <Content
          style={{
            margin: 0,                  
            padding: 24,                // 想完全贴边就改为 0
            background: colorBgContainer,
            minWidth: 0,
            overflow: 'auto',           // 内部滚动
          }}
        >
            <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
