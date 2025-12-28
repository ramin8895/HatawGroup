"use client";

import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";

// ---- import your custom table ----
import TableComponents, { Column } from "@/components/TableComponents";
import { useDeleteEvents, useGetEvents } from "@/api/EventService/useRequest";
import ModalComponents from "@/components/Dashbord/ModalComponents";

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
// ------------------- Initial Data -------------------
const INITIAL_EVENTS: EventItem[] = [];

// ---------------------- Component ----------------------
const EventList: React.FC = () => {
  const [itemSelect, setItemSelect] = useState<number>();
  const [open, setOpen] = useState(false);

  // ------------------ Columns for TableComponents ------------------
  const columns: Column<EventItem>[] = [
    { label: "ناسنامە", accessor: "key" },
    { label: "ناونیشانی چالاکی", accessor: "title" },
    {
      label: "کاتی دەستپێک",
      accessor: "startTime",
    },
    { label: "پوختەی وردەکاری", accessor: "description" },
    {
      label: "دۆخ",
      accessor: "status",
    },
  ];

  const {
    data: useDeleteEventsDelete,
    isFetching: useDeleteEventsDeleteisFetching,
  } = useDeleteEvents(itemSelect);

  // ---------------------- Handlers ----------------------
  const handleEdit = (event: EventItem) => {
    setOpen(true);
  };

  const handleDelete = (event: EventItem) => {
    setItemSelect(event.id);
  };

  const {
    data: useGetEventsData,
  } = useGetEvents();

  const tableData: EventItem[] =
    useGetEventsData?.map((item: any) => ({
      key: String(item.id),
      id: item.id,
      title: item.titleKordish || item.titleEnglish,
      startTime: item.startdate,
      endTime: item.enddate,
      description: item.descriptionKordish || item.descriptionEnglish,
      status: new Date(item.enddate) < new Date() ? "completed" : "upcoming",
    })) || INITIAL_EVENTS;

  // ---------------------- JSX ----------------------
  return (
    <div className="w-full h-full bg-[#F8F9FA]/50 min-h-screen" dir="rtl">
      <Card 
        className="w-full mx-auto border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white" 
        bodyStyle={{ padding: 0 }}
      >
        {/* --- Luxury Header --- */}
        <div className="px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-50">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shadow-inner">
              <CalendarOutlined style={{ fontSize: '28px' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 m-0 tracking-tight">
                بەڕێوەبردنی <span className="text-[#D4AF37]">چالاکیەکان</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1 font-medium">لیستی وردەکاری و کاتەکانی چالاکییە تۆمارکراوەکان</p>
            </div>
          </div>

          <Button 
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] border-none shadow-lg shadow-[#D4AF37]/30 hover:scale-105 transition-transform font-bold text-white flex items-center"
          >
            زیادکردنی چالاکی
          </Button>
        </div>

        {/* --- Table Section --- */}
        <div className="p-6 md:p-10 bg-[#FCFCFC]">
          <div className="bg-white border border-slate-100 rounded-[2rem] p-2 shadow-sm">
            <TableComponents<EventItem>
              data={tableData || INITIAL_EVENTS}
              columns={columns}
              rowKeyAccessor="key"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </Card>

      {/* Global CSS for Table Customization */}
      <style jsx global>{`
        .ant-table {
          background: transparent !important;
        }
        .ant-table-thead > tr > th {
          background: #fdfdfd !important;
          color: #94a3b8 !important;
          font-weight: 800 !important;
          text-transform: uppercase;
          font-size: 12px;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 20px !important;
        }
        .ant-table-tbody > tr > td {
          padding: 20px !important;
          color: #1e293b !important;
          font-weight: 500;
        }
        .ant-table-row:hover > td {
          background: #fffcf0 !important; /* لایت طلایی برای هاور */
        }
        /* استایل سفارشی برای وضعیت (Status) در صورت استفاده در جدول شما */
        .status-upcoming {
          color: #D4AF37;
          background: rgba(212, 175, 55, 0.1);
          padding: 4px 12px;
          border-radius: 8px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default EventList;