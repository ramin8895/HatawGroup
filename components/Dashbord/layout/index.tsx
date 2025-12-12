"use client";
import { Button, Drawer, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  LayoutDashboard,
  PackagePlus,
  ListOrdered,
  Users,
  UserCog,
  Crown,
  Newspaper,
  LifeBuoy,
  MessageSquareDot,
  Settings,
  Video,
} from "lucide-react";

import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const LayoutComponentDashbord = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const siderWidth = collapsed ? 80 : 200;

  const menuItems = [
    { key: "dashboard", icon: <LayoutDashboard />, label: "Dashboard" },

    {
      key: "Event",
      icon: <Video />,
      label: "Event",
      children: [
        {
          key: "dashboard/event/add-Video",
          icon: <PackagePlus />,
          label: "Add event",
        },
        {
          key: "dashboard/event/event-list",
          icon: <ListOrdered />,
          label: "Event list",
        },
        {
          key: "dashboard/event/event-lottery",
          icon: <ListOrdered />,
          label: "Event lottery",
        },
      ],
    },
    {
      key: "customers",
      icon: <Users />,
      label: "Customers",
      children: [
        { key: "dashboard/customers", label: "Customer List" },
        { key: "customers/groups", icon: <UserCog />, label: "Groups" },
        { key: "customers/vip", icon: <Crown />, label: "VIP Customers" },
      ],
    },
    {
      key: "content",
      icon: <Newspaper />,
      label: "Blog / Content",
      children: [
        { key: "blog", label: "Posts" },
        { key: "blog/add", label: "Add Post" },
        { key: "blog/categories", label: "Categories" },
        { key: "blog/tags", label: "Tags" },
        { key: "blog/comments", label: "Comments" },
      ],
    },
    {
      key: "support",
      icon: <LifeBuoy />,
      label: "Support",
      children: [
        { key: "tickets", icon: <MessageSquareDot />, label: "Tickets" },
        { key: "faq", label: "FAQ" },
      ],
    },

    {
      key: "admins",
      label: "Users & Roles",
      children: [
        { key: "admins", label: "Admins" },
        { key: "roles", label: "Roles" },
      ],
    },

    {
      key: "settings",
      icon: <Settings />,
      label: "Settings",
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50 dashbord" dir="rtl">
      <Sider
        width={200}
        theme="light"
        collapsed={collapsed}
        trigger={null}
        breakpoint="lg"
        className="!fixed right-0 top-0 h-screen flex flex-col border-l border-gray-200 shadow-md"
        reverseArrow
        dir="rtl"
      >
        {/* Logo / Header */}
        <div className="flex items-center justify-center h-16 font-bold text-gray-700 text-lg border-b border-gray-200 select-none">
          Logo
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto flex-1">
          <Menu
            theme="light"
            mode="inline"
            defaultOpenKeys={["products"]}
            defaultSelectedKeys={["dashboard"]}
            items={menuItems}
            onClick={(info) => router.push("/" + info.key)}
            className="[&_.ant-menu-item-selected]:bg-blue-50 [&_.ant-menu-item-selected]:text-blue-600"
            style={{ height: "100%", borderRight: 0 }}
          />
        </div>
      </Sider>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={200}
        className="lg:hidden"
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={["products"]}
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          onClick={(info) => router.push("/" + info.key)}
        />
      </Drawer>
      <Layout
        className="transition-all duration-300"
        dir="rtl"
        style={{
          marginRight: siderWidth,
          width: `calc(100% - ${siderWidth}px)`,
        }}
      >
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
          className="shadow-sm border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex text-gray-700 hover:text-blue-600 transition-colors"
            />
            <h1 className="text-lg font-medium text-gray-700">Dashboard</h1>
          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "24px 24px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="shadow-sm"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponentDashbord;
