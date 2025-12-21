"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Trophy,
  Calendar,
  Settings,
  Zap,
  Star,
  ChevronLeft,
  Edit3,
  Mail,
  Phone,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
const router = useRouter();
  // دیتای تستی برای نمایش
  const stats = [
    {
      label: "امتیاز کل",
      value: "2,450",
      icon: <Star className="text-yellow-400" />,
      color: "bg-yellow-400/10",
    },
    {
      label: "رویدادهای شرکت شده",
      value: "12",
      icon: <Calendar className="text-blue-400" />,
      color: "bg-blue-400/10",
    },
    {
      label: "رتبه در جدول",
      value: "#42",
      icon: <Trophy className="text-indigo-400" />,
      color: "bg-indigo-400/10",
    },
    {
      label: "کدهای فعال",
      value: "5",
      icon: <Zap className="text-emerald-400" />,
      color: "bg-emerald-400/10",
    },
  ];

  return (
    <main
      className="min-h-screen! bg-[#030712]! text-white! p-4! md:p-10! font-sans"
      dir="rtl"
    >
      <div className="max-w-7xl! mx-auto!">
        {/* Header Section */}
        <header className="flex! flex-col! md:flex-row! justify-between! items-center! mb-12! gap-6!">
          <div className="flex! items-center! gap-4!">
            <div className="w-20! h-20! rounded-[2rem]! bg-gradient-to-br! from-indigo-600! to-purple-600! flex! items-center! justify-center! shadow-xl! shadow-indigo-500/20!">
              <User size={40} className="text-white!" />
            </div>
            <div className="text-right!">
              <h1 className="text-3xl! font-black! mb-1!">پنل کاربری</h1>
              <p className="text-slate-500! font-medium!">
                خوش آمدی، <span className="text-white!">کاربر عزیز</span>
              </p>
            </div>
          </div>

          <div className="flex! gap-3!">
            <button className="px-6! py-3! bg-white/5! border! border-white/10! rounded-2xl! font-bold! hover:bg-white/10! transition-all! flex! items-center! gap-2!">
              <Settings size={18} /> تنظیمات
            </button>
            <button onClick={()=>router.push("/")} className="px-6! py-3! bg-white/5! border! border-white/10! rounded-2xl! font-bold! hover:bg-white/10! transition-all! flex! items-center! gap-2!">
              <ArrowLeft size={18} /> برگشت به سایت
            </button>
            <button
              onClick={() => signOut()}
              className="px-6! py-3! bg-indigo-600! rounded-2xl! font-bold! hover:bg-indigo-500! transition-all! shadow-lg! shadow-indigo-600/20!"
            >
              خروج از حساب
            </button>
          </div>
        </header>

        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8!">
          {/* Sidebar / Menu */}
          <aside className="lg:col-span-3! space-y-3!">
            {[
              {
                id: "overview",
                label: "پیشخوان",
                icon: <LayoutDashboard size={20} />,
              },
              {
                id: "events",
                label: "رویدادهای من",
                icon: <Calendar size={20} />,
              },
              { id: "edit", label: "اصلاح مشخصات", icon: <Edit3 size={20} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full! flex! items-center! justify-between! p-4! rounded-2xl! font-bold! transition-all! ${
                  activeTab === tab.id
                    ? "bg-indigo-600! text-white! shadow-lg! shadow-indigo-600/20!"
                    : "bg-white/[0.03]! text-slate-400! hover:bg-white/[0.06]!"
                }`}
              >
                <div className="flex! items-center! gap-3!">
                  {tab.icon}
                  {tab.label}
                </div>
                <ChevronLeft
                  size={16}
                  className={activeTab === tab.id ? "opacity-100" : "opacity-0"}
                />
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9! space-y-8!">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8!"
              >
                {/* Stats Grid */}
                <div className="grid! grid-cols-2! md:grid-cols-4! gap-4!">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.03]! border! border-white/5! p-6! rounded-[2.5rem]! text-center!"
                    >
                      <div
                        className={`w-12! h-12! ${stat.color} rounded-2xl! flex! items-center! justify-center! mx-auto! mb-4!`}
                      >
                        {stat.icon}
                      </div>
                      <p className="text-slate-500! text-sm! font-bold! mb-1!">
                        {stat.label}
                      </p>
                      <h4 className="text-2xl! font-black!">{stat.value}</h4>
                    </div>
                  ))}
                </div>

                {/* Recent Activity / Events */}
                <div className="bg-white/[0.03]! border! border-white/5! rounded-[3rem]! p-8!">
                  <h3 className="text-xl! font-black! mb-6! flex! items-center! gap-2!">
                    <Trophy className="text-indigo-400" /> آخرین رویدادهای شرکت
                    شده
                  </h3>
                  <div className="space-y-4!">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="flex! items-center! justify-between! p-5! bg-white/[0.02]! border! border-white/5! rounded-2xl! group! hover:bg-white/[0.04]! transition-all!"
                      >
                        <div className="flex! items-center! gap-4!">
                          <div className="w-12! h-12! bg-indigo-600/20! rounded-xl! flex! items-center! justify-center! text-indigo-400!">
                            <Star size={20} />
                          </div>
                          <div className="text-right!">
                            <h5 className="font-bold!">
                              چالش برندینگ شماره {i + 1}
                            </h5>
                            <p className="text-xs! text-slate-500!">
                              تاریخ: ۱۴۰۲/۱۰/۲۵
                            </p>
                          </div>
                        </div>
                        <div className="text-indigo-400! font-black!">
                          +۲۰۰ امتیاز
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "edit" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.03]! border! border-white/5! rounded-[3rem]! p-8! md:p-12!"
              >
                <h3 className="text-2xl! font-black! mb-8!">
                  ویرایش اطلاعات کاربری
                </h3>
                <form className="grid! grid-cols-1! md:grid-cols-2! gap-6!">
                  <div className="space-y-2!">
                    <label className="text-sm! font-bold! text-slate-400! pr-2!">
                      نام کاربری
                    </label>
                    <div className="relative!">
                      <User
                        className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500!"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="User123"
                        className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! outline-none! focus:border-indigo-500! transition-all!"
                      />
                    </div>
                  </div>
                  <div className="space-y-2!">
                    <label className="text-sm! font-bold! text-slate-400! pr-2!">
                      ایمیل
                    </label>
                    <div className="relative!">
                      <Mail
                        className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500!"
                        size={18}
                      />
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! outline-none! focus:border-indigo-500! transition-all!"
                      />
                    </div>
                  </div>
                  <div className="space-y-2!">
                    <label className="text-sm! font-bold! text-slate-400! pr-2!">
                      شماره تماس
                    </label>
                    <div className="relative!">
                      <Phone
                        className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500!"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="09123456789"
                        className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! outline-none! focus:border-indigo-500! transition-all!"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2! pt-4!">
                    <button className="w-full! md:w-auto! px-10! py-4! bg-indigo-600! hover:bg-indigo-500! text-white! rounded-2xl! font-black! shadow-xl! shadow-indigo-600/20! transition-all!">
                      ذخیره تغییرات
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
