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
} from "lucide-react";

// --- Data (same as before) ---
const activityData = [
  { day: "Saturday", users: 120 },
  { day: "Sunday", users: 200 },
  { day: "Monday", users: 150 },
  { day: "Tuesday", users: 320 },
  { day: "Wednesday", users: 250 },
  { day: "Thursday", users: 190 },
  { day: "Friday", users: 240 },
];

const pieData = [
  { name: "Code Entry", value: 864 },
  { name: "Regular Entry", value: 416 },
];

const COLORS = ["#8b5cf6", "#e2e8f0"];

// --- Components ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-3! border border-indigo-100 shadow-xl rounded-xl text-xs font-medium text-slate-700 z-50">
        <p className="mb-1 text-slate-500">{label}</p>
        <p className="text-indigo-600 font-bold">
          {payload[0].value} users
        </p>
      </div>
    );
  }
  return null;
};

export default function ModernDashboard() {
  const [search, setSearch] = useState("");

  const eventCode = "EV2025-AX19";
  const eventEnd = "Jan 20, 2026";
  const eventPrize = "$50,000";

  const stats = [
    { label: "New Users", value: 1280, icon: Users, color: "text-violet-600", bg: "bg-violet-100", gradient: "from-violet-500 to-purple-600" },
    { label: "Code Entries", value: 864, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100", gradient: "from-emerald-400 to-teal-500" },
    { label: "Participants", value: 432, icon: Trophy, color: "text-amber-600", bg: "bg-amber-100", gradient: "from-amber-400 to-orange-500" },
  ];

  const topUsers = [
    { name: "Ali Rezaei", score: 980, rank: 1, avatar: "bg-blue-200" },
    { name: "Mehdi Kazemi", score: 920, rank: 2, avatar: "bg-emerald-200" },
    { name: "Negar Ahmadi", score: 885, rank: 3, avatar: "bg-rose-200" },
    { name: "Reza Esmaeili", score: 870, rank: 4, avatar: "bg-slate-200" },
    { name: "Zahra Mohammadi", score: 860, rank: 5, avatar: "bg-indigo-200" },
  ];

  const filteredUsers = topUsers.filter((u) => u.name.includes(search.trim()));

  return (
    <div className="w-full h-full bg-slate-50/50 p-4 md:p-6 lg:p-8 font-sans" dir="ltr">
      
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[80px]" />
         <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-purple-200/30 blur-[60px]" />
      </div>

      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl! md:text-3xl! font-black text-slate-800">
              Campaign <span className="text-indigo-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1!">Live Performance Report</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-600">System Active</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            { label: "Event Code", val: eventCode, icon: CreditCard, color: "text-blue-500" },
            { label: "End Date", val: eventEnd, icon: Calendar, color: "text-pink-500" },
            { label: "Prize", val: eventPrize, icon: Trophy, color: "text-amber-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80! backdrop-blur rounded-2xl! p-5! border border-white/60 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
            >
              <div>
                 <p className="text-xs text-slate-400 font-medium mb-1!">{item.label}</p>
                 <p className="text-lg font-bold text-slate-800 font-mono dir-ltr">{item.val}</p>
              </div>
              <div className={`p-3! rounded-xl bg-slate-50 ${item.color}`}>
                <item.icon size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4! m-4!">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden bg-white rounded-2xl p-5! border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4!">
                <div className={`p-2.5! rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2! py-1! rounded-lg">+12% Growth</span>
              </div>
              <div>
                 <p className="text-2xl font-black text-slate-800">{stat.value.toLocaleString()}</p>
                 <p className="text-xs text-slate-400 font-bold mt-1!">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6!">
          {/* Main Chart */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6! shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6! flex items-center gap-2">
               <TrendingUp size={18} className="text-indigo-500"/>
               Weekly Activity
            </h2>
            <div className="h-[250px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl! p-1! shadow-sm border border-slate-100 flex flex-col justify-center items-center">
             <h2 className="text-lg font-bold! text-slate-800! text-center w-full ">Entry Source</h2>
             <div className="w-full h-[200px] relative" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={53}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-xl font-black text-slate-800">68%</p>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
                {pieData.map((e, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></span>
                        {e.name}
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Top Users Table */}
        <div className="bg-white rounded-3xl p-6! shadow-sm border border-slate-100 overflow-hidden  mt-10!">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6! gap-4!">
             <h2 className="text-lg font-bold text-slate-800">Top Users</h2>
             <div className="relative w-full sm:w-64!">
                <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full pl-4 pr-10 py-2 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-4! py-3! text-right text-xs font-bold text-slate-400">#</th>
                  <th className="px-4! py-3! text-right text-xs font-bold text-slate-400">User</th>
                  <th className="px-4! py-3! text-left text-xs font-bold text-slate-400">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4! py-3! text-sm">
                        <span className={`inline-flex items-center justify-center w-6! h-6! rounded-lg text-xs font-bold ${idx < 3 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                            {user.rank}
                        </span>
                    </td>
                    <td className="px-4! py-3! flex items-center gap-3">
                        <div className={`w-8! h-8! rounded-full ${user.avatar} flex items-center justify-center text-xs font-bold text-slate-600`}>
                            {user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{user.name}</span>
                    </td>
                    <td className="px-4! py-3! text-left text-sm font-black text-indigo-600">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
