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

  const handleUpdateInfo = async () => {
    if (!editingUser) return;
    setIsUpdatingInfo(true);
    try {
      console.log("Updating Info:", editingUser.fullname);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("زانیارییە کەسییەکان نوێکرانەوە");
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const handleUpdateAccess = () => {
    if (!editingUser || !session) return;
    
    useUpdateUserRoleEditPost({
      userId: String(editingUser.id),
      roleId: editingUser.access,
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
            className={`px-4! py-1! rounded-full text-[10px] font-black tracking-wider border ${
              val === "1" || val?.toLowerCase().includes("admin")
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {val === "1" || val?.toLowerCase().includes("admin") ? "ADMIN" : "USER"}
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
    <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl shadow-lg shadow-[#D4AF37]/20">
          <Crown className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 m-0">بەڕێوەبردنی بەکارهێنەران</h1>
          <p className="text-slate-400 text-sm mt-1">لیست و دەسەڵاتی ئەندامانی سیستم</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden">
        <TableComponents<UserData>
          data={tableData}
          columns={USER_COLUMNS}
          rowKeyAccessor="id"
          onEdit={handleEditUser}
        />
      </div>

      <ModalComponents isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-1! bg-white! text-slate-800! rounded-[3rem]! overflow-hidden max-w-xl! mx-auto! border! border-slate-100! shadow-2xl!">
          {/* Modal Header */}
          <div className="p-8! pb-4! text-right!">
            <div className="flex! items-center! justify-start! gap-3! flex-row-reverse!">
               <div className="p-2! bg-[#D4AF37]/10! rounded-xl!">
                 <FaUserEdit className="text-[#D4AF37]! size-6!" />
               </div>
               <h2 className="text-2xl! font-black! text-slate-900! m-0!">بەڕێوەبردنی هەژمار</h2>
            </div>
            <p className="text-slate-400! text-sm! mt-3!">زانیارییەکانی پرۆفایل و دەسەڵاتەکان لێرەدا دەستکاری دەکرێن.</p>
          </div>

          <div className="p-8! pt-2! space-y-6! text-right!">
            {editingUser && (
              <>
                {/* Section 1: Personal Info */}
                <section className="p-6! bg-slate-50/50! border! border-slate-100! rounded-[2rem]! space-y-4!">
                  <div className="flex! items-center! justify-end! gap-2! text-[#D4AF37]! font-bold!">
                    <span className="text-sm!">زانیارییە کەسییەکان</span>
                    <User size={18} />
                  </div>

                  <div className="space-y-1.5!">
                    <label className="text-[11px]! font-black! text-slate-400! uppercase! pr-1!">ناو و پاشناو</label>
                    <input
                      type="text"
                      className="w-full! bg-white! border! border-slate-200! rounded-xl! py-3! px-4! text-slate-700! text-right! outline-none! focus:border-[#D4AF37]! focus:ring-4! focus:ring-[#D4AF37]/5! transition-all!"
                      value={editingUser.fullname}
                      onChange={(e) => setEditingUser({ ...editingUser, fullname: e.target.value })}
                    />
                  </div>
                  
                  <button
                    onClick={handleUpdateInfo}
                    disabled={isUpdatingInfo}
                    className="w-full! py-3! bg-slate-900! text-white! hover:bg-[#D4AF37]! rounded-xl! text-sm! font-black! flex! items-center! justify-center! gap-2! transition-all! shadow-lg! shadow-slate-200!"
                  >
                    {isUpdatingInfo ? <Loader2 className="animate-spin" size={18} /> : <><Save size={16} /> پاشەکەوتکردن</>}
                  </button>
                </section>

                {/* Section 2: Access Level */}
                <section className="p-6! bg-[#D4AF37]/5! border! border-[#D4AF37]/10! rounded-[2rem]! space-y-4!">
                  <div className="flex! items-center! justify-end! gap-2! text-[#D4AF37]! font-bold!">
                    <span className="text-sm!">ئاستی دەسەڵاتی سیستم</span>
                    <ShieldCheck size={18} />
                  </div>

                  <div className="relative!">
                    <select
                      className="w-full! bg-white! border! border-slate-200! rounded-xl! py-3! px-4! text-slate-700! text-right! outline-none! appearance-none! focus:border-[#D4AF37]! cursor-pointer!"
                      value={editingUser.access}
                      onChange={(e) => setEditingUser({ ...editingUser, access: e.target.value })}
                    >
                      {useGetRoleListData?.data.map((item: any) => (
                        <option key={item.roleId} value={item.roleId}>
                          {item.rolename === "userRole" ? "بەکارهێنەری ئاسایی" : "بەڕێوەبەری سیستم"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleUpdateAccess}
                    disabled={isUpdatingAccess}
                    className="w-full! py-3! bg-white! text-[#D4AF37]! border! border-[#D4AF37]/30! hover:bg-[#D4AF37]! hover:text-white! rounded-xl! text-sm! font-black! flex! items-center! justify-center! gap-2! transition-all! shadow-sm!"
                  >
                    {isUpdatingAccess ? <Loader2 className="animate-spin" size={18} /> : "نوێکردنەوەی دەسەڵات"}
                  </button>
                </section>

                <button 
                  onClick={closeModal} 
                  className="w-full! py-2! text-slate-400! text-xs! font-bold! hover:text-slate-600! transition-colors!"
                >
                  پەشیمانبوونەوە و داخستن
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