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
  Fingerprint,
  Loader2,
  Globe,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Music2,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetEventUser } from "@/api/EventUserService/useRequest";
import { useGetuserDetail, useUpdateUser } from "@/api/userService/useRequest";
import { useLocale, useTranslations } from "next-intl";

interface EventItem {
  eventTitle: string;
  date: string;
  points: number | string;
}

export default function UserDashboard() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ku";
  const router = useRouter();

  const { data: Sessions } = useSession();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: useGetEventUserData } = useGetEventUser(Sessions?.userId);
  const { data: useGetuserDetailData, refetch: useGetuserDetailRefetch } =
    useGetuserDetail(Sessions?.userId);

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const [formData, setFormData] = useState({
    currentUserId: "",
    username: "",
    password: "", // معمولاً در آپدیت پروفایل خالی می‌ماند مگر اینکه کاربر بخواهد تغییر دهد
    firstname: "",
    lastname: "",
    roleId: "",
    userCountry: "",
    userCity: "",
    userInstagram: "",
    userFacebook: "",
    userTiktok: "",
    userTwitter: "",
  });

  useEffect(() => {
    if (useGetuserDetailData?.data) {
      const d = useGetuserDetailData.data;
      setFormData({
        currentUserId: Sessions?.userId || "",
        username: d.username || "",
        password: "",
        firstname: d.firstname || "",
        lastname: d.lastname || "",
        roleId: d.roleId || "",
        userCountry: d.userCountry || "",
        userCity: d.userCity || "",
        userInstagram: d.userInstagram || "",
        userFacebook: d.userFacebook || "",
        userTiktok: d.userTiktok || "",
        userTwitter: d.userTwitter || "",
      });
    }
  }, [useGetuserDetailData, Sessions]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData, {
      onSuccess: () => {
        useGetuserDetailRefetch();
      },
    });
  };

