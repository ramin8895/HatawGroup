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

const COLORS = ["#6366f1", "#e2e8f0"];

// --- Components ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#030712]/90 backdrop-blur-xl p-3! border border-white/10 shadow-2xl rounded-2xl text-[10px] text-white z-50">
        <p className="opacity-60 mb-1!">{label}</p>
        <p className="text-indigo-400 font-black">
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
    { label: "کۆدی ڕووداو", value: "EV2025-AX19", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "کۆتایی وادە", value: "20 Jan 2026", icon: Calendar, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "کۆی خەڵاتەکان", value: "$50,000", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const mainStats = [
    { label: "بەکارهێنەرانی نوێ", value: 1280, trend: "+12.5%", icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "تۆمارکردنی کۆد", value: 864, trend: "+8.2%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "پلەی بەشداربووان", value: 432, trend: "+5.1%", icon: Trophy, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const topUsers = [
    { name: "عەلی ڕەزایی", score: 980, rank: 1, avatar: "bg-blue-500/20 text-blue-400" },
    { name: "مەهدی کازم", score: 920, rank: 2, avatar: "bg-emerald-500/20 text-emerald-400" },
    { name: "نەگار ئەحمەدی", score: 885, rank: 3, avatar: "bg-rose-500/20 text-rose-400" },
    { name: "ڕەزا ئیسماعیلی", score: 870, rank: 4, avatar: "bg-slate-500/20 text-slate-400" },
  ];

  return (
    <div className="min-h-screen! bg-[#030712] text-slate-300 p-4 md:p-8 lg:p-12 font-sans relative overflow-hidden" dir="rtl">
      
      {/* هاله‌های نوری پس‌زمینه (Ambient Glow) */}
      <div className="absolute top-0! right-0! w-[500px]! h-[500px]! bg-indigo-600/10! blur-[150px]! rounded-full! pointer-events-none"></div>
      <div className="absolute bottom-0! left-0! w-[400px]! h-[400px]! bg-purple-600/10! blur-[120px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! space-y-10!">
        
        {/* --- Top Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6!">
          <div>
            <h1 className="text-3xl! md:text-4xl! font-black text-white tracking-tight!">
              داشبۆردی <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">کۆنترۆڵ</span>
            </h1>
            <p className="text-slate-500 text-sm! mt-2!">چاودێری و شیکردنەوەی داتاکان لە کاتی ڕاستەقینەدا</p>
          </div>
          
          <div className="flex items-center gap-4!">
            <div className="bg-white/5! p-2! rounded-xl! border border-white/10! text-slate-400 cursor-pointer hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#030712]"></span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10! px-4! py-2! rounded-full! border border-emerald-500/20!">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live System</span>
            </div>
          </div>
        </div>

        {/* --- Quick Info Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6!">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/[0.03] backdrop-blur-xl rounded-[2rem]! p-6! border border-white/5! flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-slate-500 font-bold mb-2! uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-black text-white font-mono">{item.value}</p>
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
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/5! rounded-[2.5rem]! p-8! relative overflow-hidden">
             <div className="flex justify-between items-center mb-8!">
                <h2 className="text-xl! font-black text-white flex items-center gap-3!">
                  <TrendingUp className="text-indigo-500" /> چالاکی هەفتانە
                </h2>
                <select className="bg-white/5! border-none rounded-lg text-xs! px-3! py-1! text-slate-400 outline-none">
                  <option>7 ڕۆژی ڕابردوو</option>
                  <option>30 ڕۆژی ڕابردوو</option>
                </select>
             </div>
             
             <div className="h-[300px]! w-full!" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={4} fill="url(#chartGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Registration Source (Pie) */}
          <div className="bg-white/[0.02] border border-white/5! rounded-[2.5rem]! p-8! flex flex-col! items-center! justify-center!">
            <h2 className="text-lg! font-black text-white mb-6!">سەرچاوەی تۆمارکردن</h2>
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
                <span className="text-3xl! font-black text-white">68%</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">کۆدی چالاک</span>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4! mt-6!">
              {pieData.map((item, i) => (
                <div key={i} className="bg-white/5! p-3! rounded-2xl! text-center">
                  <p className="text-[10px] text-slate-500 mb-1!">{item.name}</p>
                  <p className="text-sm! font-bold text-white">{item.value}</p>
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
              <div key={i} className="bg-white/[0.02] p-5! rounded-[2rem]! border border-white/5! flex items-center gap-4!">
                <div className={`w-12! h-12! rounded-2xl! ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2!">
                    <p className="text-xl! font-black text-white">{stat.value.toLocaleString()}</p>
                    <span className="text-[10px] text-emerald-400 font-bold">{stat.trend}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* User Table Card */}
          <div className="lg:col-span-3 bg-white/[0.02] border border-white/5! rounded-[2.5rem]! p-8!">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8! gap-4!">
              <h2 className="text-xl! font-black text-white">باشترین بەکارهێنەران</h2>
              <div className="relative w-full sm:w-72!">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="گەڕان بۆ ناو..." 
                  className="w-full bg-white/5! border border-white/10! rounded-2xl! py-3! pr-12! pl-4! text-sm! outline-none focus:border-indigo-500 transition-all text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto!">
              <table className="w-full text-right!">
                <thead>
                  <tr className="text-slate-500 text-xs! border-b border-white/5!">
                    <th className="pb-4! font-bold">پلە</th>
                    <th className="pb-4! font-bold">بەکارهێنەر</th>
                    <th className="pb-4! font-bold text-left!">نمرەی کۆتایی</th>
                    <th className="pb-4! font-bold text-left!">کارەکان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {topUsers.map((user, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-5!">
                        <span className={`w-8! h-8! rounded-lg flex items-center justify-center text-xs font-black ${idx === 0 ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-slate-400'}`}>
                          {user.rank}
                        </span>
                      </td>
                      <td className="py-5!">
                        <div className="flex items-center gap-3!">
                          <div className={`w-10! h-10! rounded-full flex items-center justify-center font-black text-xs ${user.avatar}`}>
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-5! text-left font-mono font-black text-indigo-400">
                        {user.score}
                      </td>
                      <td className="py-5! text-left!">
                        <button className="p-2! bg-white/5 rounded-lg! hover:bg-indigo-600 transition-all">
                          <ArrowUpRight size={16} className="text-white" />
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