// baseLayout.jsx
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UnorderedListOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
// import { StyleSheet } from 'react-native';

const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};


export default function BaseLayout() {
  const [collapsed, setCollapsed] = useState(false);
  // const siderWidth = collapsed ? 80 : 200; // AntD 默认 collapsedWidth=80; 展开宽度 200
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const siderItems = [
    { key: '1', icon: <UnorderedListOutlined />, label: <Link to="/list">list</Link> },
    { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2' },
    { key: '3', icon: <UploadOutlined />, label: 'nav 3' },
  ];

  return (
    <Layout 
    hasSider
    style={{width: '100%', height: '100%'}}
    >
      <Sider
        // width={200}
        // collapsedWidth={80}
        // collapsible
        // trigger={null}
        collapsed={collapsed}
        style={siderStyle}

      >
        <Button
          theme="dark"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: 16, width: 64, height: 64, color: '#fff' }}
        />
        <Menu theme="dark" mode="inline" items={siderItems} />
      </Sider>

      {/* 右侧区域：根据 Sider 的宽度让出空间 */}
      <Layout >
        <Content
        style={{
            // margin: '8px 8px',
            padding: 0,
            height: "100%",
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
            // overflow: 'initial',
          }}
        // style={{ 
        //   margin: '8px 16px 8px', 
        //   overflow: 'initial' }}
          >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
