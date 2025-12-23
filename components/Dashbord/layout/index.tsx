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
import { motion } from "framer-motion";

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
  const contentMarginRight = isDesktop ? (collapsed ? 80 : 280) : 0;

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
    { type: "divider", className: "border-white/5 my-4" },
    { key: "dashboard/settings", icon: <Settings size={20} />, label: "ڕێکخستنەکان" },
    {
      key: "logout",
      icon: <LogOut size={20} />,
      label: "چوونەدەرەوە",
      className: "mt-auto! text-amber-500! hover:bg-amber-500/10!",
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
        algorithm: theme.darkAlgorithm,
        token: { 
            colorPrimary: "#f59e0b", 
            borderRadius: 16,
            colorBgLayout: "#020617"
        },
      }}
    >
      <Layout className="min-h-screen! bg-[#020617]!" dir="rtl">
        {/* Sidebar - Desktop */}
        <Sider
          width={280}
          collapsedWidth={80}
          collapsed={collapsed}
          trigger={null}
          className="hidden! lg:block! fixed! right-0! top-0! h-screen! z-[60]! bg-[#030712]! border-l! border-white/5 shadow-2xl!"
        >
          <div className="flex items-center gap-3 h-20 px-6 border-b border-white/5 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="font-black text-black text-xl">H</span>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white font-black tracking-tighter text-xl whitespace-nowrap"
              >
                HATAW <span className="text-amber-500 font-medium">ADMIN</span>
              </motion.span>
            )}
          </div>

          <Menu
            mode="inline"
            selectedKeys={[pathname.substring(1)]}
            items={menuItems}
            onClick={handleMenuClick}
            className="bg-transparent! pt-6 px-3 border-none! custom-sidebar-menu"
          />
        </Sider>

        {/* Mobile Drawer */}
        <Drawer
          placement="right"
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          width={280}
          closeIcon={null}
          styles={{ body: { padding: 0, backgroundColor: "#030712" } }}
        >
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black font-bold">H</div>
             <span className="text-white font-black text-xl">DASHBOARD</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            onClick={handleMenuClick}
            className="bg-transparent! pt-4 px-2"
          />
        </Drawer>

        {/* Main Area */}
        <Layout
          className="transition-all duration-300 bg-transparent!"
          style={{
            marginRight: contentMarginRight,
            width: isDesktop ? `calc(100% - ${contentMarginRight}px)` : "100%",
          }}
        >
          {/* Header - Optimized for RTL */}
          <Header className="sticky top-0 z-50 flex items-center justify-between h-20 px-6 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 leading-none!">
            
            {/* Right Side: Toggle & Search */}
            <div className="flex items-center gap-6">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:text-amber-500 text-slate-400 transition-all border border-white/5"
              />
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-white"
              />

              <div className="relative hidden md:flex items-center group">
                <Search
                  size={18}
                  className="absolute right-4 text-slate-500 group-focus-within:text-amber-500 transition-colors z-10"
                />
                <input
                  placeholder="گەڕان بۆ هەر شتێک..."
                  className="bg-white/[0.03] border border-white/10 rounded-2xl py-2.5 pr-12 pl-4 text-sm text-white outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 w-80 transition-all"
                />
              </div>
            </div>

            {/* Left Side: Profile & Notifications */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge count={5} size="small" color="#f59e0b" offset={[-2, 5]}>
                    <button className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-amber-500 hover:bg-white/10 transition-all border border-white/5">
                    <Bell size={20} />
                    </button>
                </Badge>
              </div>

              <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block" />

              <div className="flex items-center gap-3 pr-2 pl-1 py-1 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all cursor-pointer group">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-bold text-white tracking-tight">ئەدمین</span>
                  <span className="text-[10px] text-amber-500/80 font-black uppercase tracking-tighter">Super Admin</span>
                </div>
                <Avatar
                  size={44}
                  className="bg-gradient-to-tr from-amber-600 to-amber-400 shadow-lg shadow-amber-500/20 border-2 border-[#020617]"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                />
              </div>
            </div>
          </Header>

          <Content className="p-6 md:p-10 overflow-x-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 min-h-[calc(100vh-160px)] shadow-inner"
            >
              {children}
            </motion.div>
          </Content>
        </Layout>
      </Layout>

      <style jsx global>{`
        /* رفع تداخل‌های آنت دیزاین در حالت RTL */
        .ant-layout-sider-children {
            display: flex;
            flex-direction: column;
        }
        
        .custom-sidebar-menu { 
            border: none !important; 
        }

        .custom-sidebar-menu .ant-menu-item {
          height: 52px !important;
          margin-bottom: 8px !important;
          color: #94a3b8 !important;
          border-radius: 14px !important;
          display: flex !important;
          align-items: center !important;
        }

        .custom-sidebar-menu .ant-menu-item-selected {
          background: linear-gradient(270deg, rgba(245, 158, 11, 0.15) 0%, transparent 100%) !important;
          color: #f59e0b !important;
          font-weight: 800 !important;
          border-left: none !important;
          border-right: 4px solid #f59e0b !important;
        }

        .custom-sidebar-menu .ant-menu-submenu-title { 
            color: #94a3b8 !important; 
            height: 52px !important;
            display: flex !important;
            align-items: center !important;
        }

        .custom-sidebar-menu .ant-menu-item:hover,
        .custom-sidebar-menu .ant-menu-submenu-title:hover {
          color: #f59e0b !important;
          background: rgba(255, 255, 255, 0.03) !important;
        }

        .ant-menu-sub { 
            background: rgba(0,0,0,0.2) !important; 
            border-radius: 14px; 
            margin: 4px 0 !important;
        }

        /* استایل اسکرول بار */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default LayoutComponentDashbord;