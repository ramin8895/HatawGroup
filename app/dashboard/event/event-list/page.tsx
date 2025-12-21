"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button, message, Spin } from "antd";
import { CalendarDays, Plus, Sparkles, LayoutGrid, Loader2 } from "lucide-react";

// Components
import TableComponents, { Column } from "../../../../components/TableComponents";
import ModalComponents from "@/components/Dashbord/ModalComponents";
import AddEvent from "../add-event/page";

// API Hooks
import { useDeleteEvents, useGetEvents } from "@/api/EventService/useRequest";

// ---------------------- Types ----------------------
export interface EventItem {
  key: string;
  id?: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  status: "upcoming" | "completed" | "unknown";
}

// ---------------------- Component ----------------------
const EventList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [itemSelect, setItemSelect] = useState<number>();

  // 1. Fetch Data
  const {
    data: useGetEventsData,
    isPending: isListPending,
    refetch: refetchEvents,
  } = useGetEvents();

  // 2. Delete Mutation
  const { data: deleteEvent, isPending: isDeletePending } = useDeleteEvents();

  // 3. Handlers
  const handleEdit = (event: EventItem) => {
    setItemSelect(event.id );
    setOpen(true);
  };

   const handleDelete = (event: EventItem) => {
    console.log("سڕینەوەی چالاکی:", event.key, event.title);
    setItemSelect(event.id);
  };
  // 4. Data Transformation (Memoized for performance)
const tableData = useMemo<EventItem[]>(() => {
    if (!useGetEventsData) return [];
    return useGetEventsData.map((item: any) => {
      // تعیین وضعیت به صورت صریح برای رفع خطای تایپ
      const statusValue: EventItem["status"] = 
        new Date(item.enddate) < new Date() ? "completed" : "upcoming";

      return {
        key: String(item.id),
        id: item.id,
        title: item.titleKordish || item.titleEnglish || "بێ ناونیشان",
        startTime: item.startdate,
        endTime: item.enddate,
        description: item.descriptionKordish || item.descriptionEnglish || "---",
        status: statusValue, // حالا تایپ درست است
      };
    });
  }, [useGetEventsData]);
  // 5. Table Columns
  const columns: Column<EventItem>[] = [
    { label: "ناسنامە", accessor: "key" },
    { label: "ناونیشانی چالاکی", accessor: "title" },
    { label: "کاتی دەستپێک", accessor: "startTime" },
    { label: "پوختەی وردەکاری", accessor: "description" },
    { label: "دۆخ", accessor: "status" },
  ];

  return (
    <div className="min-h-screen! bg-[#020617]! p-4! md:p-8!" dir="rtl">
      <div className="max-w-[1600px]! mx-auto!">
        
        {/* Header Section */}
        <div className="flex! flex-col! md:flex-row! justify-between! items-start! md:items-center! gap-6! mb-8! p-6! bg-white/[0.02]! border! border-white/10 rounded-[2rem]! backdrop-blur-xl shadow-2xl">
          <div className="flex! items-center! gap-4!">
            <div className="p-4! bg-indigo-500/10! rounded-2xl! border! border-indigo-500/20 shadow-lg shadow-indigo-500/5">
              <CalendarDays className="text-indigo-400" size={32} />
            </div>
            <div>
              <h1 className="text-2xl! md:text-3xl! font-black! text-white flex! items-center! gap-2! m-0!">
                بەڕێوەبردنی چالاکیەکان
                <Sparkles className="text-amber-400 hidden md:block" size={20} />
              </h1>
              <p className="text-slate-500! text-sm! mt-1! font-medium">
                لیستی گشت چالاکییەکان و بەڕێوەبردنی زانیارییەکان
              </p>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<Plus size={20} />}
            onClick={() => { 
              setItemSelect(0); 
              setOpen(true); 
            }}
            className="h-14! px-8! rounded-2xl! bg-indigo-600! hover:bg-indigo-500! border-none! shadow-xl shadow-indigo-600/20 font-bold! flex! items-center! gap-2!"
          >
            زیادکردنی چالاکی نوێ
          </Button>
        </div>

        {/* Table Container */}
        <div className="bg-white/[0.01]! border! border-white/5 rounded-[2.5rem]! overflow-hidden shadow-inner relative">
          {(!useGetEventsData) && (
            <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
              <Loader2 className="text-indigo-500 animate-spin" size={40} />
            </div>
          )}
          
          <div className="p-2! md:p-4!">
            <TableComponents<EventItem>
              data={tableData}
              columns={columns}
              rowKeyAccessor="key"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {/* Modal Component */}
        <ModalComponents
          isOpen={open}
          onClose={() => setOpen(false)}
          title={
            <div className="flex items-center gap-2 text-white font-bold">
              <LayoutGrid size={18} className="text-indigo-400" />
              <span>{itemSelect ? "دەستکاری چالاکی" : "تۆمارکردنی چالاکی"}</span>
            </div>
          }
        >
          <div className="w-full! overflow-y-auto! max-h-[80vh]! custom-scrollbar p-1!">
            <AddEvent id={itemSelect ?? undefined} />
          </div>
        </ModalComponents>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
};

export default EventList;