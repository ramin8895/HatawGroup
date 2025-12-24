"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Button, ConfigProvider, theme } from "antd";
import { Edit3, Trash2, Search, ChevronRight, ChevronLeft, Columns, LayoutList } from "lucide-react";

export interface Column<T> {
  label: string;
  accessor: keyof T;
  render?: (value: any, record: T) => React.ReactNode;
}

interface TableComponentsProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKeyAccessor: keyof T;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
  isLoading?: boolean;
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
    <ConfigProvider 
      theme={{ 
        algorithm: theme.defaultAlgorithm, 
        token: { 
          colorPrimary: "#D4AF37",
          colorBgBase: "#FFFFFF",
          borderRadius: 16
        } 
      }}
    >
      <div className="p-2! bg-transparent! font-sans" dir="rtl">
        <div className="max-w-full! mx-auto!">
          
          {/* Top Toolbar */}
          <div className="flex! flex-col! lg:flex-row! justify-between! items-center! gap-4! mb-6! p-5! bg-white! border! border-slate-100 rounded-[2rem]! shadow-sm">
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
              <input
                type="text"
                placeholder="گەڕان بۆ هەر زانیارییەک..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50! border! border-slate-100 focus:border-[#D4AF37]/40 focus:ring-4 focus:ring-[#D4AF37]/5 rounded-2xl! py-3! pr-11! pl-4! outline-none text-sm text-slate-700 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex! items-center! gap-3! w-full lg:w-auto">
              {hasActionsColumn && (
                <div className="flex! gap-2! border-l! border-slate-100 pl-4!">
                  <Button
                    danger
                    icon={<Trash2 size={16} />}
                    disabled={!selectedRowKey}
                    onClick={() => onDelete && selectedRowData && onDelete(selectedRowData)}
                    className="h-11! px-6! rounded-xl! border-rose-100! bg-rose-50! hover:bg-rose-100! font-bold! text-rose-600!"
                  >
                    حذف
                  </Button>
                  <Button
                    icon={<Edit3 size={16} />}
                    disabled={!selectedRowKey}
                    onClick={() => onEdit && selectedRowData && onEdit(selectedRowData)}
                    className="h-11! px-6! rounded-xl! border-[#D4AF37]/20! bg-[#D4AF37]/5! text-[#D4AF37] hover:bg-[#D4AF37]/10! font-bold!"
                  >
                    دەستکاری
                  </Button>
                </div>
              )}
              
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="h-11! px-4! bg-white! border! border-slate-100 rounded-xl! text-xs font-bold text-slate-600 outline-none cursor-pointer hover:border-[#D4AF37]/40 transition-all shadow-sm"
              >
                {[10, 20, 50].map(size => <option key={size} value={size}>{size} تۆمار</option>)}
              </select>
            </div>
          </div>

          {/* Column Toggle */}
          <div className="flex! flex-wrap! gap-2! mb-5! px-2!">
             <div className="flex! items-center! gap-2! text-slate-400 text-[10px]! font-black! uppercase! tracking-widest ml-3!">
                <Columns size={14} /> ستونەکان:
             </div>
            {columns.map((col) => (
              <button
                key={String(col.accessor)}
                onClick={() => toggleColumn(col.accessor)}
                className={`px-4! py-1.5! rounded-full! text-[11px] font-bold transition-all duration-300 border ${
                  visibleColumns[col.accessor as string]
                    ? "bg-[#D4AF37] border-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/20"
                    : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white! border! border-slate-100 rounded-[2rem]! overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full! border-collapse!">
                <thead>
                  <tr className="bg-[#F8F9FA]! border-b! border-slate-100">
                    {visibleColumnAccessors.map((col) => (
                      <th
                        key={String(col.accessor)}
                        style={{ width: columnWidths[String(col.accessor)] || 'auto' }}
                        className="p-5! text-right text-[11px] font-black text-slate-500 uppercase tracking-widest relative group"
                      >
                        {col.label}
                        <div
                          onMouseDown={(e) => startResizing(e, String(col.accessor))}
                          className="absolute left-0 top-1/4 bottom-1/4 w-[2px]! bg-slate-200 opacity-0 group-hover:opacity-100 cursor-col-resize transition-all"
                        />
                      </th>
                    ))}
                    {hasActionsColumn && (
                      <th className="p-5! text-center text-[11px] font-black text-[#D4AF37] bg-slate-50! border-r! border-slate-100 sticky left-0 z-10 uppercase tracking-widest">
                        کردارەکان
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y! divide-slate-50">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row) => {
                      const isSelected = row[rowKeyAccessor] === selectedRowKey;
                      return (
                        <tr
                          key={String(row[rowKeyAccessor])}
                          onClick={() => handleRowClick(row)}
                          className={`group transition-all duration-300 cursor-pointer ${
                            isSelected ? "bg-[#D4AF37]/5" : "hover:bg-slate-50/50"
                          }`}
                        >
                          {visibleColumnAccessors.map((col) => (
                            <td key={String(col.accessor)} className={`p-5! text-sm font-medium transition-colors ${isSelected ? "text-[#D4AF37]" : "text-slate-600"} whitespace-nowrap`}>
                              {col.render 
                                ? col.render(row[col.accessor], row) 
                                : String(row[col.accessor] ?? '')}
                            </td>
                          ))}
                          {hasActionsColumn && (
                            <td className="p-3! text-center sticky left-0 bg-white! border-r! border-slate-50 shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                              <div className="flex! gap-2! justify-center">
                                <Button 
                                  type="text" 
                                  size="small"
                                  icon={<Edit3 size={16} className="text-[#D4AF37]" />} 
                                  onClick={(e) => { e.stopPropagation(); onEdit?.(row); }}
                                  className="hover:bg-[#D4AF37]/10! h-9! w-9! rounded-lg!"
                                />
                                <Button 
                                  type="text" 
                                  size="small"
                                  danger
                                  icon={<Trash2 size={16} />} 
                                  onClick={(e) => { e.stopPropagation(); onDelete?.(row); }}
                                  className="hover:bg-rose-50! h-9! w-9! rounded-lg!"
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={100} className="p-24! text-center bg-white">
                        <div className="inline-flex! p-6! bg-slate-50 rounded-full! mb-4!">
                           <LayoutList className="text-slate-200" size={54} />
                        </div>
                        <div className="text-slate-400 font-bold text-lg!">هیچ زانیارییەک لێرە نییە</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex! flex-col! sm:flex-row! justify-between! items-center! gap-4! mt-8! px-4!">
            <div className="text-[11px]! text-slate-400! font-bold uppercase tracking-widest">
              نیشاندان <span className="text-[#D4AF37] px-1 font-black">{(currentPage - 1) * pageSize + 1}</span> بۆ <span className="text-[#D4AF37] px-1 font-black">{Math.min(currentPage * pageSize, filteredData.length)}</span> لە کۆی <span className="text-[#D4AF37] px-1 font-black">{filteredData.length}</span> تۆمار
            </div>
            
            <div className="flex! items-center! gap-3!">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5! rounded-xl! border! border-slate-100 bg-white text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
              
              <div className="flex! items-center! gap-2! px-4! py-2! bg-slate-50 rounded-xl! border! border-slate-100">
                <span className="text-[#D4AF37] text-sm font-black">{currentPage}</span>
                <span className="text-slate-300 font-bold">/</span>
                <span className="text-slate-400 text-xs font-bold">{totalPages}</span>
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5! rounded-xl! border! border-slate-100 bg-white text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default TableComponents;