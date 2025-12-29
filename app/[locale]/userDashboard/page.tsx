"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trophy,
  Calendar,
  Zap,
  Star,
  Edit3,
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
import { MdEmail } from "react-icons/md";

export default function UserDashboard() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ku";
  const router = useRouter();

  const { data: Sessions } = useSession();
  const [activeTab, setActiveTab] = useState("overview");

  // استیت برای مدیریت تاریخ فیلتر
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ۱. دریافت رویدادها بر اساس UserId و تاریخ انتخاب شده
  const {
    data: useGetEventUserData,
    isLoading: isLoadingEvents,
    refetch: refetchEvents,
  } = useGetEventUser(Sessions?.userId, selectedDate);

  // ۲. اصلاح اصلی: ری‌فچ خودکار با تغییر تاریخ یا یوزر آیدی
  useEffect(() => {
    if (Sessions?.userId) {
      refetchEvents();
    }
  }, [selectedDate, Sessions?.userId, refetchEvents]);

  const { data: useGetuserDetailData, refetch: useGetuserDetailRefetch } =
    useGetuserDetail(Sessions?.userId);

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const [formData, setFormData] = useState({
    currentUserId: "",
    username: "",
    password: "",
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

      console.log("Data from API:", d);

      setFormData({
        currentUserId: Sessions?.userId || "",
        username: d.username || "",
        password: "",
        firstname: d.firstname || "",
        lastname: d.lastname || "",
        roleId: d.roleId || "",
        userCountry: d.userCountry ?? "",
        userCity: d.userCity ?? "",
        userInstagram: d.userInstagram ?? "",
        userFacebook: d.userFacebook ?? "",
        userTiktok: d.userTiktok ?? "",
        userTwitter: d.userTwitter ?? "",
      });
    }
  }, [useGetuserDetailData, Sessions?.userId]);
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
      value: useGetEventUserData?.data?.userScoreTotal || "0",
      icon: <Star size={22} />,
    },
    {
      label: t("statsEvents"),
      value: useGetEventUserData?.data?.eventList?.length || "0",
      icon: <Calendar size={22} />,
    },
    {
      label: t("statsRole"),
      value:
        useGetuserDetailData?.data?.rolename == "userRole" ? "User" : "Admin",
      icon: <Zap size={22} />,
    },
  ];

  const menuItems = [
    { id: "overview", label: t("menuOverview"), icon: <Zap size={20} /> },
    { id: "events", label: t("menuEvents"), icon: <Calendar size={20} /> },
    { id: "edit", label: t("menuEdit"), icon: <Edit3 size={20} /> },
  ];

  return (
    <main
      className={`min-h-screen bg-[#121212] text-[#FFFFFF] !p-4 md:!p-10 font-sans selection:bg-[#D4AF37]/30 ${
        isRtl ? "font-kurdish" : ""
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl !mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center !mb-16 !gap-8">
          <div className="flex items-center !gap-6">
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
              <p className="text-[#b2b2b2] font-medium flex items-center !gap-2">
                {t("welcome")}{" "}
                <span className="text-[#D4AF37] font-black">
                  {formData.firstname ||
                    useGetuserDetailData?.data?.firstname ||
                    t("userPlaceholder")}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center !gap-4">
            <button
              onClick={() => router.push("/")}
              className="!px-6 !py-3.5 bg-[#FFFFFF]/[0.03] border border-[#E0E0E0]/10 text-[#b2b2b2] rounded-2xl font-bold hover:bg-[#FFFFFF]/[0.08] transition-all flex items-center !gap-2"
            >
              {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}{" "}
              {t("goBack")}
            </button>
            <button
              onClick={() => signOut()}
              className="!px-8 !py-3.5 bg-[#D4AF37] text-[#121212] rounded-2xl font-black hover:scale-105 transition-all shadow-lg flex items-center !gap-2"
            >
              <LogOut size={18} /> {t("logout")}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 !gap-10">
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
                <div className="flex items-center !gap-4">
                  {tab.icon}
                  <span className="text-lg">{tab.label}</span>
                </div>
              </button>
            ))}
          </aside>

          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 md:grid-cols-4 !gap-5"
                >
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 !p-8 rounded-[2.5rem] text-center hover:border-[#D4AF37]/30 transition-all group"
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
                </motion.div>
              )}

              {activeTab === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="!space-y-8"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center !gap-6 bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 !p-8 rounded-[2.5rem]">
                    <div>
                      <h3 className="text-3xl font-black text-white !mb-2">
                        {t("eventsTitle")}
                      </h3>
                      <p className="text-[#b2b2b2]">
                        {t("eventsCountText")}{" "}
                        {useGetEventUserData?.data?.eventList?.length || 0}
                      </p>
                    </div>

                    <div className="relative w-full md:w-auto">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#D4AF37] !mb-2 !px-2">
                        {t("filterByDate")}
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute !left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]"
                          size={18}
                        />
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full md:w-64 bg-[#121212] border border-[#D4AF37]/20 rounded-xl !py-3 !pl-12 !pr-4 text-white outline-none focus:border-[#D4AF37] transition-all appearance-none color-scheme-dark shadow-inner cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 !gap-4">
                    {isLoadingEvents ? (
                      <div className="flex justify-center !py-20">
                        <Loader2
                          className="animate-spin text-[#D4AF37]"
                          size={40}
                        />
                      </div>
                    ) : useGetEventUserData?.data?.eventList?.length > 0 ? (
                      useGetEventUserData?.data.eventList.map((event: any) => (
                        <motion.div
                          key={event.idEventUser}
                          whileHover={{ x: isRtl ? -10 : 10 }}
                          className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 !p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between !gap-6 hover:border-[#D4AF37]/30 transition-all group"
                        >
                          <div className="flex items-center !gap-6 w-full md:w-auto">
                            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#121212] transition-colors">
                              <Trophy size={28} />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-white !mb-1">
                                {event.eventTitle}
                              </h4>
                              <div className="flex items-center !gap-4 text-sm text-[#b2b2b2]">
                                <span className="flex items-center !gap-1.5">
                                  <Clock size={14} className="text-[#D4AF37]" />
                                  {new Date(event.dateCode).toLocaleDateString(
                                    locale === "fa" ? "fa-IR" : "en-US"
                                  )}
                                </span>
                                <span className="flex items-center !gap-1.5">
                                  <Fingerprint
                                    size={14}
                                    className="text-[#D4AF37]"
                                  />
                                  {event.codeEventuser}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full md:w-auto !gap-8 border-t md:border-t-0 border-[#E0E0E0]/5 !pt-4 md:!pt-0">
                            <div className={isRtl ? "text-right" : "text-left"}>
                              <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] !mb-1">
                                {t("pointsSuffix")}
                              </p>
                              <p className="text-2xl font-black text-white">
                                {event.userScore?.toLocaleString()}
                              </p>
                            </div>
                            <div className="!px-4 !py-2 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl text-[#10b981] text-xs font-bold flex items-center !gap-2">
                              <CheckCircle2 size={14} /> {t("statusVerified")}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center !py-20 bg-[#FFFFFF]/[0.01] border border-dashed border-[#E0E0E0]/10 rounded-[3rem]">
                        <Calendar
                          size={40}
                          className="!mx-auto !mb-6 text-[#b2b2b2]"
                        />
                        <h4 className="text-xl font-bold text-white !mb-2">
                          {t("noEvents")}
                        </h4>
                        <p className="text-[#b2b2b2]">
                          {t("eventPlaceholder")}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "edit" && (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5 rounded-[3.5rem] !p-10 md:!p-16"
                >
                  <h3 className="text-3xl font-black !mb-10 text-white">
                    {t("editTitle")}
                  </h3>
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 !gap-8"
                    onSubmit={handleUpdateProfile}
                  >
                    {[
                      {
                        name: "firstname",
                        label: t("labelFirstname"),
                        icon: <User size={20} />,
                      },
                      {
                        name: "lastname",
                        label: t("labelLastname"),
                        icon: <User size={20} />,
                      },
                      {
                        name: "userCountry",
                        label: "Country",
                        icon: <Globe size={20} />,
                      },
                      {
                        name: "username",
                        label: "username",
                        icon: <MdEmail size={20} />,
                      },
                      {
                        name: "userCity",
                        label: "City",
                        icon: <MapPin size={20} />,
                      },
                      {
                        name: "userInstagram",
                        label: "Instagram",
                        icon: <Instagram size={20} />,
                      },
                      {
                        name: "userTiktok",
                        label: "TikTok",
                        icon: <Music2 size={20} />,
                      },
                      {
                        name: "userFacebook",
                        label: "Facebook",
                        icon: <Facebook size={20} />,
                      },
                      {
                        name: "userTwitter",
                        label: "Twitter",
                        icon: <Twitter size={20} />,
                      },
                    ].map((field) => (
                      <div key={field.name} className="!space-y-3">
                        <label className="text-xs font-black text-[#D4AF37] uppercase tracking-widest !px-2">
                          {field.label}
                        </label>
                        <div className="relative">
                          <div
                            className={`absolute ${
                              isRtl ? "!right-5" : "!left-5"
                            } top-1/2 -translate-y-1/2 text-[#b2b2b2]`}
                          >
                            {field.icon}
                          </div>
                          <input
                            type="text"
                            value={(formData as any)[field.name] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                              })
                            }
                            className={`w-full bg-[#121212] border border-[#E0E0E0]/10 rounded-2xl !py-5 ${
                              isRtl
                                ? "!pr-14 pl-5! text-right"
                                : "!pl-14 !pr-5 text-left"
                            } text-white outline-none focus:border-[#D4AF37] transition-all`}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="md:col-span-2 !pt-6">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full md:w-auto !px-14 !py-5 bg-[#D4AF37] text-[#121212] rounded-2xl font-black text-lg hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center !gap-2"
                      >
                        {isUpdating && (
                          <Loader2 className="animate-spin" size={20} />
                        )}
                        {t("saveBtn")}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
