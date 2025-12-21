import React, { useState, useMemo, useCallback } from "react";
import { Button } from "antd";
import { Edit3, Trash2, Search, ChevronRight, ChevronLeft } from "lucide-react"; // آیکون‌های مدرن

export interface Column<T> {
  label: string;
  accessor: keyof T;
}

interface TableComponentsProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKeyAccessor: keyof T;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
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
    setCurrentPage(1);
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

  // منطق Resizing
  const startResizing = useCallback((e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizingColumnKey(key);
    setStartX(e.clientX);
    document.body.style.cursor = "col-resize";
  }, []);

  const onResizing = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizingColumnKey) return;
    const deltaX = startX - e.clientX; // معکوس برای RTL
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
  }, [isResizing]);

  React.useEffect(() => {
    document.addEventListener("mousemove", onResizing);
    document.addEventListener("mouseup", stopResizing);
    return () => {
      document.removeEventListener("mousemove", onResizing);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [onResizing, stopResizing]);

  const visibleColumnAccessors = columns.filter((col) => visibleColumns[col.accessor as string]);
  const hasActionsColumn = onEdit || onDelete;
  const selectedRowData = filteredData.find((row) => row[rowKeyAccessor] === selectedRowKey);

  return (
    <div className="p-6! bg-slate-50/50 rounded-[2.5rem]! border border-slate-200/60 shadow-2xl shadow-slate-200/50" dir="rtl">
      
      {/* Header Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6! mb-8!">
        {/* Modern Search */}
        <div className="relative w-full lg:max-w-md group">
          <div className="absolute inset-y-0 right-0 pr-4! flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="جستجو در اطلاعات جدول..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl! p-4! pr-12! shadow-sm transition-all outline-none text-slate-600 placeholder:text-slate-400"
          />
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3! w-full lg:w-auto justify-center">
          {hasActionsColumn && (
            <>
              <Button
                type="primary"
                danger
                icon={<Trash2 size={16} />}
                disabled={!selectedRowKey || !onDelete}
                onClick={() => onDelete && selectedRowData && onDelete(selectedRowData)}
                className="h-12! px-6! rounded-xl! border-0! shadow-lg shadow-red-100! flex items-center gap-2!"
              >
                حذف انتخاب شده
              </Button>
              <Button
                icon={<Edit3 size={16} />}
                disabled={!selectedRowKey || !onEdit}
                onClick={() => onEdit && selectedRowData && onEdit(selectedRowData)}
                className="h-12! px-6! rounded-xl! border-slate-200! shadow-sm flex items-center gap-2!"
              >
                ویرایش
              </Button>
            </>
          )}
          
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="h-12! px-4! bg-white border border-slate-200 rounded-xl! text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {[10, 20, 50].map(size => <option key={size} value={size}>{size} ردیف</option>)}
          </select>
        </div>
      </div>

      {/* Column Chips */}
      <div className="flex flex-wrap gap-2! mb-6! p-2! bg-slate-100/50 rounded-2xl!">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3! py-2!">نمایش ستون‌ها:</span>
        {columns.map((col) => (
          <button
            key={String(col.accessor)}
            onClick={() => toggleColumn(col.accessor)}
            className={`px-4! py-1.5! rounded-xl! text-xs font-semibold transition-all duration-300 ${
              visibleColumns[col.accessor as string]
                ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[1.5rem]! border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                {visibleColumnAccessors.map((col) => (
                  <th
                    key={String(col.accessor)}
                    style={{ width: columnWidths[String(col.accessor)] || 'auto' }}
                    className="p-5! text-right text-sm font-bold text-slate-600 relative group"
                  >
                    {col.label}
                    <div
                      onMouseDown={(e) => startResizing(e, String(col.accessor))}
                      className="resizer absolute left-0 top-0 bottom-0 w-1! cursor-col-resize hover:bg-indigo-400 transition-colors"
                    />
                  </th>
                ))}
                {hasActionsColumn && (
                  <th className="p-5! text-center text-sm font-bold text-slate-600 bg-slate-50/80 sticky left-0 border-r border-slate-200">
                    عملیات
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const isSelected = row[rowKeyAccessor] === selectedRowKey;
                  return (
                    <tr
                      key={row[rowKeyAccessor] as string}
                      onClick={() => handleRowClick(row)}
                      className={`group transition-all duration-200 cursor-pointer ${
                        isSelected ? "bg-indigo-50/40" : "hover:bg-slate-50/80"
                      }`}
                    >
                      {visibleColumnAccessors.map((col) => (
                        <td key={String(col.accessor)} className="p-5! text-sm text-slate-600 whitespace-nowrap">
                          {String(row[col.accessor])}
                        </td>
                      ))}
                      {hasActionsColumn && (
                        <td className="p-3! text-center sticky left-0 bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100">
                          <div className="flex gap-1! justify-center">
                            {onEdit && (
                              <Button 
                                type="text" 
                                icon={<Edit3 size={16} className="text-indigo-500" />} 
                                onClick={(e) => { e.stopPropagation(); onEdit(row); }}
                                className="hover:bg-indigo-50! rounded-lg!"
                              />
                            )}
                            {onDelete && (
                              <Button 
                                type="text" 
                                danger
                                icon={<Trash2 size={16} />} 
                                onClick={(e) => { e.stopPropagation(); onDelete(row); }}
                                className="hover:bg-red-50! rounded-lg!"
                              />
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={100} className="p-20! text-center">
                    <div className="flex flex-col items-center gap-2!">
                      <span className="text-slate-400 font-medium text-lg!">هیچ اطلاعاتی یافت نشد</span>
                      <span className="text-slate-300 text-sm!">دوباره جستجو کنید یا فیلترها را تغییر دهید</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4! mt-8! px-2!">
        <div className="text-sm text-slate-400 font-medium">
          نمایش <span className="text-slate-700">{(currentPage - 1) * pageSize + 1}</span> تا <span className="text-slate-700">{Math.min(currentPage * pageSize, filteredData.length)}</span> از <span className="text-slate-700">{filteredData.length}</span> مورد
        </div>
        
        <div className="flex items-center gap-2!">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2.5! rounded-xl! border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={20} className="text-slate-600" />
          </button>
          
          <div className="flex items-center gap-1!">
            <span className="bg-indigo-600 text-white px-4! py-2! rounded-xl! font-bold shadow-md shadow-indigo-100">
              {currentPage}
            </span>
            <span className="px-2! text-slate-400 font-bold">از</span>
            <span className="bg-white border border-slate-200 text-slate-600 px-4! py-2! rounded-xl! font-bold">
              {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2.5! rounded-xl! border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponents;