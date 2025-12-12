"use client";
import React, { useCallback } from "react";
import TableComponents from "../../../components/TableComponents";
import { Column } from "../../../components/TableComponents";

// 1. تعریف ساختار داده (Interface)
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "فعال" | "غیرفعال" | "معلق";
  registrationDate: string;
}

// 2. داده‌های نمونه (Sample Data)
const CUSTOMERS_DATA: Customer[] = [
  {
    id: 101,
    name: "علی احمدی",
    email: "ali.a@example.com",
    phone: "09121234567",
    status: "فعال",
    registrationDate: "1402/05/10",
  },
  {
    id: 102,
    name: "سارا حسینی",
    email: "sara.h@example.com",
    phone: "09129876543",
    status: "غیرفعال",
    registrationDate: "1401/11/25",
  },
  {
    id: 103,
    name: "محسن کریمی",
    email: "mohsen.k@example.com",
    phone: "09355554444",
    status: "معلق",
    registrationDate: "1403/01/01",
  },
  {
    id: 104,
    name: "زهرا رحیمی",
    email: "zahra.r@example.com",
    phone: "09191112233",
    status: "فعال",
    registrationDate: "1402/10/05",
  },
  {
    id: 105,
    name: "رضا محمدی",
    email: "reza.m@example.com",
    phone: "09217778899",
    status: "فعال",
    registrationDate: "1403/03/15",
  },
];

// 3. تعریف ساختار ستون‌ها (Column Definitions)
const CUSTOMERS_COLUMNS: Column<Customer>[] = [
  { label: "شناسه", accessor: "id" },
  { label: "نام مشتری", accessor: "name" },
  { label: "ایمیل", accessor: "email" },
  { label: "شماره تماس", accessor: "phone" },
  { label: "وضعیت", accessor: "status" },
  { label: "تاریخ ثبت", accessor: "registrationDate" },
];

const Customers = () => {
  const handleEditCustomer = useCallback((customer: Customer) => {
    alert(`درخواست ویرایش مشتری: ${customer.name} (ID: ${customer.id})`);
  }, []);

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    if (
      window.confirm(
        `آیا مطمئنید که می‌خواهید مشتری ${customer.name} را حذف کنید؟`
      )
    ) {
      alert(`مشتری ${customer.name} حذف شد.`);
    }
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">مدیریت کاربران</h1>
      <TableComponents<Customer>
        data={CUSTOMERS_DATA}
        columns={CUSTOMERS_COLUMNS}
        rowKeyAccessor="id"
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
};
export default Customers;
