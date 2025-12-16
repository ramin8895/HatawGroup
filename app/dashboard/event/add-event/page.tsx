"use client";
import React from "react";
import { Form, Input, Button, DatePicker, message, Card, Switch } from "antd";
import { useCreateEvents } from "@/api/EventService/useRequest";

const { TextArea } = Input;

const AddEvent = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreateEvents();

  const onFinish = (values: any) => {
    const payload = {
      titleDefaultIsEn: values.titleDefaultIsEn,
      duplicateEventAllow: values.duplicateEventAllow,
      titleEnglish: values.titleEnglish,
      titleKordish: values.titleKordish,
      descriptionEnglish: values.descriptionEnglish,
      descriptionKordish: values.descriptionKordish,
      startdate: values.startdate.toISOString(),
      enddate: values.enddate.toISOString(),
      code: Number(values.code),
      score: Number(values.score),
    };

    mutate(payload, {
      onSuccess: () => {
        message.success("🎉 چالاکی بە سەرکەوتوویی تۆمار کرا");
        form.resetFields();
      },
    });
  };

  return (
    <div className="h-full bg-gray-100 p-4! flex justify-center items-center">
      <Card className="shadow-lg rounded-xl p-4! w-full md:w-2/3 bg-white">
        <h1 className="text-2xl font-bold mb-4!">➕ زیادکردنی چالاکی نوێ</h1>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="titleDefaultIsEn"
              label="زمانی بنەڕەتی ناونیشان (ئینگلیزی؟)"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="duplicateEventAllow"
              label="ڕێگەدان بە دووبارەکردنەوەی چالاکی"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="titleKordish"
              label="ناونیشانی چالاکی (کوردی)"
              rules={[{ required: true, message: "ناونیشانی کوردی بنووسە" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="titleEnglish"
              label="ناونیشانی چالاکی (ئینگلیزی)"
              rules={[{ required: true, message: "ناونیشانی ئینگلیزی بنووسە" }]}
            >
              <Input size="large" />
            </Form.Item>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="startdate"
              label="کاتی دەستپێک"
              rules={[{ required: true, message: "کاتی دەستپێک هەڵبژێرە" }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="enddate"
              label="کاتی کۆتایی"
              rules={[{ required: true, message: "کاتی کۆتایی هەڵبژێرە" }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full"
                size="large"
              />
            </Form.Item>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="descriptionKordish"
              label="وردەکاری چالاکی (کوردی)"
              rules={[{ required: true, message: "وردەکاری کوردی بنووسە" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="descriptionEnglish"
              label="وردەکاری چالاکی (ئینگلیزی)"
              rules={[{ required: true, message: "وردەکاری ئینگلیزی بنووسە" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          {/* Code & Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="code"
              label="کۆدی چالاکی"
              rules={[{ required: true, message: "کۆد بنووسە" }]}
            >
              <Input type="number" size="large" />
            </Form.Item>

            <Form.Item
              name="score"
              label="خاڵ (Score)"
              rules={[{ required: true, message: "خاڵ بنووسە" }]}
            >
              <Input type="number" size="large" />
            </Form.Item>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4!">
            <Button htmlType="reset">هەڵوەشاندنەوە</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              💾 پاشەکەوتکردن
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddEvent;
