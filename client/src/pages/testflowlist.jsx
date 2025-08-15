import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";

import {
  MenuFoldOutlined, MenuUnfoldOutlined,ReloadOutlined,
  UploadOutlined, UserOutlined, VideoCameraOutlined,DoubleLeftOutlined
} from '@ant-design/icons';
import { 
    Button, Layout, Menu, theme, 
    Table, Input, Space, Typography, message } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ListTestflow from '../components/testflow/list_testflow';

const { Header, Content } = Layout;

function TestflowList(){
    const { token: { colorBgContainer } } = theme.useToken();
    const navigate = useNavigate();
        const headeritems = [
                    { 
                        key: '1', 
                        icon: <DoubleLeftOutlined />, 
                        label: <Link to="/">返回</Link> },
                ]
    
        return(
            <Layout
            style={{
                height: '100%',
                width: '100%',
            }}>
                <Header 
                style={{ 
                    padding: 0, 
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start', 
                    lineHeight: '64px'
                    }}
                    >
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={headeritems}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    <Button
                        onClick={() => navigate("/testflow/new")}>
                            new
                    </Button>
                </Header>
                <Content
                style={{
                    flex: 1,
                    margin: '16px 16px',                 
                    padding: 24,                // 想完全贴边就改为 0
                    background: colorBgContainer,
                    // minWidth: 0,
                    overflow: 'initial',          // 内部滚动
                }}>
                    <ListTestflow/>
                </Content>
          </Layout>
        );
}

export default TestflowList;