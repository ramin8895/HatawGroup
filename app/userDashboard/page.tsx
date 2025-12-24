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

  const stats = [
    {
      label: "خاڵی گشتی",
      value: "2,450",
      icon: <Star className="text-[#D4AF37]" />,
      color: "bg-[#D4AF37]/10",
    },
    {
      label: "چالاکییەکان",
      value: "12",
      icon: <Calendar className="text-[#D4AF37]" />,
      color: "bg-[#D4AF37]/10",
    },
    {
      label: "ڕیزبەندی",
      value: "#42",
      icon: <Trophy className="text-[#D4AF37]" />,
      color: "bg-[#D4AF37]/10",
    },
    {
      label: "کۆدی چالاک",
      value: "5",
      icon: <Zap className="text-[#D4AF37]" />,
      color: "bg-[#D4AF37]/10",
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
            <div className="w-20! h-20! rounded-[2rem]! bg-gradient-to-br! from-[#D4AF37]! to-[#B8860B]! flex! items-center! justify-center! shadow-xl! shadow-[#D4AF37]/20!">
              <User size={40} className="text-black!" />
            </div>
            <div className="text-right!">
              <h1 className="text-3xl! font-black! mb-1!">پانێڵی بەکارهێنەر</h1>
              <p className="text-slate-500! font-medium!">
                بەخێربێیت، <span className="text-[#D4AF37]!">کاربەری ئازیز</span>
              </p>
            </div>
          </div>

          <div className="flex! gap-3!">
            <button className="px-6! py-3! bg-white/5! border! border-white/10! rounded-2xl! font-bold! hover:bg-white/10! transition-all! flex! items-center! gap-2!">
              <Settings size={18} /> ڕێکخستن
            </button>
            <button onClick={()=>router.push("/")} className="px-6! py-3! bg-white/5! border! border-white/10! rounded-2xl! font-bold! hover:bg-white/10! transition-all! flex! items-center! gap-2!">
              <ArrowLeft size={18} /> گەڕانەوە
            </button>
            <button
              onClick={() => signOut()}
              className="px-6! py-3! bg-gradient-to-r! from-[#D4AF37]! to-[#B8860B]! text-black! rounded-2xl! font-bold! hover:opacity-90! transition-all! shadow-lg! shadow-[#D4AF37]/20!"
            >
              چوونە دەرەوە
            </button>
          </div>
        </header>

        <div className="grid! grid-cols-1! lg:grid-cols-12! gap-8!">
          {/* Sidebar */}
          <aside className="lg:col-span-3! space-y-3!">
            {[
              { id: "overview", label: "پیشاندەر", icon: <LayoutDashboard size={20} /> },
              { id: "events", label: "چالاکییەکانم", icon: <Calendar size={20} /> },
              { id: "edit", label: "گۆڕینی زانیاری", icon: <Edit3 size={20} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full! flex! items-center! justify-between! p-4! rounded-2xl! font-bold! transition-all! ${
                  activeTab === tab.id
                    ? "bg-[#D4AF37]! text-black! shadow-lg! shadow-[#D4AF37]/10!"
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

          {/* Main Content */}
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
                      <h4 className="text-2xl! font-black! text-white!">{stat.value}</h4>
                    </div>
                  ))}
                </div>

                {/* Activity List */}
                <div className="bg-white/[0.03]! border! border-white/5! rounded-[3rem]! p-8!">
                  <h3 className="text-xl! font-black! mb-6! flex! items-center! gap-2!">
                    <Trophy className="text-[#D4AF37]" /> دواین چالاکییەکان
                  </h3>
                  <div className="space-y-4!">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="flex! items-center! justify-between! p-5! bg-white/[0.02]! border! border-white/5! rounded-2xl! group! hover:bg-white/[0.04]! transition-all!"
                      >
                        <div className="flex! items-center! gap-4!">
                          <div className="w-12! h-12! bg-[#D4AF37]/10! rounded-xl! flex! items-center! justify-center! text-[#D4AF37]!">
                            <Star size={20} />
                          </div>
                          <div className="text-right!">
                            <h5 className="font-bold!">کێبڕکێی بڕاندینگ {i + 1}</h5>
                            <p className="text-xs! text-slate-500!">بەروار: 2024/05/12</p>
                          </div>
                        </div>
                        <div className="text-[#D4AF37]! font-black!">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.03]! border! border-white/5! rounded-[3rem]! p-8! md:p-12!"
              >
                <h3 className="text-2xl! font-black! mb-8!">گۆڕینی زانیارییەکان</h3>
                <form className="grid! grid-cols-1! md:grid-cols-2! gap-6!">
                  <div className="space-y-2!">
                    <label className="text-sm! font-bold! text-slate-400! pr-2!">ناوی بەکارهێنەر</label>
                    <div className="relative!">
                      <User className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500!" size={18} />
                      <input
                        type="text"
                        placeholder="User123"
                        className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! outline-none! focus:border-[#D4AF37]/50! transition-all!"
                      />
                    </div>
                  </div>
                  <div className="space-y-2!">
                    <label className="text-sm! font-bold! text-slate-400! pr-2!">ئیمەیڵ</label>
                    <div className="relative!">
                      <Mail className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500!" size={18} />
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! outline-none! focus:border-[#D4AF37]/50! transition-all!"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2! pt-4!">
                    <button className="w-full! md:w-auto! px-10! py-4! bg-gradient-to-r! from-[#D4AF37]! to-[#B8860B]! text-black! rounded-2xl! font-black! shadow-xl! shadow-[#D4AF37]/10! transition-all!">
                      پاشەکەوتکردن
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