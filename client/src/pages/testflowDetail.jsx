import ExpandTestflow from '../components/testflow/edit_testflow';
import React from 'react';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function TestflowDetail(){
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
                position: 'sticky',
                lineHeight: '64px'
                }}
            >
            </Header>
            <Content
            style={{
                // margin: '16px 16px',             
                // padding: 16,
                // background: colorBgContainer,
                // borderRadius: borderRadiusLG,
                // minWidth: 0,
                // overflow: 'auto',
                height: '100%',           
                // overflow: "initial",// 内部滚动
                }}>
                    <ExpandTestflow />
            </Content>
        </Layout>

    );
}

export default TestflowDetail;
