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
  MenuProps, // <--- ۱. این را اضافه کنید
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
  ChevronLeft,
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

  // ۲. در اینجا نوع آرایه را مشخص کنید: MenuProps['items']
  const menuItems: MenuProps['items'] = [
    { key: "dashboard", icon: <LayoutDashboard size={20} />, label: "داشبۆرد" },
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
          icon: <Crown size={18} />,
          label: "قرعەکێشی",
        },
      ],
    },
    {
      key: "customers",
      icon: <Users size={20} />,
      label: "کڕیارەکان",
      children: [
        { key: "dashboard/customers", label: "لیستی کڕیارەکان" },
        {
          key: "customers/groups",
          icon: <UserCog size={18} />,
          label: "گرووپەکان",
        },
        {
          key: "customers/vip",
          icon: <Crown size={18} />,
          label: "کڕیارە VIP",
        },
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
    // ۳. این خط قبلاً ارور می‌داد چون TS فکر می‌کرد type یک string معمولی است
    { type: "divider", className: "border-white/5 my-4" },
    {
      key: "dashboard/settings",
      icon: <Settings size={20} />,
      label: "ڕێکخستنەکان",
    },
    {
      key: "logout",
      icon: <LogOut size={20} />,
      label: "چوونەدەرەوە",
      className: "mt-auto! text-rose-400! hover:bg-rose-500/10!",
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
      theme={{
        algorithm: theme.darkAlgorithm,
        token: { colorPrimary: "#6366f1", borderRadius: 12 },
      }}
    >
      <Layout className="min-h-screen! bg-[#020617]!" dir="rtl">
        {/* Sidebar - Desktop */}
        <Sider
          width={280}
          collapsedWidth={80}
          collapsed={collapsed}
          trigger={null}
          className="hidden! lg:block! fixed! right-0! top-0! h-screen! z-50! bg-[#030712]/50! backdrop-blur-xl! border-l! border-white/5 shadow-2xl!"
          reverseArrow
        >
          <div className="flex items-center gap-3 h-20 px-6 border-b border-white/5 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-black text-white text-xl">H</span>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white font-black tracking-tighter text-xl whitespace-nowrap"
              >
                HATAW <span className="text-indigo-500 font-medium">GROUP</span>
              </motion.span>
            )}
          </div>

          <Menu
            mode="inline"
            selectedKeys={[pathname.substring(1)]}
            items={menuItems}
            onClick={handleMenuClick}
            className="bg-transparent! pt-4 px-3 border-none! custom-sidebar-menu"
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
          title={
            <div className="text-white font-black py-2">HATAW DASHBOARD</div>
          }
        >
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
          className="transition-all duration-300 bg-transparent"
          style={{
            marginRight: contentMarginRight,
            width: isDesktop ? `calc(100% - ${contentMarginRight}px)` : "100%",
          }}
        >
          <Header className="sticky top-0 z-40 flex items-center justify-between h-20 px-6 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400 transition-all border border-white/5"
              />
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-white"
              />

              {/* Modern Search */}
              <div className="relative hidden md:block group">
                <Search
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  placeholder="گەڕان بۆ هەر شتێک..."
                  className="bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pr-11 pl-4 text-xs text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] w-72 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge count={5} size="small" color="#6366f1" offset={[-2, 8]}>
                <div className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all border border-white/5">
                  <Bell size={20} />
                </div>
              </Badge>

              <div className="w-[1px] h-8 bg-white/10 mx-2 hidden sm:block" />

              <div className="flex items-center gap-3 pl-2 py-1 pr-1 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5">
                <div className="text-left hidden sm:block mr-2">
                  <p className="text-sm font-bold text-white leading-none text-right">
                    ئەدمین
                  </p>
                  <p className="text-[10px] text-indigo-400 mt-1 uppercase font-black text-right tracking-widest">
                    Super Admin
                  </p>
                </div>
                <Avatar
                  size={44}
                  className="bg-indigo-500 shadow-lg shadow-indigo-500/20 border-2 border-white/10"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                />
              </div>
            </div>
          </Header>

          <Content className="p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-80px)]">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>

      <style jsx global>{`
        .custom-sidebar-menu {
          border: none !important;
        }
        .custom-sidebar-menu .ant-menu-item {
          height: 50px !important;
          line-height: 50px !important;
          margin-bottom: 8px !important;
          font-weight: 500 !important;
          color: #94a3b8 !important;
        }
        .custom-sidebar-menu .ant-menu-item-selected {
          background: rgba(99, 102, 241, 0.15) !important;
          color: #818cf8 !important;
          font-weight: 700 !important;
          border-left: 3px solid #6366f1 !important;
        }
        .custom-sidebar-menu .ant-menu-submenu-title {
          color: #94a3b8 !important;
          height: 50px !important;
          line-height: 50px !important;
        }
        .custom-sidebar-menu .ant-menu-item:hover,
        .custom-sidebar-menu .ant-menu-submenu-title:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .ant-menu-sub {
          background: transparent !important;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default LayoutComponentDashbord;