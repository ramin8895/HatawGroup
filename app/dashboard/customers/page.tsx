"use client";
import React, { useCallback, useMemo, useState } from "react";
import TableComponents from "../../../components/TableComponents";
import { Column } from "../../../components/TableComponents";
import { useGetuserList } from "@/api/userService/useRequest";
import ModalComponents from "@/components/Dashbord/ModalComponents";
import { ShieldCheck, Loader2, Save, User } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";

interface UserData {
  id: string | number;
  userName: string;
  fullname: string;
  access: "adminRole" | "userRole" | string;
  status?: string; 
}

const Customers = () => {
  const { data: useGetuserListData, isLoading: isTableLoading } = useGetuserList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  
  // لودینگ‌های مجزا برای هر API
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingAccess, setIsUpdatingAccess] = useState(false);

  const handleEditUser = useCallback((user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // تابع اول: ویرایش مشخصات فردی
  const handleUpdateInfo = async () => {
    if (!editingUser) return;
    setIsUpdatingInfo(true);
    try {
      // API 1: Update Fullname
      console.log("Calling API 1 for:", editingUser.fullname);
      await new Promise(resolve => setTimeout(resolve, 1000)); // شبیه‌سازی
      alert("اطلاعات فردی بروز شد");
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  // تابع دوم: ویرایش سطح دسترسی
  const handleUpdateAccess = async () => {
    if (!editingUser) return;
    setIsUpdatingAccess(true);
    try {
      // API 2: Update Access Level
      console.log("Calling API 2 for:", editingUser.access);
      await new Promise(resolve => setTimeout(resolve, 1000)); // شبیه‌سازی
      alert("سطح دسترسی بروز شد");
    } finally {
      setIsUpdatingAccess(false);
    }
  };

  // ستون‌های جدول
  const USER_COLUMNS: Column<UserData>[] = useMemo(() => [
    { label: "نام کاربری", accessor: "userName" },
    { label: "نام و نام خانوادگی", accessor: "fullname" },
    { 
      label: "سطح دسترسی", 
      accessor: "access",
      render: (val: string) => (
        <span className={`px-3! py-1! rounded-full text-[10px] font-black tracking-wide ${val === 'adminRole' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
          {val === 'adminRole' ? 'ADMIN' : 'USER'}
        </span>
      )
    },
  ], []);

  const tableData = useMemo<UserData[]>(() => {
    if (!useGetuserListData?.data) return [];
    return useGetuserListData.data.map((item: any, index: number) => ({
      id: item.id || item.userName || index, 
      userName: item.userName,
      fullname: item.fullname?.trim() || "بدون نام",
      access: item.access,
      status: "فعال",
    }));
  }, [useGetuserListData]);

  return (
    <div className="p-4 md:p-8" dir="rtl">
      <h1 className="text-2xl font-black text-gray-800 mb-6">مدیریت کاربران سیستم</h1>
      
      <TableComponents<UserData>
        data={tableData}
        columns={USER_COLUMNS}
        rowKeyAccessor="id"
        onEdit={handleEditUser}
      />

      <ModalComponents isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-1! bg-[#0b0f1a]! text-white! rounded-[2.5rem]! overflow-hidden max-w-xl! mx-auto!">
          
          {/* Header */}
          <div className="p-8! pb-4!">
             <h2 className="text-2xl! font-black! flex! items-center! gap-3!">
                <FaUserEdit className="text-indigo-500" />
                مدیریت حساب کاربری
             </h2>
             <p className="text-slate-500! text-sm! mt-2!">اطلاعات پروفایل و دسترسی‌های سیستمی را ویرایش کنید.</p>
          </div>

          <div className="p-8! pt-0! space-y-6!">
            {editingUser && (
              <>
                {/* بخش اول: ویرایش پروفایل */}
                <section className="p-6! bg-white/[0.03]! border! border-white/5! rounded-3xl! space-y-4!">
                  <div className="flex! items-center! justify-between! mb-2!">
                    <div className="flex! items-center! gap-2! text-indigo-400! font-bold!">
                      <User size={20} />
                      <span>مشخصات فردی</span>
                    </div>
                  </div>

                  <div className="grid! grid-cols-1! gap-4!">
                    <div className="space-y-1.5!">
                      <label className="text-[11px]! font-bold! text-slate-500! uppercase! pr-1!">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        className="w-full! bg-black/20! border! border-white/10! rounded-xl! py-3! px-4! text-white! outline-none! focus:border-indigo-500! transition-all!"
                        value={editingUser.fullname}
                        onChange={(e) => setEditingUser({ ...editingUser, fullname: e.target.value })}
                      />
                    </div>
                    <button
                      onClick={handleUpdateInfo}
                      disabled={isUpdatingInfo}
                      className="w-full! py-3! bg-indigo-600! hover:bg-indigo-500! rounded-xl! text-sm! font-bold! flex! items-center! justify-center! gap-2! transition-all! disabled:opacity-50!"
                    >
                      {isUpdatingInfo ? <Loader2 className="animate-spin" size={18} /> : <><Save size={16} /> ذخیره مشخصات</>}
                    </button>
                  </div>
                </section>

                {/* بخش دوم: مدیریت دسترسی */}
                <section className="p-6! bg-purple-500/[0.03]! border! border-purple-500/10! rounded-3xl! space-y-4!">
                  <div className="flex! items-center! gap-2! text-purple-400! font-bold!">
                    <ShieldCheck size={20} />
                    <span>سطح دسترسی سیستم</span>
                  </div>

                  <div className="space-y-4!">
                    <div className="relative!">
                      <select
                        className="w-full! bg-black/20! border! border-white/10! rounded-xl! py-3! px-4! text-white! outline-none! appearance-none! focus:border-purple-500! cursor-pointer!"
                        value={editingUser.access}
                        onChange={(e) => setEditingUser({ ...editingUser, access: e.target.value })}
                      >
                        <option className="bg-[#0b0f1a]" value="userRole">کاربر عادی (محدود)</option>
                        <option className="bg-[#0b0f1a]" value="adminRole">مدیر سیستم (دسترسی کل)</option>
                      </select>
                      <div className="absolute! left-4! top-1/2! -translate-y-1/2! pointer-events-none! text-slate-500!">
                        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleUpdateAccess}
                      disabled={isUpdatingAccess}
                      className="w-full! py-3! bg-purple-600/20! hover:bg-purple-600/30! text-purple-400! border! border-purple-500/20! rounded-xl! text-sm! font-bold! flex! items-center! justify-center! gap-2! transition-all! disabled:opacity-50!"
                    >
                      {isUpdatingAccess ? <Loader2 className="animate-spin" size={18} /> : "بروزرسانی سطح دسترسی"}
                    </button>
                  </div>
                </section>

                <button 
                  onClick={closeModal}
                  className="w-full! py-2! text-slate-500! text-xs! font-bold! hover:text-white! transition-colors!"
                >
                  بستن پنجره
                </button>
              </>
            )}
          </div>
        </div>
      </ModalComponents>
    </div>
  );
};

export default Customers;