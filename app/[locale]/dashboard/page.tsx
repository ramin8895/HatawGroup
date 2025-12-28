"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Search,
  Users,
  Calendar,
  Trophy,
  TrendingUp,
  Activity,
  CreditCard,
  Bell,
  ArrowUpRight,
} from "lucide-react";

// --- Data ---
const activityData = [
  { day: "شەممە", users: 120 },
  { day: "یەکشەممە", users: 200 },
  { day: "دووشەممە", users: 150 },
  { day: "سێشەممە", users: 320 },
  { day: "چوارشەممە", users: 250 },
  { day: "پێنجشەممە", users: 190 },
  { day: "هەینی", users: 240 },
];

const pieData = [
  { name: "کۆدی ڕاستەوخۆ", value: 864 },
  { name: "تۆمارکردنی ئاسایی", value: 416 },
];

// پالت رنگ طلایی و نقره‌ای
const COLORS = ["#D4AF37", "#E2E8F0"];

// --- Components ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-xl p-3! border border-[#D4AF37]/20 shadow-xl rounded-2xl text-[10px] text-slate-900 z-50">
        <p className="opacity-60 mb-1! font-bold">{label}</p>
        <p className="text-[#D4AF37] font-black">
          {payload[0].value.toLocaleString()} بەکارهێنەر
        </p>
      </div>
    );
  }
  return null;
};

