"use client";

import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { Save, Loader2, Type, Hash } from "lucide-react";
import { langAPI } from "@/api";

interface Props {
  id?: number; // اگر ID وجود داشته باشد یعنی در حالت ویرایش هستیم
  onSuccess: () => void;
}

const AddLangForm: React.FC<Props> = ({ id, onSuccess }) => {
  const [form] = Form.useForm();

  // Hooks مربوط به API
  const { data: langData, isPending: isLoadingData } = langAPI.useGetlangById(id);
  const { mutate: createLang, isPending: isCreating } = langAPI.useCreateLang();
  const { mutate: updateLang, isPending: isUpdating } = langAPI.useUpdateLang();

  // پر کردن فرم در حالت ویرایش
  useEffect(() => {
    if (id && langData?.data) {
      form.setFieldsValue({
        titleLanguage: langData.data.titleLanguage,
        orderLang: langData.data.orderLang,
      });
    } else {
      form.resetFields();
    }
  }, [id, langData, form]);

  const onFinish = (values: any) => {
    if (id) {
      // حالت ویرایش
      updateLang(
        { id, data: values }, // توجه: ساختار آرگومان بر اساس متد شما در useRequest است
        {
          onSuccess: () => {
            message.success("زمانەکە بە سەرکەوتوویی نوێکرایەوە");
            onSuccess();
          },
          onError: () => message.error("هەڵەیەک ڕوویدا"),
        }
      );
    } else {
      // حالت ایجاد جدید
      createLang(values, {
        onSuccess: () => {
          message.success("زمانەکە بە سەرکەوتوویی تۆمارکرا");
          form.resetFields();
          onSuccess();
        },
        onError: () => message.error("تۆمارکردن سەرکەوتوو نەبوو"),
      });
    }
  };

  if (id && isLoadingData) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="grid grid-cols-1 gap-4">
        {/* فیلد نام زبان */}
        <Form.Item
          name="titleLanguage"
          label={<span className="font-bold text-gray-700">ناونیشانی زمان</span>}
          rules={[{ required: true, message: "تکایە ناوی زمان بنووسە" }]}
        >
          <Input
            prefix={<Type size={18} className="text-gray-400 ml-2" />}
            placeholder="نموونە: کوردی، English..."
            className="h-12! rounded-xl! border-gray-200! focus:border-[#D4AF37]!"
          />
        </Form.Item>

        {/* فیلد ترتیب */}
        <Form.Item
          name="orderLang"
          label={<span className="font-bold text-gray-700">ڕیزبەندی</span>}
          rules={[{ required: true, message: "تکایە ژمارەی ڕیزبەندی دیاری بکە" }]}
        >
          <InputNumber
            prefix={<Hash size={18} className="text-gray-400 ml-2" />}
            className="w-full! h-12! flex! items-center! rounded-xl! border-gray-200!"
            placeholder="0"
            min={0}
          />
        </Form.Item>
      </div>

      <div className="mt-8 flex gap-3">
        <Button
          type="primary"
          htmlType="submit"
          loading={isCreating || isUpdating}
          icon={<Save size={20} className="ml-2" />}
          className="flex-1! h-14! bg-[#D4AF37]! hover:bg-[#B8860B]! border-none! rounded-2xl! font-black! text-lg! shadow-lg shadow-[#D4AF37]/20"
        >
          {id ? "پاشکەوتکردنی گۆڕانکارییەکان" : "تۆمارکردنی زمان"}
        </Button>
      </div>
    </Form>
  );
};

export default AddLangForm;