"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button, message, Spin, ConfigProvider, theme } from "antd";
import { CalendarDays, Plus, Sparkles, LayoutGrid, Loader2, Search } from "lucide-react";

// Components
import TableComponents, { Column } from "../../../../components/TableComponents";
import ModalComponents from "@/components/Dashbord/ModalComponents";
import AddEvent from "../add-event/page";

// API Hooks
import { useDeleteEvents, useGetEvents } from "@/api/EventService/useRequest";

export interface EventItem {
  key: string;
  id?: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  status: "upcoming" | "completed" | "unknown";
}

const EventList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [itemSelect, setItemSelect] = useState<number>();

  const {
    data: useGetEventsData,
    isPending: isListPending,
    refetch: refetchEvents,
  } = useGetEvents();

  const { data: deleteEvent, isPending: isDeletePending } = useDeleteEvents();

  const handleEdit = (event: EventItem) => {
    setItemSelect(event.id);
    setOpen(true);
  };

  const handleDelete = (event: EventItem) => {
    setItemSelect(event.id);
  };

  const tableData = useMemo<EventItem[]>(() => {
    if (!useGetEventsData) return [];
    return useGetEventsData.map((item: any) => {
      const statusValue: EventItem["status"] = 
        new Date(item.enddate) < new Date() ? "completed" : "upcoming";

      return {
        key: String(item.id),
        id: item.id,
        title: item.titleKordish || item.titleEnglish || "بێ ناونیشان",
        startTime: item.startdate,
        endTime: item.enddate,
        description: item.descriptionKordish || item.descriptionEnglish || "---",
        status: statusValue,
      };
    });
  }, [useGetEventsData]);

  const columns: Column<EventItem>[] = [
    { label: "ناسنامە", accessor: "key" },
    { label: "ناونیشانی چالاکی", accessor: "title" },
    { label: "کاتی دەستپێک", accessor: "startTime" },
    { label: "پوختەی وردەکاری", accessor: "description" },
    { label: "دۆخ", accessor: "status" },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#D4AF37",
          borderRadius: 16,
        }
      }}
    >
      <div className="min-h-screen! bg-[#F8F9FA]! p-4! md:p-10! font-sans selection:bg-[#D4AF37]/20" dir="rtl">
        <div className="max-w-[1600px]! mx-auto! animate-in fade-in duration-700">
          
          {/* Header Section - Premium White */}
          <div className="flex! flex-col! lg:flex-row! justify-between! items-center! gap-8! mb-10! p-8! bg-white border! border-gray-100 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex! items-center! gap-6! relative z-10">
              <div className="p-5! bg-[#D4AF37]/10 rounded-[1.5rem] border! border-[#D4AF37]/20 shadow-sm text-[#D4AF37]">
                <CalendarDays size={36} />
              </div>
              <div>
                <h1 className="text-3xl! font-black! text-[#1A1A1A] flex! items-center! gap-3! m-0! tracking-tight">
                  بەڕێوەبردنی چالاکیەکان
                  <Sparkles className="text-[#D4AF37]" size={22} />
                </h1>
                <p className="text-gray-400! text-sm! mt-2! font-bold uppercase tracking-widest">
                  Event Management System | Hataw Group
                </p>
              </div>
            </div>

            <div className="flex! items-center! gap-4! relative z-10">
              <Button
                type="primary"
                icon={<Plus size={20} className="ml-1" />}
                onClick={() => { 
                  setItemSelect(0); 
                  setOpen(true); 
                }}
                className="h-16! px-10! rounded-2xl! bg-[#D4AF37]! hover:bg-[#B8860B]! border-none! shadow-[0_10px_25px_rgba(212,175,55,0.3)] text-white! font-black! text-lg! flex! items-center! transition-all! hover:scale-[1.03]!"
              >
                زیادکردنی چالاکی نوێ
              </Button>
            </div>
          </div>

          {/* Table Container - Sleek & Clean */}
          <div className="bg-white! border! border-gray-100 rounded-[3.5rem]! p-6! md:p-8! shadow-[0_15px_40px_rgba(0,0,0,0.02)] relative">
            {isListPending && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] rounded-[3.5rem] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="text-[#D4AF37] animate-spin" size={48} />
                  <span className="text-[#D4AF37] font-black tracking-widest text-xs uppercase">Loading Events...</span>
                </div>
              </div>
            )}
            
            <div className="relative z-10">
              <TableComponents<EventItem>
                data={tableData}
                columns={columns}
                rowKeyAccessor="key"
                onEdit={handleEdit}
                onDelete={handleDelete}
                // نکته: استایل‌های داخلی جدول (TableComponents) باید از متغیرهای CSS یا Props برای هماهنگی کامل استفاده کنند.
              />
            </div>
          </div>

          {/* Modal Component - Luxury Glass */}
          <ModalComponents
            isOpen={open}
            onClose={() => setOpen(false)}
            title={
              <div className="flex items-center gap-3 text-[#1A1A1A] font-black text-xl">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                  <LayoutGrid size={20} className="text-[#D4AF37]" />
                </div>
                <span>{itemSelect ? "دەستکاری چالاکی" : "تۆمارکردنی چالاکی نوێ"}</span>
              </div>
            }
          >
            <div className="w-full! overflow-y-auto! max-h-[85vh]! custom-scrollbar p-2!">
              <AddEvent id={itemSelect || undefined} />
            </div>
          </ModalComponents>

        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #F1F1F1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #D4AF37;
            border-radius: 10px;
            border: 2px solid #F1F1F1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #B8860B;
          }
          /* استایل‌های احتمالی برای جدول در حالت روشن */
          .ant-table {
            background: transparent !important;
          }
          .ant-table-thead > tr > th {
            background: #F9FAFB !important;
            color: #9CA3AF !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            font-size: 11px !important;
            letter-spacing: 0.1em !important;
            border-bottom: 1px solid #F3F4F6 !important;
            padding: 20px !important;
          }
          .ant-table-tbody > tr > td {
            padding: 20px !important;
            border-bottom: 1px solid #F9FAFB !important;
            color: #4B5563 !important;
            font-weight: 600 !important;
          }
          .ant-table-row:hover > td {
            background: #FEFCE8 !important; /* یک زرد بسیار ملایم برای هوور */
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default EventList;