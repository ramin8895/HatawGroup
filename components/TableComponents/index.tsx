import React, { useState, useMemo, useCallback } from "react";
import { Button } from "antd"; // اضافه کردن Button از Ant Design برای Actions

// Fully typed column model
export interface Column<T> {
  label: string;
  accessor: keyof T;
}

interface TableComponentsProps<T> {
  data: T[];
  columns: Column<T>[];
  // --- New Props for Selection & Actions ---
  rowKeyAccessor: keyof T; // کلید منحصر به فرد سطر (مثلاً 'key' یا 'id')
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

  // State for row selection (New)
  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(
    null
  );

  // State for column resizing
  const [columnWidths, setColumnWidths] = useState<
    Record<string, number | undefined>
  >({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumnKey, setResizingColumnKey] = useState<string | null>(
    null
  );
  const [startX, setStartX] = useState(0);

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.reduce((acc, col) => {
      acc[col.accessor as string] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Search filter
  const filteredData = useMemo(() => {
    setCurrentPage(1);
    return data.filter((row: any) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
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

  // --- Row Selection Handler ---
  const handleRowClick = useCallback(
    (row: T) => {
      const currentKey = row[rowKeyAccessor] as string | number;
      setSelectedRowKey((prevKey) =>
        prevKey === currentKey ? null : currentKey
      );
    },
    [rowKeyAccessor]
  );

  // --- Resizing Handlers ---
  const startResizing = useCallback((e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    if (!(e.target as HTMLElement).classList.contains("resizer")) return;

    setIsResizing(true);
    setResizingColumnKey(key);
    setStartX(e.clientX);
    document.body.style.cursor = "col-resize";
  }, []);

  const onResizing = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizingColumnKey) return;

      const deltaX = e.clientX - startX;

      setColumnWidths((prev) => {
        const currentWidth = prev[resizingColumnKey] || 150;
        const newWidth = Math.max(50, currentWidth + deltaX);

        return {
          ...prev,
          [resizingColumnKey]: newWidth,
        };
      });
      setStartX(e.clientX);
    },
    [isResizing, resizingColumnKey, startX]
  );

  const stopResizing = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setResizingColumnKey(null);
      document.body.style.cursor = "default";
    }
  }, [isResizing]);

