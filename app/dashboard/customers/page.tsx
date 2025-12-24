"use client";
import React, { useCallback, useMemo, useState } from "react";
import TableComponents from "../../../components/TableComponents";
import { Column } from "../../../components/TableComponents";
import {
  useGetRoleList,
  useGetuserList,
  useUpdateUserRoleEdit,
} from "@/api/userService/useRequest";
import ModalComponents from "@/components/Dashbord/ModalComponents";
import { ShieldCheck, Loader2, Save, User, Crown } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";

interface UserData {
  id: string | number;
  userName: string;
  fullname: string;
  access: string;
  status?: string;
}

const Customers = () => {
  const { data: session } = useSession();
  const { data: useGetuserListData, isLoading: isTableLoading } = useGetuserList();
  const { data: useGetRoleListData } = useGetRoleList();

  const {
    mutate: useUpdateUserRoleEditPost,
    isPending: isUpdatingAccess,
  } = useUpdateUserRoleEdit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

  const handleEditUser = useCallback((user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // تابع اول: ویرایش مشخصات فردی (Fullname)
  const handleUpdateInfo = async () => {
    if (!editingUser) return;
    setIsUpdatingInfo(true);
    try {
      // در اینجا می‌توانید API مربوط به آپدیت پروفایل را صدا بزنید
      console.log("Updating Info:", editingUser.fullname);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("زانیارییە کەسییەکان نوێکرانەوە");
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  // تابع دوم: ویرایش سطح دسترسی (Role)
  const handleUpdateAccess = () => {
    if (!editingUser || !session) return;
    
    useUpdateUserRoleEditPost({
      userId: String(editingUser.id),             // شناسه کاربر مورد نظر
      roleId: editingUser.access,                 // نقش جدید انتخاب شده
    }, {
      onSuccess: () => {
        alert("ئاستی دەسەڵات نوێکرایەوە");
        closeModal();
      }
    });
  };

  const USER_COLUMNS: Column<UserData>[] = useMemo(
    () => [
      { label: "ناوی بەکارهێنەر", accessor: "userName" },
      { label: "ناو و پاشناو", accessor: "fullname" },
      {
        label: "دەسەڵات",
        accessor: "access",
        render: (val: string) => (
          <span
            className={`px-3! py-1! rounded-full text-[10px] font-black tracking-wide border ${
              val === "1" || val?.includes("admin") // فرض بر اینکه ID یک ادمین است
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
                : "bg-slate-500/10 text-slate-400 border-slate-500/20"
            }`}
          >
            {val === "1" || val?.includes("admin") ? "ADMIN" : "USER"}
          </span>
        ),
      },
    ],
    []
  );

  const tableData = useMemo<UserData[]>(() => {
    if (!useGetuserListData?.data) return [];
    return useGetuserListData.data.map((item: any, index: number) => ({
      id: item.userId || item.id || index,
      userName: item.userName,
      fullname: item.fullname?.trim() || "بێ ناو",
      access: String(item.roleId || item.access),
      status: "چالاک",
    }));
  }, [useGetuserListData]);

  return (
    <div className="p-4 md:p-8 bg-[#030712] min-h-screen" dir="rtl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
          <Crown className="text-[#D4AF37]" size={24} />
        </div>
        <h1 className="text-2xl font-black text-white">بەڕێوەبردنی بەکارهێنەران</h1>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md">
        <TableComponents<UserData>
          data={tableData}
          columns={USER_COLUMNS}
          rowKeyAccessor="id"
          onEdit={handleEditUser}
        />
      </div>

      <ModalComponents isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-1! bg-[#0b0f1a]! text-white! rounded-[2.5rem]! overflow-hidden max-w-xl! mx-auto! border! border-[#D4AF37]/20!">
          {/* Header */}
          <div className="p-8! pb-4! text-right!">
            <h2 className="text-2xl! font-black! flex! items-center! justify-start! gap-3! flex-row-reverse!">
              <FaUserEdit className="text-[#D4AF37]" />
              بەڕێوەبردنی هەژمار
            </h2>
            <p className="text-slate-500! text-sm! mt-2!">زانیارییەکانی پرۆفایل و دەسەڵاتەکان دەستکاری بکە.</p>
          </div>

          <div className="p-8! pt-0! space-y-6! text-right!">
            {editingUser && (
              <>
                {/* بخش اول: مشخصات فردی */}
                <section className="p-6! bg-white/[0.02]! border! border-white/5! rounded-3xl! space-y-4!">
                  <div className="flex! items-center! justify-end! gap-2! text-[#D4AF37]! font-bold!">
                    <span>زانیارییە کەسییەکان</span>
                    <User size={20} />
                  </div>

                  <div className="space-y-1.5!">
                    <label className="text-[11px]! font-bold! text-slate-500! uppercase! pr-1!">ناو و پاشناو</label>
                    <input
                      type="text"
                      className="w-full! bg-black/40! border! border-white/10! rounded-xl! py-3! px-4! text-white! text-right! outline-none! focus:border-[#D4AF37]! transition-all!"
                      value={editingUser.fullname}
                      onChange={(e) => setEditingUser({ ...editingUser, fullname: e.target.value })}
                    />
                  </div>
                  
                  <button
                    onClick={handleUpdateInfo}
                    disabled={isUpdatingInfo}
                    className="w-full! py-3! bg-white! text-black! hover:bg-[#D4AF37]! rounded-xl! text-sm! font-black! flex! items-center! justify-center! gap-2! transition-all! disabled:opacity-50!"
                  >
                    {isUpdatingInfo ? <Loader2 className="animate-spin" size={18} /> : <><Save size={16} /> پاشەکەوتکردن</>}
                  </button>
                </section>

                {/* بخش دوم: سطح دسترسی */}
                <section className="p-6! bg-[#D4AF37]/[0.03]! border! border-[#D4AF37]/10! rounded-3xl! space-y-4!">
                  <div className="flex! items-center! justify-end! gap-2! text-[#D4AF37]! font-bold!">
                    <span>ئاستی دەسەڵاتی سیستم</span>
                    <ShieldCheck size={20} />
                  </div>

                  <div className="relative!">
                    <select
                      className="w-full! bg-black/40! border! border-white/10! rounded-xl! py-3! px-4! text-white! text-right! outline-none! appearance-none! focus:border-[#D4AF37]! cursor-pointer!"
                      value={editingUser.access}
                      onChange={(e) => setEditingUser({ ...editingUser, access: e.target.value })}
                    >
                      {useGetRoleListData?.data.map((item: any) => (
                        <option key={item.roleId} className="bg-[#0b0f1a]" value={item.roleId}>
                          {item.rolename === "userRole" ? "بەکارهێنەری ئاسایی (سنووردار)" : "بەڕێوەبەری سیستم (دەسەڵاتی تەواو)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleUpdateAccess}
                    disabled={isUpdatingAccess}
                    className="w-full! py-3! bg-[#D4AF37]/10! hover:bg-[#D4AF37]/20! text-[#D4AF37]! border! border-[#D4AF37]/20! rounded-xl! text-sm! font-black! flex! items-center! justify-center! gap-2! transition-all!"
                  >
                    {isUpdatingAccess ? <Loader2 className="animate-spin" size={18} /> : "نوێکردنەوەی دەسەڵات"}
                  </button>
                </section>

                <button onClick={closeModal} className="w-full! py-2! text-slate-500! text-xs! font-bold! hover:text-white! transition-colors!">داخستنی پەنجەرە</button>
              </>
            )}
          </div>
        </div>
      </ModalComponents>
    </div>
  );
};

export default Customers;