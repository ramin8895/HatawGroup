"use client";

import React from "react";
import { Card, Button } from "antd"; // Input و Search حذف شدند
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

// ---- import your custom table ----
import TableComponents, { Column } from "../../../../components/TableComponents";

// ---------------------- Types ----------------------
export interface EventItem {
  key: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  status: "upcoming" | "completed" | "unknown";
}

// ------------------- Initial Data -------------------
const INITIAL_EVENTS: EventItem[] = [
  {
    key: "1",
    title: "جشنواره تابستانی موسیقی",
    startTime: "2025-06-15 18:00",
    endTime: "2025-06-15 22:00",
    description: "شبی شاد و مفرح با موسیقی زنده و حضور هنرمندان مطرح کشور.",
    status: "upcoming",
  },
  {
    key: "2",
    title: "همایش فناوری ۲۰۲۵",
    startTime: "2025-07-01 09:00",
    endTime: "2025-07-01 17:00",
    description: "کنفرانس سالانه فناوری با کارگاه‌های تخصصی و سخنرانی.",
    status: "upcoming",
  },
  {
    key: "3",
    title: "نمایشگاه هنرهای معاصر",
    startTime: "2025-05-20 10:00",
    endTime: "2025-05-25 18:00",
    description: "کاوش در هنر معاصر توسط هنرمندان محلی و بین‌المللی.",
    status: "completed",
  },
  {
    key: "4",
    title: "کارگاه آموزشی بلاکچین",
    startTime: "2025-07-10 14:00",
    endTime: "2025-07-10 17:00",
    description: "مبانی بلاکچین و کاربردهای آن در اقتصاد دیجیتال.",
    status: "upcoming",
  },
  // افزودن چند رویداد دیگر برای تست بهتر pagination و search
  {
    key: "5",
    title: "دوره کامل طراحی UI/UX",
    startTime: "2025-08-01 09:00",
    endTime: "2025-08-30 17:00",
    description: "آموزش جامع طراحی تجربه کاربری و رابط کاربری.",
    status: "upcoming",
  },
  {
    key: "6",
    title: "مسابقه آشپزی محلی",
    startTime: "2025-04-12 10:00",
    endTime: "2025-04-12 14:00",
    description: "رقابت سرآشپزها برای بهترین غذای سنتی.",
    status: "completed",
  },
  {
    key: "7",
    title: "کنفرانس امنیت سایبری",
    startTime: "2025-09-05 08:30",
    endTime: "2025-09-05 18:00",
    description: "بررسی آخرین تهدیدات و راهکارهای امنیتی در فضای آنلاین.",
    status: "upcoming",
  },
  {
    key: "8",
    title: "نمایش کمدی ایستاده",
    startTime: "2025-06-25 21:00",
    endTime: "2025-06-25 23:00",
    description: "شبی خنده‌دار با حضور برترین کمدین‌های شهر.",
    status: "upcoming",
  },
];

// ---------------------- Component ----------------------
const EventList: React.FC = () => {
  // ------------------ Columns for TableComponents ------------------
  const columns: Column<EventItem>[] = [
    { label: "شناسه", accessor: "key" },
    { label: "عنوان رویداد", accessor: "title" },
    {
      label: "تاریخ و زمان شروع",
      accessor: "startTime",
    },
    { label: "توضیحات کوتاه", accessor: "description" },
    {
      label: "وضعیت",
      accessor: "status",
    },
  ];
  const handleEdit = (event: EventItem) => {
    console.log("ویرایش رویداد با کلید:", event.key, event.title);
    // منطق باز کردن فرم ویرایش در اینجا قرار می‌گیرد
  };

  const handleDelete = (event: EventItem) => {
    console.log("حذف رویداد با کلید:", event.key, event.title);
    // منطق نمایش Modal تایید و سپس حذف در اینجا قرار می‌گیرد
  };
  // ---------------------- JSX ----------------------
  return (
    <div className="w-full h-full  bg-gray-50/50" dir="rtl">
      <Card className=" w-full mx-auto " bodyStyle={{ padding: 0, margin: 0 }}>
        {/* Header Section */}
        <div className="  flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3">
            📅 مدیریت رویدادها
          </h1>

          <Button
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
            className="bg-blue-600 hover:bg-blue-700! font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300"
          >
            افزودن رویداد جدید
          </Button>
        </div>

        {/* Custom Table */}
        <div className="p-6 md:p-8">
          <TableComponents<EventItem>
            data={INITIAL_EVENTS}
            columns={columns}
            rowKeyAccessor="key" // تعیین کلید منحصر به فرد سطر
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Card>
    </div>
  );
};

export default EventList;
