"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Tooltip, theme } from "antd";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import { useClerk } from "@clerk/nextjs";
import { useGlobalState } from "../context/globalProvider";

const { Header, Sider, Content } = Layout;

interface GlobalStyleProviderProps {
  children: React.ReactNode;
}

const GlobalStyleProvider: React.FC<GlobalStyleProviderProps> = ({
  children,
}: GlobalStyleProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { openModal } = useGlobalState();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleItemClick = ({ key }: any) => {
    switch (key) {
      case "1":
        router.push("/");
        break;
      case "2":
        router.push("/important");
        break;
      case "3":
        router.push("/completed");
        break;
      case "4":
        router.push("/incomplete");
        break;
      default:
        router.push("/");
        break;
    }
  };

  const getSelectedKey = () => {
    switch (pathname) {
      case "/":
        return "1";
      case "/important":
        return "2";
      case "/completed":
        return "3";
      case "/incomplete":
        return "4";
      default:
        return "1";
    }
  };

  return (
    <GlobalStyled>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[getSelectedKey()]}
            onClick={handleItemClick}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: "All Tasks",
              },
              {
                key: "2",
                icon: <UnorderedListOutlined />,
                label: "Important!",
              },
              {
                key: "3",
                icon: <CheckCircleOutlined />,
                label: "Completed!",
              },
              {
                key: "4",
                icon: <OrderedListOutlined />,
                label: "Do It Now",
              },
            ]}
          />
          <div className="logout-button">
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                signOut(() => router.push("/signin"));
              }}
            >
              Logout
            </Button>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Title level={4}>My Tasks</Title>
            <Tooltip title="Add New Task" style={{ marginRight: "20px" }}>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                style={{ marginRight: "20px" }}
                onClick={openModal}
              />
            </Tooltip>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "scroll",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </GlobalStyled>
  );
};

const GlobalStyled = styled.div`
  .demo-logo-vertical {
    width: auto;
    height: 50px;
    background-color: gray;
    margin: 10px 10px;
    border-radius: 2rem;
  }

  .logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: auto;
    bottom: 10px;
    width: 100%;
  }
`;

export default GlobalStyleProvider;