const stats = [
    {
      label: t("statsTotalPoints"),
      value: useGetuserDetailData?.data.points || "0",
      icon: <Star size={22} />,
    },
    {
      label: t("statsEvents"),
      value: useGetEventUserData?.data?.eventList?.length || "0",
      icon: <Calendar size={22} />,
    },
    { label: t("statsRank"), value: "#42", icon: <Trophy size={22} /> },
    {
      label: t("statsRole"),
      value: useGetuserDetailData?.data.rolename || "User",
      icon: <Zap size={22} />,
    },
  ];

  const menuItems = [
    {
      id: "overview",
      label: t("menuOverview"),
      icon: <LayoutDashboard size={20} />,
    },
    { 
      id: "events", 
      label: t("menuEvents"), 
      icon: <Calendar size={20} /> 
    },
    { 
      id: "edit", 
      label: t("menuEdit"), 
      icon: <Edit3 size={20} /> 
    },
  ];


  return (
    <main
      className={`min-h-screen bg-[#121212] text-[#FFFFFF] !p-4 md:!p-10 font-sans selection:bg-[#D4AF37]/30 ${
        isRtl ? "font-kurdish" : ""
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl !mx-auto relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center !mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4AF37] to-[#F5E1A4] rounded-[2.2rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-20 h-20 rounded-[2rem] bg-[#1A1A1A] border border-[#D4AF37]/30 flex items-center justify-center shadow-2xl">
                <User size={36} className="text-[#D4AF37]" />
              </div>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <h1 className="text-4xl font-black text-white tracking-tight !mb-2">
                {t("title")}
              </h1>
              <p className="text-[#b2b2b2] font-medium flex items-center gap-2">
                {t("welcome")}{" "}
                <span className="text-[#D4AF37] font-black">
                  {useGetuserDetailData?.data.firstname || t("userPlaceholder")}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="!px-6 !py-3.5 bg-[#FFFFFF]/[0.03] border border-[#E0E0E0]/10 text-[#b2b2b2] rounded-2xl font-bold hover:bg-[#FFFFFF]/[0.08] transition-all flex items-center gap-2"
            >
              {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />} {t("goBack")}
            </button>
            <button
              onClick={() => signOut()}
              className="!px-8 !py-3.5 bg-[#D4AF37] text-[#121212] rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              <LogOut size={18} /> {t("logout")}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3 !space-y-4">
            {menuItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between !p-5 rounded-[1.5rem] font-bold transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-gradient-to-l from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/40 text-[#D4AF37]"
                    : "bg-[#FFFFFF]/[0.02] border-transparent text-[#b2b2b2] hover:bg-[#FFFFFF]/[0.05]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon}
                  <span className="text-lg">{tab.label}</span>
                </div>
              </button>
            ))}
          </aside>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {/* Overview Tab Content */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  className="!space-y-10"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 !p-8 rounded-[2.5rem] text-center hover:border-[#D4AF37]/30 transition-all duration-500 group"
                      >
                        <div className="w-14 h-14 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-2xl flex items-center justify-center !mx-auto !mb-6 text-[#D4AF37] group-hover:scale-110 transition-all">
                          {stat.icon}
                        </div>
                        <p className="text-[#b2b2b2] text-[10px] font-black uppercase tracking-widest !mb-2">
                          {stat.label}
                        </p>
                        <h4 className="text-2xl font-black text-white">
                          {stat.value}
                        </h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Events Tab Content */}
              {activeTab === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="!space-y-6"
                >
                  {/* ... (بخش رویدادها بدون تغییر باقی می‌ماند) */}
                </motion.div>
              )}

              {/* Edit Tab Content */}
              {activeTab === "edit" && (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 rounded-[3.5rem] !p-10 md:!p-16 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h3 className={`text-3xl font-black !mb-10 text-white ${isRtl ? "text-right" : "text-left"}`}>
                      {t("editTitle")}
                    </h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleUpdateProfile}>
                      
                      {/* Firstname */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          {t("labelFirstname")}
                        </label>
                        <div className="relative">
                          <User className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            value={formData.firstname}
                            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Lastname */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          {t("labelLastname")}
                        </label>
                        <div className="relative">
                          <User className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            value={formData.lastname}
                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          Country
                        </label>
                        <div className="relative">
                          <Globe className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            value={formData.userCountry}
                            onChange={(e) => setFormData({ ...formData, userCountry: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          City
                        </label>
                        <div className="relative">
                          <MapPin className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            value={formData.userCity}
                            onChange={(e) => setFormData({ ...formData, userCity: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          Instagram
                        </label>
                        <div className="relative">
                          <Instagram className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            placeholder="@username"
                            value={formData.userInstagram}
                            onChange={(e) => setFormData({ ...formData, userInstagram: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* TikTok */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          TikTok
                        </label>
                        <div className="relative">
                          <Music2 className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            placeholder="@username"
                            value={formData.userTiktok}
                            onChange={(e) => setFormData({ ...formData, userTiktok: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Facebook */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          Facebook
                        </label>
                        <div className="relative">
                          <Facebook className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            value={formData.userFacebook}
                            onChange={(e) => setFormData({ ...formData, userFacebook: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Twitter */}
                      <div className="!space-y-3">
                        <label className={`text-xs font-black text-[#D4AF37] uppercase tracking-widest ${isRtl ? "!pr-2" : "!pl-2"}`}>
                          Twitter
                        </label>
                        <div className="relative">
                          <Twitter className={`absolute ${isRtl ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-[#b2b2b2]`} size={20} />
                          <input
                            type="text"
                            value={formData.userTwitter}
                            onChange={(e) => setFormData({ ...formData, userTwitter: e.target.value })}
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${isRtl ? "!pr-14 !pl-5 text-right" : "!pl-14 !pr-5 text-left"} text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className={`md:col-span-2 !pt-6 ${isRtl ? "text-right" : "text-left"}`}>
                        <button 
                          type="submit"
                          disabled={isUpdating}
                          className="w-full md:w-auto !px-14 !py-5 bg-[#D4AF37] text-[#121212] rounded-2xl font-black text-lg hover:scale-105 hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isUpdating && <Loader2 className="animate-spin" size={20} />}
                          {t("saveBtn")}
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