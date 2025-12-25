"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trophy,
  Calendar,
  Settings,
  Zap,
  Star,
  Edit3,
  Mail,
  LayoutDashboard,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetEventUser } from "@/api/EventUserService/useRequest";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  const { data: Sessions } = useSession();
  const { data: useGetEventUserData, isFetched: useGetEventUserISFetched } =
    useGetEventUser();
  console.log(useGetEventUserData);
  const stats = [
    {
      label: "خاڵی گشتی",
      value: "2,450",
      icon: <Star size={22} />,
    },
    {
      label: "چالاکییەکان",
      value: "12",
      icon: <Calendar size={22} />,
    },
    {
      label: "ڕیزبەندی",
      value: "#42",
      icon: <Trophy size={22} />,
    },
    {
      label: "کۆدی چالاک",
      value: "5",
      icon: <Zap size={22} />,
    },
  ];

  return (
    <main
      className="min-h-screen! bg-[#121212] text-[#FFFFFF] p-4! md:p-10! font-sans selection:bg-[#D4AF37]/30"
      dir="rtl"
    >
      {/* Background Glows */}
      <div className="fixed inset-0! overflow-hidden pointer-events-none">
        <div className="absolute top-0! left-0! w-[500px]! h-[500px]! bg-[#D4AF37]/5! blur-[150px]! rounded-full!"></div>
        <div className="absolute bottom-0! right-0! w-[300px]! h-[300px]! bg-[#E0E0E0]/5! blur-[120px]! rounded-full!"></div>
      </div>

      <div className="max-w-7xl! mx-auto! relative z-10!">
        {/* Header Section */}
        <header className="flex! flex-col! md:flex-row! justify-between! items-center! mb-16! gap-8!">
          <div className="flex! items-center! gap-6!">
            <div className="relative group">
              <div className="absolute -inset-1! bg-gradient-to-tr from-[#D4AF37] to-[#F5E1A4] rounded-[2.2rem]! blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-20! h-20! rounded-[2rem]! bg-[#1A1A1A]! border border-[#D4AF37]/30! flex! items-center! justify-center! shadow-2xl!">
                <User size={36} className="text-[#D4AF37]!" />
              </div>
            </div>
            <div className="text-right!">
              <h1 className="text-4xl! font-black! text-white! tracking-tight! mb-2!">
                پانێڵی بەکارهێنەر
              </h1>
              <p className="text-[#E0E0E0]/40! font-medium! flex items-center gap-2!">
                بەخێربێیت بۆ جیهانی{" "}
                <span className="text-[#D4AF37]! font-black">Hataw Group</span>
              </p>
            </div>
          </div>

          <div className="flex! flex-wrap! justify-center! gap-4!">
            <button
              onClick={() => router.push("/")}
              className="px-6! py-3.5! bg-[#FFFFFF]/[0.03]! border! border-[#E0E0E0]/10! text-[#E0E0E0]/70! rounded-2xl! font-bold! hover:bg-[#FFFFFF]/[0.08]! hover:text-white! transition-all! flex! items-center! gap-2!"
            >
              <ArrowLeft size={18} /> گەڕانەوە
            </button>
            <button className="px-6! py-3.5! bg-[#FFFFFF]/[0.03]! border! border-[#E0E0E0]/10! text-[#E0E0E0]/70! rounded-2xl! font-bold! hover:bg-[#FFFFFF]/[0.08]! transition-all! flex! items-center! gap-2!">
              <Settings size={18} /> ڕێکخستن
            </button>
            <button
              onClick={() => signOut()}
              className="px-8! py-3.5! bg-[#D4AF37]! text-[#121212]! rounded-2xl! font-black! hover:scale-105! active:scale-95! transition-all! shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)]! flex items-center gap-2!"
            >
              <LogOut size={18} /> چوونە دەرەوە
            </button>
          </div>
        </header>

        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-10!">
          {/* Sidebar - Navigation */}
          <aside className="lg:col-span-3! space-y-4!">
            {[
              {
                id: "overview",
                label: "داشبۆرد",
                icon: <LayoutDashboard size={20} />,
              },
              {
                id: "events",
                label: "چالاکییەکانم",
                icon: <Calendar size={20} />,
              },
              {
                id: "edit",
                label: "گۆڕینی پرۆفایل",
                icon: <Edit3 size={20} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full! flex! items-center! justify-between! p-5! rounded-[1.5rem]! font-bold! transition-all! duration-300! border! ${
                  activeTab === tab.id
                    ? "bg-gradient-to-l! from-[#D4AF37]/20! to-[#D4AF37]/5! border-[#D4AF37]/40! text-[#D4AF37]! shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)]!"
                    : "bg-[#FFFFFF]/[0.02]! border-transparent! text-[#E0E0E0]/40! hover:bg-[#FFFFFF]/[0.05]! hover:text-[#E0E0E0]/80!"
                }`}
              >
                <div className="flex! items-center! gap-4!">
                  {tab.icon}
                  <span className="text-lg!">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="w-2! h-2! bg-[#D4AF37]! rounded-full! shadow-[0_0_10px_#D4AF37]!"
                  />
                )}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9!">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10!"
                >
                  {/* Stats Cards */}
                  <div className="grid! grid-cols-2! md:grid-cols-4! gap-5!">
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[#FFFFFF]/[0.02]! border! border-[#E0E0E0]/5! p-8! rounded-[2.5rem]! text-center! hover:border-[#D4AF37]/30 transition-all duration-500 group!"
                      >
                        <div className="w-14! h-14! bg-[#D4AF37]/5! border border-[#D4AF37]/10! rounded-2xl! flex! items-center! justify-center! mx-auto! mb-6! text-[#D4AF37]! group-hover:scale-110! group-hover:bg-[#D4AF37]/20! transition-all!">
                          {stat.icon}
                        </div>
                        <p className="text-[#E0E0E0]/30! text-[10px]! font-black! uppercase! tracking-widest! mb-2!">
                          {stat.label}
                        </p>
                        <h4 className="text-3xl! font-black! text-white!">
                          {stat.value}
                        </h4>
                      </div>
                    ))}
                  </div>

                  {/* Activity Table */}
                  <div className="bg-[#FFFFFF]/[0.02]! border! border-[#E0E0E0]/5! rounded-[3rem]! p-10! relative overflow-hidden!">
                    <div className="absolute top-0! right-0! w-64! h-64! bg-[#D4AF37]/5! blur-[80px]! rounded-full! pointer-events-none!"></div>

                    <h3 className="text-2xl! font-black! mb-8! flex! items-center! gap-3! text-white!">
                      <Trophy className="text-[#D4AF37]" size={24} /> دواین
                      چالاکییەکان
                    </h3>

                    <div className="space-y-4!">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="flex! items-center! justify-between! p-6! bg-[#1A1A1A]/50! border! border-[#E0E0E0]/5! rounded-2xl! group! hover:border-[#D4AF37]/20! transition-all! duration-500!"
                        >
                          <div className="flex! items-center! gap-5!">
                            <div className="w-12! h-12! bg-[#D4AF37]/10! rounded-xl! flex! items-center! justify-center! text-[#D4AF37]! group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]!">
                              <Star size={20} />
                            </div>
                            <div className="text-right!">
                              <h5 className="font-bold! text-lg! text-[#E0E0E0] group-hover:text-white!">
                                کێبڕکێی بڕاندینگ {i + 1}
                              </h5>
                              <p className="text-xs! text-[#E0E0E0]/30! font-medium!">
                                بەروار: ٢٠ی ئایاری ٢٠٢٥
                              </p>
                            </div>
                          </div>
                          <div className="text-[#D4AF37]! font-black! text-lg!">
                            +200 خاڵ
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "edit" && (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#FFFFFF]/[0.02]! border! border-[#E0E0E0]/5! rounded-[3.5rem]! p-10! md:p-16! relative overflow-hidden!"
                >
                  <div className="relative z-10!">
                    <h3 className="text-3xl! font-black! mb-10! text-white!">
                      گۆڕینی زانیارییەکان
                    </h3>
                    <form className="grid! grid-cols-1! md:grid-cols-2! gap-8!">
                      <div className="space-y-3!">
                        <label className="text-xs! font-black! text-[#D4AF37]! uppercase! tracking-widest! pr-2!">
                          ناوی بەکارهێنەر
                        </label>
                        <div className="relative!">
                          <User
                            className="absolute! right-5! top-1/2! -translate-y-1/2! text-[#E0E0E0]/20!"
                            size={20}
                          />
                          <input
                            type="text"
                            placeholder="Hataw_User"
                            className="w-full! bg-[#121212]! border! border-[#E0E0E0]/10! rounded-2xl! py-5! pr-14! pl-5! text-white! outline-none! focus:border-[#D4AF37]! transition-all! placeholder:text-white/10!"
                          />
                        </div>
                      </div>
                      <div className="space-y-3!">
                        <label className="text-xs! font-black! text-[#D4AF37]! uppercase! tracking-widest! pr-2!">
                          ئیمەیڵ
                        </label>
                        <div className="relative!">
                          <Mail
                            className="absolute! right-5! top-1/2! -translate-y-1/2! text-[#E0E0E0]/20!"
                            size={20}
                          />
                          <input
                            type="email"
                            placeholder="user@hataw.group"
                            className="w-full! bg-[#121212]! border! border-[#E0E0E0]/10! rounded-2xl! py-5! pr-14! pl-5! text-white! outline-none! focus:border-[#D4AF37]! transition-all! placeholder:text-white/10!"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2! pt-6!">
                        <button className="w-full! md:w-auto! px-14! py-5! bg-[#D4AF37]! text-[#121212]! rounded-2xl! font-black! text-lg! hover:scale-105! hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.3)]! transition-all!">
                          پاشەکەوتکردنی گۆڕانکارییەکان
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
