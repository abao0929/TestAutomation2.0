// App.jsx
import React from "react";
import { Layout } from "antd";
const { Header, Content } = Layout;

export default function App() {
  const HEADER_H = 64; // 你的 Header 高度
  return (
    <Layout style={{ height: "100dvh" }}>
      <Header style={{ height: HEADER_H, lineHeight: `${HEADER_H}px` }}>
        顶部区域
      </Header>

      {/* 关键：内容区给定高度，自己滚 */}
      <Content
        style={{
          height: `calc(100dvh - ${HEADER_H}px)`,
          overflowY: "auto",
          padding: 16,
          background: "#fff",
        }}
      >
        {/* 这里放很长的内容 */}
        {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            }
      </Content>
    </Layout>
  );
}