  React.useEffect(() => {
    document.addEventListener("mousemove", onResizing);
    document.addEventListener("mouseup", stopResizing);

    return () => {
      document.removeEventListener("mousemove", onResizing);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [onResizing, stopResizing]);

  // پیدا کردن کلید آخرین ستون قابل مشاهده
  const visibleColumnAccessors = columns
    .filter((col) => visibleColumns[col.accessor as string])
    .map((col) => String(col.accessor));

  const lastVisibleColumnAccessor =
    visibleColumnAccessors[visibleColumnAccessors.length - 1];

  // بررسی وجود ستون عملیات
  const hasActionsColumn = onEdit || onDelete;

  // سطر انتخاب شده برای استفاده در Actions
  const selectedRowData = filteredData.find(
    (row) => row[rowKeyAccessor] === selectedRowKey
  );

  return (
    // 1. Container: حذف border و استفاده از shadow ظریف‌تر
    <div className="p-8! bg-white rounded-3xl shadow-lg">
      {/* Search + Actions + PageSize */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8!">
        {/* Search Input (No change in functionality) */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="جستجو در تمام ستون‌ها..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                       rounded-xl p-3! pl-10 w-full transition outline-none bg-gray-50/70"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Actions (Simplified buttons) */}
        {hasActionsColumn && (
          <div className="flex gap-3 items-center">
            <Button
              type="primary"
              danger
              ghost // Modern look
              disabled={!selectedRowKey || !onDelete}
              onClick={() =>
                onDelete && selectedRowData && onDelete(selectedRowData)
              }
              className="font-medium rounded-xl border-red-500 hover:border-red-600! hover:text-red-600! transition"
            >
              حذف
            </Button>
            <Button
              type="primary"
              ghost // Modern look
              disabled={!selectedRowKey || !onEdit}
              onClick={() =>
                onEdit && selectedRowData && onEdit(selectedRowData)
              }
              className="border-indigo-500 text-indigo-500 hover:border-indigo-600! hover:text-indigo-600! font-medium rounded-xl transition"
            >
              ویرایش
            </Button>
            {selectedRowKey && (
              <span className="text-sm text-indigo-500 mr-2! font-semibold">
                یک سطر انتخاب شد.
              </span>
            )}
          </div>
        )}

        {/* PageSize Select (Simplified border/shadow) */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-xl p-3! bg-gray-50/70
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition outline-none w-full md:w-auto"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} آیتم در صفحه
            </option>
          ))}
        </select>
      </div>

      {/* Column toggles (Used a neutral background) */}
      <div className="flex flex-wrap gap-3 !mb-8 !p-4 bg-gray-50 rounded-xl border border-gray-200">
        <span className="text-sm font-semibold text-gray-700 self-center !ml-2">
          نمایش ستون‌ها:
        </span>
        {columns.map((col) => (
          <label
            key={String(col.accessor)}
            className={`flex items-center gap-2 !px-4 !py-2 rounded-full text-sm font-medium transition duration-200 cursor-pointer 
                        ${
                          visibleColumns[col.accessor as string]
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
          >
            <input
              type="checkbox"
              checked={visibleColumns[col.accessor as string]}
              onChange={() => toggleColumn(col.accessor)}
              className="hidden"
            />
            {col.label}
          </label>
        ))}
      </div>

      {/* Table (Minimal borders) */}
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full border-collapse table-fixed">
          {/* Header: White background, darker text, only bottom border */}
          <thead className="bg-white sticky top-0 z-10 border-b border-gray-300 shadow-sm">
            <tr>
              {columns.map(
                (col) =>
                  visibleColumns[col.accessor as string] && (
                    <th
                      key={String(col.accessor)}
                      style={{
                        width: columnWidths[String(col.accessor)],
                        minWidth: "100px",
                        borderLeft: "1px solid #E5E7EB", // Light gray border
                      }}
                      className="!p-3 text-right font-semibold text-gray-700 uppercase tracking-wider relative group text-sm"
                    >
                      {col.label}
                      {/* Resizer - Neutral color */}
                      {String(col.accessor) !== lastVisibleColumnAccessor && (
                        <div
                          onMouseDown={(e) =>
                            startResizing(e, String(col.accessor))
                          }
                          className={`resizer absolute top-0 bottom-0 left-0 w-[3px] transition-colors z-20 
                                        ${
                                          isResizing &&
                                          resizingColumnKey ===
                                            String(col.accessor)
                                            ? "bg-gray-400"
                                            : "bg-transparent hover:bg-gray-300"
                                        }`}
                        />
                      )}
                    </th>
                  )
              )}
              {/* Actions Header */}
              {hasActionsColumn && (
                <th
                  className="!p-3 text-center font-semibold text-gray-700 uppercase tracking-wider sticky right-0 bg-white shadow-sm border-b border-gray-300"
                  style={{ width: "150px" }}
                >
                  عملیات
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => {
                const rowKey = row[rowKeyAccessor] as string | number;
                const isSelected = rowKey === selectedRowKey;

                return (
                  <tr
                    key={i}
                    onClick={() => handleRowClick(row)} // Row Click Handler
                    className={`cursor-pointer transition-colors border-b border-gray-100
                                  ${
                                    isSelected
                                      ? "bg-indigo-50/70"
                                      : "bg-white hover:bg-gray-50"
                                  }`} // Subtle Selection
                  >
                    {columns.map(
                      (col) =>
                        visibleColumns[col.accessor as string] && (
                          <td
                            key={String(col.accessor)}
                            className="!p-3 text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis border-r border-gray-100 text-sm"
                            style={{
                              width: columnWidths[String(col.accessor)],
                              minWidth: "100px",
                            }}
                          >
                            {String(row[col.accessor])}
                          </td>
                        )
                    )}
                    {/* Actions Cell (Background transparency/color adjusted) */}
                    {hasActionsColumn && (
                      <td className="p-2! text-center sticky right-0 bg-white/70 border-b border-gray-100">
                        <div className="flex gap-2 justify-center">
                          {/* Button - Edit (Outline/Minimal) */}
                          {onEdit && (
                            <Button
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(row);
                              }}
                              type="default"
                              className="border-indigo-400! text-indigo-600 hover:bg-indigo-50! transition"
                            >
                              ویرایش
                            </Button>
                          )}
                          {/* Button - Delete (Outline/Minimal) */}
                          {onDelete && (
                            <Button
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(row);
                              }}
                              type="default"
                              danger
                              ghost
                              className="border-red-400! text-red-600 hover:bg-red-50! transition"
                            >
                              حذف
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    visibleColumnAccessors.length + (hasActionsColumn ? 1 : 0)
                  }
                  className="!p-4 text-center text-gray-500"
                >
                  هیچ داده‌ای برای نمایش وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Simplified buttons) */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 !mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 !px-5 !py-2 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100
                     disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transform rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          قبلی
        </button>

        <span className="text-gray-600 font-medium text-lg">
          صفحه **{currentPage}** از **{totalPages}**
        </span>

        <span className="text-sm text-gray-500 hidden sm:block">
          ({filteredData.length} رکورد فیلتر شده)
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 !px-5 !py-2 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100
                     disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
        >
          بعدی
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TableComponents;
