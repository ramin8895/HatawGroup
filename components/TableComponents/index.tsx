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
        algorithm: theme.darkAlgorithm, 
        token: { 
          colorPrimary: "#D4AF37",
          colorBgBase: "#050505",
          borderRadius: 12
        } 
      }}
    >
      <div className="p-6! bg-[#050505]! min-h-screen! font-sans" dir="rtl">
        <div className="max-w-[1600px]! mx-auto!">
          
          {/* Top Toolbar */}
          <div className="flex! flex-col! lg:flex-row! justify-between! items-center! gap-4! mb-6! p-5! bg-white/[0.02]! border! border-[#D4AF37]/20 rounded-3xl! backdrop-blur-xl shadow-2xl">
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#D4AF37] transition-colors" />
              <input
                type="text"
                placeholder="گەڕان بۆ هەر زانیارییەک..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/60! border! border-white/10 focus:border-[#D4AF37]/50 rounded-2xl! py-3! pr-11! pl-4! outline-none text-sm text-slate-200 transition-all shadow-inner placeholder:text-slate-600"
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
                    className="h-11! px-6! rounded-xl! border-red-500/20! bg-red-500/10! hover:bg-red-500/20! font-bold!"
                  >
                    حذف
                  </Button>
                  <Button
                    icon={<Edit3 size={16} />}
                    disabled={!selectedRowKey}
                    onClick={() => onEdit && selectedRowData && onEdit(selectedRowData)}
                    className="h-11! px-6! rounded-xl! border-[#D4AF37]/30! bg-[#D4AF37]/10! text-[#D4AF37] hover:bg-[#D4AF37]/20! font-bold!"
                  >
                    دەستکاری
                  </Button>
                </div>
              )}
              
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="h-11! px-4! bg-black/60! border! border-white/10 rounded-xl! text-xs font-bold text-[#D4AF37] outline-none cursor-pointer hover:border-[#D4AF37]/40 transition-all"
              >
                {[10, 20, 50].map(size => <option key={size} value={size}>{size} تۆمار</option>)}
              </select>
            </div>
          </div>

          {/* Column Toggle */}
          <div className="flex! flex-wrap! gap-2! mb-5! px-2!">
             <div className="flex! items-center! gap-2! text-[#D4AF37]/60 text-[10px]! font-black! uppercase! tracking-widest ml-3!">
                <Columns size={14} /> ستونەکان:
             </div>
            {columns.map((col) => (
              <button
                key={String(col.accessor)}
                onClick={() => toggleColumn(col.accessor)}
                className={`px-4! py-1.5! rounded-full! text-[11px] font-bold transition-all duration-300 ${
                  visibleColumns[col.accessor as string]
                    ? "bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10"
                    : "bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10"
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white/[0.01]! border! border-white/5 rounded-[2rem]! overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full! border-collapse!">
                <thead>
                  <tr className="bg-white/[0.03]! border-b! border-white/10">
                    {visibleColumnAccessors.map((col) => (
                      <th
                        key={String(col.accessor)}
                        style={{ width: columnWidths[String(col.accessor)] || 'auto' }}
                        className="p-5! text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] relative group"
                      >
                        {col.label}
                        <div
                          onMouseDown={(e) => startResizing(e, String(col.accessor))}
                          className="absolute left-0 top-1/4 bottom-1/4 w-[1px]! bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/40 cursor-col-resize transition-all"
                        />
                      </th>
                    ))}
                    {hasActionsColumn && (
                      <th className="p-5! text-center text-[11px] font-black text-[#D4AF37] bg-black/60! border-r! border-white/10 sticky left-0 z-10 uppercase tracking-widest">
                        کردارەکان
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y! divide-white/[0.04]">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row) => {
                      const isSelected = row[rowKeyAccessor] === selectedRowKey;
                      return (
                        <tr
                          key={String(row[rowKeyAccessor])}
                          onClick={() => handleRowClick(row)}
                          className={`group transition-all duration-300 cursor-pointer ${
                            isSelected ? "bg-[#D4AF37]/10" : "hover:bg-white/[0.02]"
                          }`}
                        >
                          {visibleColumnAccessors.map((col) => (
                            <td key={String(col.accessor)} className={`p-5! text-sm font-medium transition-colors ${isSelected ? "text-[#D4AF37]" : "text-slate-300"} whitespace-nowrap`}>
                              {col.render 
                                ? col.render(row[col.accessor], row) 
                                : String(row[col.accessor] ?? '')}
                            </td>
                          ))}
                          {hasActionsColumn && (
                            <td className="p-3! text-center sticky left-0 bg-[#080808]! border-r! border-white/10 shadow-[-15px_0_25px_-5px_rgba(0,0,0,0.7)]">
                              <div className="flex! gap-2! justify-center">
                                <Button 
                                  type="text" 
                                  size="small"
                                  icon={<Edit3 size={16} className="text-[#D4AF37]" />} 
                                  onClick={(e) => { e.stopPropagation(); onEdit?.(row); }}
                                  className="hover:bg-[#D4AF37]/20! h-9! w-9! rounded-lg!"
                                />
                                <Button 
                                  type="text" 
                                  size="small"
                                  danger
                                  icon={<Trash2 size={16} />} 
                                  onClick={(e) => { e.stopPropagation(); onDelete?.(row); }}
                                  className="hover:bg-red-500/20! h-9! w-9! rounded-lg!"
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={100} className="p-24! text-center">
                        <div className="inline-flex! p-6! bg-white/[0.02] rounded-full! mb-4!">
                           <LayoutList className="text-slate-800" size={54} />
                        </div>
                        <div className="text-slate-500 font-bold text-lg!">هیچ زانیارییەک لێرە نییە</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex! flex-col! sm:flex-row! justify-between! items-center! gap-4! mt-8! px-4!">
            <div className="text-[11px]! text-slate-500! font-bold uppercase tracking-widest">
              نیشاندان <span className="text-[#D4AF37] px-1">{(currentPage - 1) * pageSize + 1}</span> بۆ <span className="text-[#D4AF37] px-1">{Math.min(currentPage * pageSize, filteredData.length)}</span> لە کۆی <span className="text-[#D4AF37] px-1">{filteredData.length}</span> تۆمار
            </div>
            
            <div className="flex! items-center! gap-3!">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5! rounded-xl! border! border-white/10 bg-white/5 text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 disabled:opacity-10 transition-all"
              >
                <ChevronRight size={20} />
              </button>
              
              <div className="flex! items-center! gap-2! px-4! py-2! bg-white/[0.03] rounded-xl! border! border-white/5">
                <span className="text-[#D4AF37] text-sm font-black">{currentPage}</span>
                <span className="text-slate-700 font-bold">/</span>
                <span className="text-slate-500 text-xs font-bold">{totalPages}</span>
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5! rounded-xl! border! border-white/10 bg-white/5 text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 disabled:opacity-10 transition-all"
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