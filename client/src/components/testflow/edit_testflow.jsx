import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Layout, Divider, theme, Card, Typography,
  Space, Descriptions,Tag, List,
  Flex, Splitter,Row, Col,
  Drawer
} from "antd";
import { ArrowRightOutlined,CaretRightOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Text } = Typography;

function flattenObject(obj, prefix = "") {
  const out = [];
  if (obj == null) return out;
  if (typeof obj !== "object" || Array.isArray(obj)) return [[prefix || "value", obj]];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) out.push(...flattenObject(v, key));
    else out.push([key, v]);
  }
  return out;
}

function useApiData(id) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id == null) return;
    axios.get(`/api/testflow/${id}`).then((res) => setDetail(res.data?.data));
  }, [id]);

  return { detail };
}


function normalizeLogs(detail) {
  const raw = Array.isArray(detail?.logs) ? detail.logs : [];
  return [...raw].sort(
    (a, b) =>
      (a?.ts ?? Number.MAX_SAFE_INTEGER) -
      (b?.ts ?? Number.MAX_SAFE_INTEGER)
  );
}


function StepCard({ log={}, index, onClick }) {
  const { type = "unknown", ts, tabId, payload = {} } = log;
  const { value, text, title, url, selector, xpath, id, class_name } = payload;

  const main = type;

  const cardstyle={
    width: '200px',
    height: '120px',
  }

  return (
    <Flex 
      style={{
        margin: "10px 10px",
        width: '240px',
        height: '160px',
      }}
    >
      <Flex justify='center' align='center'>
        <Card 
        hoverable
        onClick={() => onClick?.(log)}
        style={cardstyle}
      >
        <Tag color="blue">#{index + 1}</Tag>
        <div></div>
        <div>{main}</div>
      </Card>
      </Flex>
      <Flex justify='center' align='center'>
        <CaretRightOutlined style={{ fontSize: '28px' }}/>
      </Flex>


    </Flex>
    
  );
}

function StepDrawer({
  open, 
  onClose, 
  log,
  title = "步骤详情",
  showRaw = true,
}){
  
  // const { payload = {} } = log;
  // const { value, text, url, selector, xpath, id, class_name } = payload;
  
  return (
    <Drawer
      title={title}
      placement="right"
      closable={false}
      open={open}
      onClose={onClose}
      log={log}
      getContainer={false}
    >
    </Drawer>
  )
}

function CardList({logs}){
  const [current, setCurrent] = useState(null);
  const temp_log = 0;


  return(
    // <List
    //   grid={{
    //     gutter: 20,
    //     xs: 1,
    //     sm: 1,
    //     md: 2,
    //     lg: 3,
    //     xl: 4,
    //     xxl: 5,
    //   }}
    //   dataSource={logs}
    //   renderItem={(log,idx)=> (
    //     <List.Item key={log.id ?? `${idx}-${log.type ?? "step"}`}>
    //         <StepCard log={log} index={idx} />
    //     </List.Item>
    //     )}
    // />
    <div
    style={{
      height: "100%",
      width: "100%",
    }}>
      <Row>
        {logs.map((log, index) => {
          const key=log.id ?? `${index}-${log.type ?? "step"}`;
          return (
            <Col
              key={key}
              xs={{ flex: "100%" }}  // 1 列
              sm={{ flex: "50%" }}   // 2 列
              md={{ flex: "40%" }}   // ~2–3 列（按容器宽度自动排）
              lg={{ flex: "20%" }}   // 5 列
              xl={{ flex: "10%" }}   // 10 列
              >
                <StepCard log={log} index={index} onClick={setCurrent} />
            </Col>
          )
        })}
      </Row>
      <StepDrawer
        open={!!current}
        onClose={() => setCurrent(null)}
        log={current}
        width={440}
        getContainer={false}
        title="步骤详情"
        showRaw
      />
      
    </div>
    
  )
}
/* --------------------------- 页面主体 --------------------------- */
export default function ExpandTestflow() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams();
  const navigate = useNavigate();

  const { detail } = useApiData(id);
  const logs = useMemo(() => normalizeLogs(detail), [detail]);

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [enabled, setEnabled] = React.useState(true);


  return (
    <Layout 
      style={{ 
        height: "100%", 
        width: "100%",
      }}
    >
      <Header
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          alignItems: "center",
          paddingInline: 16,
          position: 'sticky',
          lineHeight: "64px",
        }}
        // class='header'
      >
        <Text strong>Testflow 详情</Text>
        <Divider type="vertical" />
      </Header>
      <Content 
        style={{
          height: `calc(100dvh - 128px)`,
          overflowY: 'auto'
        }}
      >
        <CardList logs={logs}/>
      </Content>
    </Layout>
  );
}