export default function ModernDashboard() {
  const [search, setSearch] = useState("");

  const stats = [
    { label: "کۆدی ڕووداو", value: "EV2025-AX19", icon: CreditCard, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" },
    { label: "کۆتایی وادە", value: "20 Jan 2026", icon: Calendar, color: "text-slate-600", bg: "bg-slate-100" },
    { label: "کۆی خەڵاتەکان", value: "$50,000", icon: Trophy, color: "text-[#B8860B]", bg: "bg-[#B8860B]/10" },
  ];

  const mainStats = [
    { label: "بەکارهێنەرانی نوێ", value: 1280, trend: "+12.5%", icon: Users, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" },
    { label: "تۆمارکردنی کۆد", value: 864, trend: "+8.2%", icon: Activity, color: "text-slate-700", bg: "bg-slate-100" },
    { label: "پلەی بەشداربووان", value: 432, trend: "+5.1%", icon: Trophy, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" },
  ];

  const topUsers = [
    { name: "عەلی ڕەزایی", score: 980, rank: 1, avatar: "bg-[#D4AF37]/20 text-[#D4AF37]" },
    { name: "مەهدی کازم", score: 920, rank: 2, avatar: "bg-slate-100 text-slate-500" },
    { name: "نەگار ئەحمەدی", score: 885, rank: 3, avatar: "bg-slate-100 text-slate-500" },
    { name: "ڕەزا ئیسماعیلی", score: 870, rank: 4, avatar: "bg-slate-100 text-slate-500" },
  ];

  return (
    <div className="min-h-screen! bg-[#F8F9FA] text-slate-600 p-4 md:p-8 lg:p-12 font-sans relative overflow-hidden" dir="rtl">
      
      {/* هاله‌های نوری ملایم طلایی */}
      <div className="absolute top-0! right-0! w-[500px]! h-[500px]! bg-[#D4AF37]/5! blur-[150px]! rounded-full! pointer-events-none"></div>
      <div className="absolute bottom-0! left-0! w-[400px]! h-[400px]! bg-slate-200/50! blur-[120px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! space-y-10!">
        
        {/* --- Top Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6!">
          <div>
            <h1 className="text-3xl! md:text-4xl! font-black text-slate-900 tracking-tight!">
              داشبۆردی <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B]">کۆنترۆڵ</span>
            </h1>
            <p className="text-slate-500 text-sm! mt-2!">چاودێری و شیکردنەوەی داتاکان لە کاتی ڕاستەقینەدا</p>
          </div>
          
          <div className="flex items-center gap-4!">
            <div className="bg-white! p-2! rounded-xl! border border-slate-200! text-slate-400 cursor-pointer hover:text-[#D4AF37] shadow-sm transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-white"></span>
            </div>
            <div className="flex items-center gap-2 bg-white! px-4! py-2! rounded-full! border border-[#D4AF37]/30! shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-black text-[#B8860B] uppercase tracking-widest">Live System</span>
            </div>
          </div>
        </div>

        {/* --- Quick Info Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6!">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem]! p-6! border border-slate-100! shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-slate-400 font-bold mb-2! uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-black text-slate-900 font-mono">{item.value}</p>
              </div>
              <div className={`w-12! h-12! rounded-2xl! ${item.bg} ${item.color} flex items-center justify-center`}>
                <item.icon size={22} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Main Stats & Charts --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8!">
          
          {/* Main Activity Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-100! rounded-[2.5rem]! p-8! shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8!">
                <h2 className="text-xl! font-black text-slate-900 flex items-center gap-3!">
                  <TrendingUp className="text-[#D4AF37]" /> چالاکی هەفتانە
                </h2>
                <select className="bg-slate-50! border border-slate-100 rounded-lg text-xs! px-3! py-1! text-slate-500 outline-none">
                  <option>7 ڕۆژی ڕابردوو</option>
                  <option>30 ڕۆژی ڕابردوو</option>
                </select>
              </div>
              
              <div className="h-[300px]! w-full!" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000005" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="users" stroke="#D4AF37" strokeWidth={4} fill="url(#goldGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Registration Source (Pie) */}
          <div className="bg-white border border-slate-100! rounded-[2.5rem]! p-8! shadow-sm flex flex-col! items-center! justify-center!">
            <h2 className="text-lg! font-black text-slate-900 mb-6!">سەرچاوەی تۆمارکردن</h2>
            <div className="w-full h-[240px]! relative" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0! flex flex-col! items-center! justify-center! pointer-events-none">
                <span className="text-3xl! font-black text-slate-900">68%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">کۆدی چالاک</span>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4! mt-6!">
              {pieData.map((item, i) => (
                <div key={i} className="bg-slate-50! p-3! rounded-2xl! text-center border border-slate-100">
                  <p className="text-[10px] text-slate-400 mb-1! font-bold">{item.name}</p>
                  <p className="text-sm! font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Row: Stats & Users --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8!">
          
          {/* Mini Stat Cards */}
          <div className="lg:col-span-1 space-y-4!">
            {mainStats.map((stat, i) => (
              <div key={i} className="bg-white p-5! rounded-[2rem]! border border-slate-100! shadow-sm flex items-center gap-4!">
                <div className={`w-12! h-12! rounded-2xl! ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2!">
                    <p className="text-xl! font-black text-slate-900">{stat.value.toLocaleString()}</p>
                    <span className="text-[10px] text-[#D4AF37] font-bold">{stat.trend}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* User Table Card */}
          <div className="lg:col-span-3 bg-white border border-slate-100! rounded-[2.5rem]! p-8! shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8! gap-4!">
              <h2 className="text-xl! font-black text-slate-900">باشترین بەکارهێنەران</h2>
              <div className="relative w-full sm:w-72!">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="گەڕان بۆ ناو..." 
                  className="w-full bg-slate-50! border border-slate-200! rounded-2xl! py-3! pr-12! pl-4! text-sm! outline-none focus:border-[#D4AF37] transition-all text-slate-900"
                />
              </div>
            </div>

            <div className="overflow-x-auto!">
              <table className="w-full text-right!">
                <thead>
                  <tr className="text-slate-400 text-xs! border-b border-slate-50!">
                    <th className="pb-4! font-bold">پلە</th>
                    <th className="pb-4! font-bold">بەکارهێنەر</th>
                    <th className="pb-4! font-bold text-left!">نمرەی کۆتایی</th>
                    <th className="pb-4! font-bold text-left!">کارەکان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topUsers.map((user, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-5!">
                        <span className={`w-8! h-8! rounded-lg flex items-center justify-center text-xs font-black ${idx === 0 ? 'bg-[#D4AF37] text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {user.rank}
                        </span>
                      </td>
                      <td className="py-5!">
                        <div className="flex items-center gap-3!">
                          <div className={`w-10! h-10! rounded-full flex items-center justify-center font-black text-xs ${user.avatar}`}>
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-700 group-hover:text-[#D4AF37] transition-colors">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-5! text-left font-mono font-black text-[#D4AF37]">
                        {user.score}
                      </td>
                      <td className="py-5! text-left!">
                        <button className="p-2! bg-slate-50 rounded-lg! border border-slate-100! hover:bg-[#D4AF37] hover:text-white transition-all">
                          <ArrowUpRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}