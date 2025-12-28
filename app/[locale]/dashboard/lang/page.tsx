"use client";

import React, { useState, useMemo } from "react";
import { Button, message, Spin, ConfigProvider, theme } from "antd";
import {
  Languages,
  Plus,
  Sparkles,
  LayoutGrid,
  Loader2,
  Pencil,
} from "lucide-react";

// Components
import TableComponents, { Column } from "@/components/TableComponents";
import ModalComponents from "@/components/Dashbord/ModalComponents";

import { langAPI } from "@/api";
import AddLangForm from "@/components/Dashbord/AddLangForm";

export interface LangItem {
  id: number;
  key: string;
  titleLanguage: string;
  orderLang: number;
}

const LangPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [itemSelect, setItemSelect] = useState<number | undefined>(undefined);

  // API Hooks
  const {
    data: useGetlangData,
    isPending: isListPending,
    refetch: useGetlangRefetch,
  } = langAPI.useGetlang();

  const handleEdit = (lang: LangItem) => {
    setItemSelect(lang.id);
    setOpen(true);
  };

  const tableData = useMemo<LangItem[]>(() => {
    if (!useGetlangData) return [];
    return useGetlangData.data.map((item: any) => ({
      key: String(item.id),
      id: item.id,
      titleLanguage: item.titleLanguage || "بێ ناونیشان",
      orderLang: item.orderLang || 0,
    }));
  }, [useGetlangData]);

  const columns: Column<LangItem>[] = [
    { label: "ID", accessor: "id" as any },
    { label: "ناونیشانی زمان", accessor: "titleLanguage" as any },
    { label: "ڕیزبەندی", accessor: "orderLang" as any },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#D4AF37",
          borderRadius: 16,
        },
      }}
    >
      <div
        className="min-h-screen! bg-[#F8F9FA]! p-4! font-sans selection:bg-[#D4AF37]/20"
        dir="rtl"
      >
        <div className="max-w-[1200px]! mx-auto! animate-in fade-in duration-700">
          {/* Header Section */}
          <div className="flex! flex-col! md:flex-row! justify-between! items-center! gap-8! mb-10! p-8! bg-white border! border-gray-100 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex! items-center! gap-6! relative z-10">
              <div className="p-5! bg-[#D4AF37]/10 rounded-[1.5rem] border! border-[#D4AF37]/20 shadow-sm text-[#D4AF37]">
                <Languages size={36} />
              </div>
              <div>
                <h1 className="text-3xl! font-black! text-[#1A1A1A] flex! items-center! gap-3! m-0! tracking-tight">
                  بەڕێوەبردنی زمانەکان
                  <Sparkles className="text-[#D4AF37]" size={22} />
                </h1>
                <p className="text-gray-400! text-sm! mt-2! font-bold uppercase tracking-widest">
                  Language Management | Hataw Group
                </p>
              </div>
            </div>

            <div className="flex! items-center! gap-4! relative z-10">
              <Button
                type="primary"
                icon={<Plus size={20} className="ml-1" />}
                onClick={() => {
                  setItemSelect(undefined);
                  setOpen(true);
                }}
                className="h-16! px-10! rounded-2xl! bg-[#D4AF37]! hover:bg-[#B8860B]! border-none! shadow-[0_10px_25px_rgba(212,175,55,0.3)] text-white! font-black! text-lg! flex! items-center! transition-all! hover:scale-[1.03]!"
              >
                زیادکردنی زمانی نوێ
              </Button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white! border! border-gray-100 rounded-[3.5rem]! p-6! md:p-8! shadow-[0_15px_40px_rgba(0,0,0,0.02)] relative">
            <Spin
              spinning={isListPending}
              indicator={<Loader2 className="animate-spin" size={32} />}
            >
              <div className="relative z-10">
                <TableComponents<LangItem>
                  data={tableData}
                  columns={columns}
                  rowKeyAccessor="key"
                  onEdit={handleEdit}
                />
              </div>
            </Spin>
          </div>

          <ModalComponents
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setItemSelect(undefined); // ریست کردن انتخاب
              useGetlangRefetch();
            }}
            title={
              <div className="flex items-center gap-3 text-[#1A1A1A] font-black text-xl">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                  <LayoutGrid size={20} className="text-[#D4AF37]" />
                </div>
                <span>
                  {itemSelect ? "دەستکاری کردنی زمان" : "تۆمارکردنی زمانی نوێ"}
                </span>
              </div>
            }
          >
            {/* قرار دادن فرم در مودال */}
            <AddLangForm
              id={itemSelect}
              onSuccess={() => {
                setOpen(false);
                useGetlangRefetch();
              }}
            />
          </ModalComponents>
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d4af37;
            border-radius: 10px;
            border: 2px solid #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #b8860b;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default LangPage;
