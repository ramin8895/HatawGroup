"use client";
import { Button, Drawer, Layout, Menu, theme, Grid } from "antd";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined, // آیکون منوی همبرگری اضافه شد
} from "@ant-design/icons";
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
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid; // هوک برای تشخیص سایز صفحه

const LayoutComponentDashbord = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // برای جلوگیری از خطای Hydration
  
  const router = useRouter();
  const screens = useBreakpoint(); // تشخیص سایز صفحه
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // اطمینان از اینکه کامپوننت در کلاینت رندر شده است
  useEffect(() => {
    setMounted(true);
  }, []);

  // محاسبه فاصله محتوا از راست
  // اگر موبایل بود فاصله 0، اگر دسکتاپ بود بر اساس وضعیت منو (80 یا 200)
  const isDesktop = mounted && screens.lg;
  const contentMarginRight = isDesktop ? (collapsed ? 80 : 200) : 0;

  const menuItems = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "داشبۆرد",
    },
    {
      key: "event",
      icon: <Video size={20} />,
      label: "چالاکیەکان",
      children: [
        {
          key: "dashboard/event/add-event",
          icon: <PackagePlus size={18} />,
          label: "زیادکردنی چالاکی",
        },
        {
          key: "dashboard/event/event-list",
          icon: <ListOrdered size={18} />,
          label: "لیستی چالاکیەکان",
        },
        {
          key: "dashboard/event/event-lottery",
          icon: <ListOrdered size={18} />,
          label: "قرعەکێشی چالاکی",
        },
      ],
    },
    {
      key: "customers",
      icon: <Users size={20} />,
      label: "کڕیارەکان",
      children: [
        {
          key: "dashboard/customers",
          label: "لیستی کڕیارەکان",
        },
        {
          key: "customers/groups",
          icon: <UserCog size={18} />,
          label: "گرووپەکان",
        },
        {
          key: "customers/vip",
          icon: <Crown size={18} />,
          label: "کڕیارە VIP ـەکان",
        },
      ],
    },
    {
      key: "content",
      icon: <Newspaper size={20} />,
      label: "بلاگ / ناوەڕۆک",
      children: [
        { key: "dashboard/blog", label: "بابەتەکان" },
        { key: "dashboard/blog/add-blog", label: "زیادکردنی بابەت" },
        { key: "dashboard/blog/category", label: "هاوپۆلەکان" },
        { key: "dashboard/blog/tags-blog", label: "تاگەکان" },
        { key: "dashboard/blog/comments", label: "کۆمێنتەکان" },
      ],
    },
    {
      key: "support",
      icon: <LifeBuoy size={20} />,
      label: "پاڵپشتی",
      children: [
        {
          key: "tickets",
          icon: <MessageSquareDot size={18} />,
          label: "تیکەتەکان",
        },
        {
          key: "faq",
          label: "پرسیارە باوەکان",
        },
      ],
    },
    {
      key: "admins",
      label: "بەکارهێنەران و ڕۆڵەکان",
      icon: <UserCog size={20} />,
      children: [
        { key: "admins", label: "ئەدمینەکان" },
        { key: "roles", label: "ڕۆڵەکان" },
      ],
    },
    {
      key: "settings",
      icon: <Settings size={20} />,
      label: "ڕێکخستنەکان",
    },
    {
      key: "logout",
      icon: <LogOut size={20} />,
      label: "چوونەدەرەوە",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      signOut();
    } else {
      router.push(`/${key}`);
    }
    // بستن منوی موبایل بعد از کلیک
    setMobileOpen(false);
  };

  return (
    <Layout className="min-h-screen bg-gray-50 dashbord" dir="rtl">
      {/* Sidebar - Desktop Only */}
      <Sider
        width={200}
        theme="light"
        collapsed={collapsed}
        trigger={null}
        // کلاس hidden lg:block باعث می‌شود فقط در دسکتاپ دیده شود
        className="hidden lg:block fixed! right-0 top-0 h-screen border-l border-gray-200 shadow-sm z-50"
        reverseArrow
      >
        <div className="flex items-center justify-center h-16 font-bold text-gray-700 text-lg border-b border-gray-200 select-none">
          Logo
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none [&_.ant-menu-item-selected]:bg-blue-50 [&_.ant-menu-item-selected]:text-blue-600"
          />
        </div>
      </Sider>

      {/* Drawer - Mobile Only */}
      <Drawer
        title={<span className="font-bold text-gray-700 ">Logo</span>}
        placement="right"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={250}
        className="lg:hidden sm:hidden"
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
      </Drawer>

      {/* Main Layout */}
      <Layout
        className="transition-all duration-300 ease-in-out"
        dir="rtl"
        style={{
          marginRight: contentMarginRight, // تنظیم فاصله داینامیک
          width: `calc(100% - ${contentMarginRight}px)`,
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
            zIndex: 40,
          }}
          className="shadow-sm border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            {/* Desktop Toggle Button */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex text-gray-700 hover:text-blue-600"
            />
            
            {/* Mobile Toggle Button (Hamburger) */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileOpen(true)}
              className="sm:hidden text-gray-700 hover:text-blue-600"
            />
            
            <h1 className="text-lg font-medium text-gray-700">Dashboard</h1>
          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="shadow-sm overflow-x-hidden"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponentDashbord;