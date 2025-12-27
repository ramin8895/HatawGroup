"use client";

import {
  Button,
  Drawer,
  Layout,
  Menu,
  theme,
  Grid,
  Avatar,
  Badge,
  ConfigProvider,
  MenuProps,
} from "antd";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import {
  LayoutDashboard,
  PackagePlus,
  ListOrdered,
  Users,
  UserCog,
  Crown,
  Newspaper,
  Settings,
  Video,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const LayoutComponentDashbord = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const screens = useBreakpoint();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDesktop = mounted && screens.lg;
  const contentMarginRight = isDesktop ? (collapsed ? 100 : 300) : 0;

  // رنگ طلایی لوکس
  const goldColor = "#D4AF37";

  const menuItems: MenuProps['items'] = [
    { key: "dashboard", icon: <LayoutDashboard size={20} />, label: "داشبۆرد" },
    {
      key: "event",
      icon: <Video size={20} />,
      label: "چالاکیەکان",
      children: [
        { key: "dashboard/event/add-event", icon: <PackagePlus size={18} />, label: "زیادکردنی چالاکی" },
        { key: "dashboard/event/event-list", icon: <ListOrdered size={18} />, label: "لیستی چالاکیەکان" },
        { key: "dashboard/event/event-lottery", icon: <Crown size={18} />, label: "قرعەکێشی" },
      ],
    },
    {
      key: "customers",
      icon: <Users size={20} />,
      label: "کڕیارەکان",
      children: [
        { key: "dashboard/customers", label: "لیستی کڕیارەکان" },
        { key: "customers/groups", icon: <UserCog size={18} />, label: "گرووپەکان" },
        { key: "customers/vip", icon: <Crown size={18} />, label: "کڕیارە VIP" },
      ],
    },
    {
      key: "content",
      icon: <Newspaper size={20} />,
      label: "بلۆگ و ناوەڕۆک",
      children: [
        { key: "dashboard/blog", label: "بابەتەکان" },
        { key: "dashboard/blog/add-blog", label: "زیادکردنی بابەت" },
        { key: "dashboard/blog/comments", label: "کۆمێنتەکان" },
      ],
    },
    { type: "divider", className: "border-slate-100 my-6" },
    { key: "dashboard/settings", icon: <Settings size={20} />, label: "ڕێکخستنەکان" },
    {
      key: "logout",
      icon: <LogOut size={20} />,
      label: "چوونەدەرەوە",
      className: "logout-item! mt-auto! text-rose-500!",
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === "logout") {
      signOut();
    } else {
      router.push(`/${key}`);
    }
    setMobileOpen(false);
  };

  if (!mounted) return null;

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: { 
            colorPrimary: goldColor, 
            borderRadius: 20,
            colorBgLayout: "#FDFDFD",
            fontFamily: "inherit"
        },
      }}
    >
      <Layout className="min-h-screen! bg-[#FDFDFD]!" dir="rtl">
        {/* Sidebar - Desktop */}
        <Sider
          width={300}
          collapsedWidth={100}
          collapsed={collapsed}
          trigger={null}
          className="hidden! lg:block! fixed! right-0! top-0! h-screen! z-[60]! bg-white! border-l! border-slate-100 shadow-[20px_0_40px_rgba(0,0,0,0.02)]!"
        >
          <div className="flex items-center justify-center h-24 px-6 mb-4 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex-shrink-0 flex items-center justify-center shadow-lg shadow-[#D4AF37]/30">
                <span className="font-black text-white text-2xl">H</span>
              </div>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col"
                >
                  <span className="text-slate-900 font-black tracking-tighter text-xl leading-none">HATAW</span>
                  <span className="text-[#D4AF37] text-[10px] font-black tracking-[3px] uppercase mt-1">Management</span>
                </motion.div>
              )}
            </div>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[pathname.substring(1)]}
            items={menuItems}
            onClick={handleMenuClick}
            className="bg-transparent! px-4 border-none! custom-sidebar-menu h-[calc(100vh-120px)]"
          />
        </Sider>

        {/* Mobile Drawer */}
        <Drawer
          placement="right"
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          width={280}
          closeIcon={null}
          styles={{ body: { padding: "20px 0", backgroundColor: "#FFFFFF" } }}
        >
          <div className="px-8 mb-8 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-white font-bold shadow-lg shadow-[#D4AF37]/20">H</div>
             <span className="text-slate-900 font-black text-xl">DASHBOARD</span>
          </div>
          <Menu
            mode="inline"
            items={menuItems}
            onClick={handleMenuClick}
            className="bg-transparent! border-none!"
          />
        </Drawer>

        {/* Main Area */}
        <Layout
          className="transition-all duration-500 bg-transparent!"
          style={{
            marginRight: contentMarginRight,
            width: isDesktop ? `calc(100% - ${contentMarginRight}px)` : "100%",
          }}
        >
          {/* Header */}
          <Header className="sticky top-0 z-50 flex items-center justify-between h-24 px-8 bg-white/70! backdrop-blur-2xl border-b border-slate-50 leading-none!">
            
            <div className="flex items-center gap-8">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-white hover:text-[#D4AF37] text-slate-400 transition-all border border-slate-100 shadow-sm"
              />
              {/* <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-900"
              /> */}

  
            </div>

          </Header>

          <Content className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={pathname}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white border border-slate-100 rounded-[3rem] p-10 min-h-[calc(100vh-200px)] shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Content>
        </Layout>
      </Layout>

      <style jsx global>{`
        .ant-layout-sider-children { display: flex; flex-direction: column; }
        
        .custom-sidebar-menu { border: none !important; }

        .custom-sidebar-menu .ant-menu-item {
          height: 56px !important;
          margin-bottom: 10px !important;
          color: #94a3b8 !important;
          border-radius: 18px !important;
          font-weight: 600 !important;
        }

        .custom-sidebar-menu .ant-menu-item-selected {
          background: linear-gradient(90deg, #FFFFFF 0%, rgba(212, 175, 55, 0.08) 100%) !important;
          color: #D4AF37 !important;
          font-weight: 900 !important;
          box-shadow: -4px 0 0 #D4AF37;
        }

        .custom-sidebar-menu .ant-menu-submenu-title { 
            color: #94a3b8 !important; 
            height: 56px !important;
            font-weight: 600 !important;
        }

        .custom-sidebar-menu .ant-menu-item:hover,
        .custom-sidebar-menu .ant-menu-submenu-title:hover {
          color: #D4AF37 !important;
          background: #FDFDFD !important;
        }

        .ant-menu-sub { 
            background: #F8F9FA !important; 
            border-radius: 18px !important; 
            padding: 8px !important;
            margin: 5px 0 !important;
            border: 1px solid #F1F5F9 !important;
        }

        .logout-item {
          margin-top: auto !important;
          border: 1px solid #fff1f2 !important;
          background: #fff1f2/50 !important;
        }
        
        .logout-item:hover {
          background: #fff1f2 !important;
          color: #e11d48 !important;
        }

        .ant-menu-inline-divider { border-color: #F1F5F9 !important; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #FDFDFD; }
        ::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}</style>
    </ConfigProvider>
  );
};

export default LayoutComponentDashbord;