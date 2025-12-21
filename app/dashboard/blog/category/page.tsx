"use client";

import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
} from "@/api/categoryService/useRequest";
import ModalComponents from "@/components/Dashbord/ModalComponents";
import TableComponents, { Column } from "@/components/TableComponents";
import { Button, Form, Input, Select, Row, Col, message, Modal } from "antd"; // Modal را برای تایید حذف اضافه کردیم
import React, { useState } from "react";

export interface CategoryItem {
  key: string;
  id?: number;
  nameCategory: string;
  languageId: number;
  slugCategory: string;
  statusCategory: number;
}

const CategoryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CategoryItem | null>(null);
  const [form] = Form.useForm();

  // سرویس‌ها
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { data: getCategory } = useGetCategory();

  const columns: Column<CategoryItem>[] = [
    { label: "شناسه", accessor: "key" },
    { label: "نام دسته بندی", accessor: "nameCategory" },
    { label: "اسلاگ", accessor: "slugCategory" },
    { label: "وضعیت", accessor: "statusCategory" },
  ];
  const [itemSelect, setItemSelect] = useState<number>();

  const handleOpenModal = () => {
    setEditingRecord(null);
    form.resetFields();
    form.setFieldsValue({ languageId: 1, statusCategory: 1 });
    setIsOpen(true);
  };

  const handleEdit = (record: CategoryItem) => {
    setEditingRecord(record);
    setIsOpen(true);
    form.setFieldsValue(record);
  };

  // --- تکمیل بخش حذف ---
  const handleDelete = (record: CategoryItem) => {
    Modal.confirm({
      title: "آیا از حذف این دسته بندی مطمئن هستید؟",
      content: `دسته بندی "${record.nameCategory}" حذف خواهد شد.`,
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "انصراف",
      centered: true,
      onOk: () => {
        // ارسال آی‌دی به سرویس حذف
          setItemSelect(record.id);
        
      },
    });
  };
  const { data: deleteCategory } = useDeleteCategory(itemSelect); 

  const onFinish = (values: any) => {
    if (editingRecord) {
      updateCategory(
        { ...values, id: editingRecord.id },
        {
          onSuccess: () => {
            message.success("دسته بندی با موفقیت بروزرسانی شد");
            setIsOpen(false);
            setEditingRecord(null);
          },
          onError: () => message.error("خطا در بروزرسانی"),
        }
      );
    } else {
      createCategory(values, {
        onSuccess: () => {
          message.success("دسته بندی با موفقیت ایجاد شد");
          setIsOpen(false);
          form.resetFields();
        },
        onError: () => message.error("خطا در ثبت"),
      });
    }
  };

  const tableData: CategoryItem[] =
    getCategory?.data?.map((item: any) => ({
      key: String(item.id),
      id: item.id,
      nameCategory: item.nameCategory,
      slugCategory: item.slugCategory,
      statusCategory: item.statusCategory,
      languageId: item.languageId || 1,
    })) || [];

  return (
    <div className="p-4!">
      <div className="mb-10!">
        <Button
          type="primary"
          className="font-bold h-12! px-8! rounded-xl!"
          onClick={handleOpenModal}
        >
          اضافه کردن دسته بندی جدید
        </Button>
      </div>

      <TableComponents<CategoryItem>
        columns={columns}
        data={tableData}
        rowKeyAccessor="key"
        onEdit={handleEdit}
        onDelete={handleDelete} // پاس دادن تابع حذف به جدول
      />

      <ModalComponents
        onClose={() => {
          setIsOpen(false);
          setEditingRecord(null);
        }}
        isOpen={isOpen}
        title={editingRecord ? "ویرایش دسته بندی" : "اضافه کردن دسته بندی"}
      >
        <div className="p-4!">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="nameCategory"
                  label="نام دسته بندی"
                  rules={[{ required: true, message: "لطفا نام را وارد کنید" }]}
                >
                  <Input
                    className="rounded-lg! h-10!"
                    placeholder="نام را وارد کنید"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="slugCategory"
                  label="اسلاگ"
                  rules={[
                    { required: true, message: "لطفا اسلاگ را وارد کنید" },
                  ]}
                >
                  <Input
                    className="rounded-lg! h-10!"
                    placeholder="example-slug"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="languageId"
                  label="زبان"
                  rules={[{ required: true }]}
                >
                  <Select className="h-10!">
                    <Select.Option value={1}>فارسی</Select.Option>
                    <Select.Option value={2}>کوردی</Select.Option>
                    <Select.Option value={3}>English</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="statusCategory"
                  label="وضعیت"
                  rules={[{ required: true }]}
                >
                  <Select className="h-10!">
                    <Select.Option value={1}>فعال</Select.Option>
                    <Select.Option value={0}>غیرفعال</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end gap-3! pt-6! border-t mt-6!">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setEditingRecord(null);
                }}
                className="rounded-lg! h-10! px-6!"
              >
                انصراف
              </Button>
              <Button
                type="primary"
                loading={isCreating || isUpdating}
                htmlType="submit"
                className="rounded-lg! h-10! px-8!"
              >
                {editingRecord ? "بروزرسانی تغییرات" : "ثبت دسته بندی"}
              </Button>
            </div>
          </Form>
        </div>
      </ModalComponents>
    </div>
  );
};

export default CategoryPage;
