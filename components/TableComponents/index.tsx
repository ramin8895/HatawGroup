"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Button, ConfigProvider, theme } from "antd";
import { Edit3, Trash2, Search, ChevronRight, ChevronLeft, Columns, LayoutList } from "lucide-react";

// ۱. اصلاح اینترفیس برای پذیرش تابع رندر سفارشی
export interface Column<T> {
  label: string;
  accessor: keyof T;
  render?: (value: any, record: T) => React.ReactNode; // تابع رندر اختیاری
}

interface TableComponentsProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKeyAccessor: keyof T;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
  isLoading?: boolean; // اضافه کردن لودینگ برای تجربه کاربری بهتر
}

const TableComponents = <T,>({
  data,
  columns,
  rowKeyAccessor,
  onEdit,
  onDelete,
}: TableComponentsProps<T>) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number | undefined>>({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumnKey, setResizingColumnKey] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.reduce((acc, col) => {
      acc[col.accessor as string] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const filteredData = useMemo(() => {
    return data.filter((row: any) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const toggleColumn = (accessor: keyof T) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [accessor as string]: !prev[accessor as string],
    }));
  };

  const handleRowClick = useCallback(
    (row: T) => {
      const currentKey = row[rowKeyAccessor] as string | number;
      setSelectedRowKey((prevKey) => (prevKey === currentKey ? null : currentKey));
    },
    [rowKeyAccessor]
  );

  const startResizing = useCallback((e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizingColumnKey(key);
    setStartX(e.clientX);
    document.body.style.cursor = "col-resize";
  }, []);

  const onResizing = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizingColumnKey) return;
    const deltaX = startX - e.clientX; 
    setColumnWidths((prev) => ({
      ...prev,
      [resizingColumnKey]: Math.max(80, (prev[resizingColumnKey] || 150) + deltaX),
    }));
    setStartX(e.clientX);
  }, [isResizing, resizingColumnKey, startX]);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    setResizingColumnKey(null);
    document.body.style.cursor = "default";
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousemove", onResizing);
    document.addEventListener("mouseup", stopResizing);
    return () => {
      document.removeEventListener("mousemove", onResizing);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [onResizing, stopResizing]);

  const visibleColumnAccessors = columns.filter((col) => visibleColumns[col.accessor as string]);
  const hasActionsColumn = !!onEdit || !!onDelete;
  const selectedRowData = data.find((row) => row[rowKeyAccessor] === selectedRowKey);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: "#6366f1" } }}>
      <div className="p-4! bg-[#020617]! min-h-screen!" dir="rtl">
        <div className="max-w-[1600px]! mx-auto!">
          
          {/* Top Toolbar */}
          <div className="flex! flex-col! lg:flex-row! justify-between! items-center! gap-4! mb-6! p-4! bg-white/[0.02]! border! border-white/10 rounded-2xl! backdrop-blur-md">
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="گەڕان..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40! border! border-white/10 focus:border-indigo-500/50 rounded-xl! py-2.5! pr-11! pl-4! outline-none text-sm text-slate-200 transition-all shadow-inner"
              />
            </div>

            <div className="flex! items-center! gap-3! w-full lg:w-auto">
              {hasActionsColumn && (
                <div className="flex! gap-2! border-l! border-white/10 pl-4!">
                  <Button
                    danger
                    icon={<Trash2 size={16} />}
                    disabled={!selectedRowKey}
                    onClick={() => onDelete && selectedRowData && onDelete(selectedRowData)}
                    className="h-10! rounded-lg! border-red-500/20! bg-red-500/10! hover:bg-red-500/20!"
                  >
                    حذف
                  </Button>
                  <Button
                    icon={<Edit3 size={16} />}
                    disabled={!selectedRowKey}
                    onClick={() => onEdit && selectedRowData && onEdit(selectedRowData)}
                    className="h-10! rounded-lg! border-indigo-500/20! bg-indigo-500/10!"
                  >
                    دەستکاری
                  </Button>
                </div>
              )}
              
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="h-10! px-3! bg-black/40! border! border-white/10 rounded-lg! text-xs text-slate-300 outline-none cursor-pointer"
              >
                {[10, 20, 50].map(size => <option key={size} value={size}>{size} دانە</option>)}
              </select>
            </div>
          </div>

          {/* Column Toggle */}
          <div className="flex! flex-wrap! gap-2! mb-4! px-1!">
             <div className="flex! items-center! gap-2! text-slate-500! text-[10px]! font-bold! uppercase! ml-2!">
                <Columns size={12} /> ستونەکان:
             </div>
            {columns.map((col) => (
              <button
                key={String(col.accessor)}
                onClick={() => toggleColumn(col.accessor)}
                className={`px-3! py-1! rounded-lg! text-[11px] font-medium transition-all ${
                  visibleColumns[col.accessor as string]
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    : "bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10"
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white/[0.02]! border! border-white/10 rounded-2xl! overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full! border-collapse!">
                <thead>
                  <tr className="bg-white/[0.03]! border-b! border-white/10">
                    {visibleColumnAccessors.map((col) => (
                      <th
                        key={String(col.accessor)}
                        style={{ width: columnWidths[String(col.accessor)] || 'auto' }}
                        className="p-4! text-right text-xs font-bold text-slate-400 uppercase tracking-wider relative group"
                      >
                        {col.label}
                        <div
                          onMouseDown={(e) => startResizing(e, String(col.accessor))}
                          className="absolute left-0 top-1/4 bottom-1/4 w-0.5! bg-indigo-500/0 group-hover:bg-indigo-500/40 cursor-col-resize transition-all"
                        />
                      </th>
                    ))}
                    {hasActionsColumn && (
                      <th className="p-4! text-center text-xs font-bold text-slate-400 bg-black/40! border-r! border-white/10 sticky left-0 z-10">
                        کردارەکان
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y! divide-white/5">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row) => {
                      const isSelected = row[rowKeyAccessor] === selectedRowKey;
                      return (
                        <tr
                          key={String(row[rowKeyAccessor])}
                          onClick={() => handleRowClick(row)}
                          className={`group transition-colors cursor-pointer ${
                            isSelected ? "bg-indigo-500/10" : "hover:bg-white/[0.02]"
                          }`}
                        >
                          {visibleColumnAccessors.map((col) => (
                            <td key={String(col.accessor)} className="p-4! text-sm text-slate-300 whitespace-nowrap">
                              {/* ۲. بخش اصلاح شده: بررسی وجود تابع رندر */}
                              {col.render 
                                ? col.render(row[col.accessor], row) 
                                : String(row[col.accessor] ?? '')}
                            </td>
                          ))}
                          {hasActionsColumn && (
                            <td className="p-2! text-center sticky left-0 bg-[#0a0f1e]! border-r! border-white/10 shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.5)]">
                              <div className="flex! gap-1! justify-center">
                                <Button 
                                  type="text" 
                                  size="small"
                                  icon={<Edit3 size={14} className="text-indigo-400" />} 
                                  onClick={(e) => { e.stopPropagation(); onEdit?.(row); }}
                                  className="hover:bg-indigo-500/20!"
                                />
                                <Button 
                                  type="text" 
                                  size="small"
                                  danger
                                  icon={<Trash2 size={14} />} 
                                  onClick={(e) => { e.stopPropagation(); onDelete?.(row); }}
                                  className="hover:bg-red-500/20!"
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={100} className="p-20! text-center">
                        <LayoutList className="mx-auto! mb-4! text-slate-700" size={48} />
                        <div className="text-slate-500 font-medium">هیچ داتایەک نەدۆزرایەوە</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex! flex-col! sm:flex-row! justify-between! items-center! gap-4! mt-6! px-2!">
            <div className="text-xs! text-slate-500! font-medium">
              نیشاندان <span className="text-indigo-400">{(currentPage - 1) * pageSize + 1}</span> بۆ <span className="text-indigo-400">{Math.min(currentPage * pageSize, filteredData.length)}</span> لە <span className="text-indigo-400">{filteredData.length}</span> تۆمار
            </div>
            
            <div className="flex! items-center! gap-2!">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2! rounded-lg! border! border-white/10 bg-white/5 text-slate-400 hover:text-white disabled:opacity-20 transition-all"
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex! items-center! gap-1!">
                <span className="bg-indigo-600! text-white! px-3! py-1! rounded-lg! text-xs font-bold">{currentPage}</span>
                <span className="text-slate-600 px-1">/</span>
                <span className="text-slate-400 text-xs">{totalPages}</span>
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2! rounded-lg! border! border-white/10 bg-white/5 text-slate-400 hover:text-white disabled:opacity-20 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default TableComponents;