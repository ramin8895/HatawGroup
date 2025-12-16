"use client";

import React from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// ---- import your custom table ----
import TableComponents, {
  Column,
} from "../../../../components/TableComponents";
import { useGetEvents } from "@/api/EventService/useRequest";


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
const INITIAL_EVENTS: EventItem[] = [];

// ---------------------- Component ----------------------
const EventList: React.FC = () => {
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

  const handleEdit = (event: EventItem) => {
    console.log("دەستکاری چالاکی:", event.key, event.title);
  };

  const handleDelete = (event: EventItem) => {
    console.log("سڕینەوەی چالاکی:", event.key, event.title);
  };
  const {
  data: useGetEventsData,
  isFetched: useGetEventsIsFetched,
  isPending: useGetEventsIsPending,
} = useGetEvents();
const tableData: EventItem[] =
  useGetEventsData?.map((item) => ({
    key: String(item.id),
    title: item.titleKordish || item.titleEnglish,
    startTime: item.startdate,
    endTime: item.enddate,
    description: item.descriptionKordish || item.descriptionEnglish,
    status: new Date(item.enddate) < new Date()
      ? "completed"
      : "upcoming",
  })) || INITIAL_EVENTS;
  // ---------------------- JSX ----------------------
  return (
    <div className="w-full h-full bg-gray-50/50" dir="rtl">
      <Card className="w-full mx-auto" bodyStyle={{ padding: 0, margin: 0 }}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3">
            📅 بەڕێوەبردنی چالاکیەکان
          </h1>
        </div>

        {/* Table */}
        <div className="p-6 md:p-8">
          <TableComponents<EventItem>
            data={tableData || INITIAL_EVENTS}
            columns={columns}
            rowKeyAccessor="key"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Card>
    </div>
  );
};

export default EventList;
