"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trophy,
  Calendar,
  Zap,
  Star,
  Edit3,
  Mail,
  LayoutDashboard,
  ArrowLeft,
  ArrowRight,
  LogOut,
  CheckCircle2,
  Clock,
  Fingerprint
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetEventUser } from "@/api/EventUserService/useRequest";
import { useGetuserDetail } from "@/api/userService/useRequest";

export default function UserDashboard({ locale, translations }: any) {
  const isRtl = locale === "fa" || locale === "ku";
  const { Dashboard = {} } = translations;
  
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  const { data: Sessions } = useSession();

  const { data: useGetEventUserData } = useGetEventUser(Sessions?.userId);
  const {
    data: useGetuserDetailData,
    refetch: useGetuserDetailRefetch,
  } = useGetuserDetail(Sessions?.userId);

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    roleId: "",
  });

  useEffect(() => {
    if (useGetuserDetailData) {
      setFormData({
        username: useGetuserDetailData.data.username || "",
        firstname: useGetuserDetailData.data.firstname || "",
        lastname: useGetuserDetailData.data.lastname || "",
        roleId: useGetuserDetailData.data.roleId || "",
      });
    }
  }, [useGetuserDetailData]);

  useEffect(() => {
    if (Sessions?.userId) {
      useGetuserDetailRefetch();
    }
  }, [Sessions?.userId, useGetuserDetailRefetch]);

  const stats = [
    { label: Dashboard.statsTotalPoints, value: useGetuserDetailData?.data.points || "0", icon: <Star size={22} /> },
    { label: Dashboard.statsEvents, value: useGetEventUserData?.data?.eventList?.length || "0", icon: <Calendar size={22} /> },
    { label: Dashboard.statsRank, value: "#42", icon: <Trophy size={22} /> },
    { label: Dashboard.statsRole, value: useGetuserDetailData?.data.rolename || "User", icon: <Zap size={22} /> },
  ];

  const menuItems = [
    { id: "overview", label: Dashboard.menuOverview, icon: <LayoutDashboard size={20} /> },
    { id: "events", label: Dashboard.menuEvents, icon: <Calendar size={20} /> },
    { id: "edit", label: Dashboard.menuEdit, icon: <Edit3 size={20} /> },
  ];

  return (
    <main className={`min-h-screen bg-[#121212] text-[#FFFFFF] p-4! md:p-10! font-sans selection:bg-[#D4AF37]/30 ${isRtl ? 'font-kurdish' : ''}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto! relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16! gap-8!">
          <div className="flex items-center gap-6!">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4AF37] to-[#F5E1A4] rounded-[2.2rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-20 h-20 rounded-[2rem] bg-[#1A1A1A] border border-[#D4AF37]/30 flex items-center justify-center shadow-2xl">
                <User size={36} className="text-[#D4AF37]" />
              </div>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <h1 className="text-4xl font-black text-white tracking-tight mb-2!">{Dashboard.title}</h1>
              <p className="text-[#E0E0E0]/40 font-medium flex items-center gap-2!">
                {Dashboard.welcome} <span className="text-[#D4AF37] font-black">{useGetuserDetailData?.data.firstname || Dashboard.userPlaceholder}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4!">
            <button onClick={() => router.push("/")} className="px-6! py-3.5! bg-[#FFFFFF]/[0.03] border border-[#E0E0E0]/10 text-[#E0E0E0]/70 rounded-2xl font-bold hover:bg-[#FFFFFF]/[0.08] transition-all flex items-center gap-2!">
              {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />} {Dashboard.goBack}
            </button>
            <button onClick={() => signOut()} className="px-8! py-3.5! bg-[#D4AF37] text-[#121212] rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] flex items-center gap-2!">
              <LogOut size={18} /> {Dashboard.logout}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10!">
          <aside className="lg:col-span-3 space-y-4!">
            {menuItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-5! rounded-[1.5rem] font-bold transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-gradient-to-l from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/40 text-[#D4AF37]"
                    : "bg-[#FFFFFF]/[0.02] border-transparent text-[#E0E0E0]/40 hover:bg-[#FFFFFF]/[0.05]"
                }`}
              >
                <div className="flex items-center gap-4!">
                  {tab.icon}
                  <span className="text-lg">{tab.label}</span>
                </div>
              </button>
            ))}
          </aside>

          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, x: isRtl ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: isRtl ? 20 : -20 }} className="space-y-10!">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5!">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 p-8! rounded-[2.5rem] text-center hover:border-[#D4AF37]/30 transition-all duration-500 group">
                        <div className="w-14 h-14 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto! mb-6! text-[#D4AF37] group-hover:scale-110 transition-all">
                          {stat.icon}
                        </div>
                        <p className="text-[#E0E0E0]/30 text-[10px] font-black uppercase tracking-widest mb-2!">{stat.label}</p>
                        <h4 className="text-2xl font-black text-white">{stat.value}</h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "events" && (
                <motion.div key="events" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6!">
                  <div className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 rounded-[3rem] p-8! md:p-10!">
                    <h3 className={`text-2xl font-black mb-8! flex items-center gap-3! text-white ${isRtl ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                      <Calendar className="text-[#D4AF37]" size={24} /> {Dashboard.eventListTitle}
                    </h3>
                    <div className="grid gap-4!">
                      {useGetEventUserData?.data?.eventList ? (
                        useGetEventUserData?.data.eventList.map((event: any, i: number) => (
                          <div key={i} className={`flex flex-col md:flex-row items-center justify-between p-6! bg-[#1A1A1A]/50 border border-[#E0E0E0]/5 rounded-2xl hover:border-[#D4AF37]/20 transition-all group ${isRtl ? '' : 'md:flex-row-reverse'}`}>
                            <div className={`flex items-center gap-5! ${isRtl ? '' : 'flex-row-reverse'}`}>
                              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#D4AF37]">
                                <CheckCircle2 size={20} />
                              </div>
                              <div className={isRtl ? "text-right" : "text-left"}>
                                <h5 className="font-bold text-lg text-[#E0E0E0] group-hover:text-white transition-colors">{event.eventTitle || Dashboard.eventPlaceholder}</h5>
                                <div className={`flex items-center gap-3! mt-1! text-[#E0E0E0]/30 text-xs ${isRtl ? '' : 'flex-row-reverse'}`}>
                                  <span className="flex items-center gap-1!"><Clock size={12} /> {event.date || "2025/05/10"}</span>
                                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2! py-0.5! rounded-md">{Dashboard.completedStatus}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4! md:mt-0! text-[#D4AF37] font-black text-xl">
                              +{event.points || "100"} {Dashboard.pointsSuffix}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-20! text-[#E0E0E0]/20">{Dashboard.noEvents}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "edit" && (
                <motion.div key="edit" initial={{ opacity: 0, x: isRtl ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 rounded-[3.5rem] p-10! md:p-16! relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className={`text-3xl font-black mb-10! text-white ${isRtl ? 'text-right' : 'text-left'}`}>{Dashboard.editTitle}</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8!" onSubmit={(e) => e.preventDefault()}>
                      
                      {/* Firstname */}
                      <div className="space-y-3!">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? 'pr-2' : 'pl-2'}`}>{Dashboard.labelFirstname}</label>
                        <div className="relative">
                          <User className={`absolute! ${isRtl ? 'right-5' : 'left-5'} top-1/2! -translate-y-1/2! text-[#E0E0E0]/20`} size={20} />
                          <input
                            type="text"
                            value={formData.firstname}
                            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl py-5! ${isRtl ? 'pr-14 pl-5 text-right' : 'pl-14 pr-5 text-left'} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Lastname */}
                      <div className="space-y-3!">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? 'pr-2' : 'pl-2'}`}>{Dashboard.labelLastname}</label>
                        <div className="relative">
                          <User className={`absolute! ${isRtl ? 'right-5' : 'left-5'} top-1/2! -translate-y-1/2! text-[#E0E0E0]/20`} size={20} />
                          <input
                            type="text"
                            value={formData.lastname}
                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl py-5! ${isRtl ? 'pr-14 pl-5 text-right' : 'pl-14 pr-5 text-left'} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Username */}
                      <div className="space-y-3!">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? 'pr-2' : 'pl-2'}`}>{Dashboard.labelEmail}</label>
                        <div className="relative">
                          <Mail className={`absolute! ${isRtl ? 'right-5' : 'left-5'} top-1/2! -translate-y-1/2! text-[#E0E0E0]/20`} size={20} />
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl py-5! ${isRtl ? 'pr-14 pl-5 text-right' : 'pl-14 pr-5 text-left'} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Role ID */}
                      <div className="space-y-3!">
                        <label className={`text-xs font-black text-[#D4AF37]/50 uppercase tracking-widest ${isRtl ? 'pr-2' : 'pl-2'}`}>{Dashboard.labelRoleId}</label>
                        <div className="relative">
                          <Fingerprint className={`absolute! ${isRtl ? 'right-5' : 'left-5'} top-1/2! -translate-y-1/2! text-[#E0E0E0]/10`} size={20} />
                          <input
                            type="text"
                            readOnly
                            value={formData.roleId}
                            className={`w-full bg-[#121212]/50 border border-[#E0E0E0]/5 rounded-2xl py-5! ${isRtl ? 'pr-14 pl-5 text-right' : 'pl-14 pr-5 text-left'} text-[#E0E0E0]/30 cursor-not-allowed outline-none`}
                          />
                        </div>
                      </div>

                      <div className={`md:col-span-2 pt-6! ${isRtl ? 'text-right' : 'text-left'}`}>
                        <button className="w-full md:w-auto px-14! py-5! bg-[#D4AF37] text-[#121212] rounded-2xl font-black text-lg hover:scale-105 hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.3)] transition-all">
                          {Dashboard.saveBtn}
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