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

const { Header, Sider, Content } = Layout;

const { Title } = Typography;

/** 解析 "YYYY-MM-DD HH:MM:SS" 为 Date，避免各浏览器不一致的原生解析 */
function parseYMDHMS(s) {
  if (!s) return null;
  // "2025-08-11 12:34:56"
  const [datePart, timePart] = s.split(" ");
  if (!datePart || !timePart) return null;
  const [y, m, d] = datePart.split("-").map((v) => parseInt(v, 10));
  const [hh, mm, ss] = timePart.split(":").map((v) => parseInt(v, 10));
  // 注意：月份从 0 开始
  return new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, ss || 0);
}

function ListTestflow() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/testflow");
      // 期望后端结构：{ code: 0, data: [{name, created_at, updated_at}], count }
      if (res.data?.code !== 0) throw new Error("接口返回异常");
      setRawData(res.data.data || []);
    } catch (err) {
      console.error(err);
      message.error("获取 Testflow 列表失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 简单前端搜索（按 name 模糊匹配）
  const data = useMemo(() => {
    if (!q) return rawData;
    const kw = q.trim().toLowerCase();
    return rawData.filter((r) => (r.name || "").toLowerCase().includes(kw));
  }, [rawData, q]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 90,
      sorter: (a, b) => (a.id || "").localeCompare(b.id || ""),
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: (a, b) => {
        const da = parseYMDHMS(a.created_at)?.getTime() ?? 0;
        const db = parseYMDHMS(b.created_at)?.getTime() ?? 0;
        return da - db;
      },
      render: (v) => v || "-",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const da = parseYMDHMS(a.updated_at)?.getTime() ?? 0;
        const db = parseYMDHMS(b.updated_at)?.getTime() ?? 0;
        return da - db;
      },
      render: (v) => v || "-",
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Space style={{ width: "100%", marginBottom: 12, justifyContent: "space-between" }}>
        <Title level={4} style={{ margin: 0 }}>Testflows</Title>
        <Space>
          <Input.Search
            allowClear
            placeholder="按名称搜索"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ width: 260 }}
          />
          <Button icon={<ReloadOutlined />} onClick={loadData} loading={loading}>
            刷新
          </Button>
        </Space>
      </Space>

      <Table
        rowKey="id"     // 后端未返回 id，这里用行号做 key；若后端补充 id，改为 rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        onRow={(record) => ({
            onClick: () => navigate(`/testflow/${record.id}`),
            style: {cursor: "pointer"},
        })}
      />
    </div>
  );
}

export default ListTestflow;
