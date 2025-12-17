"use client";

import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Card,
  Switch,
  Spin,
} from "antd";
import dayjs from "dayjs";
import {
  useCreateEvents,
  useGetEventById,
} from "@/api/EventService/useRequest";

const { TextArea } = Input;

interface Props {
  id?: number;
}

const AddEvent: React.FC<Props> = ({ id }) => {
  const [form] = Form.useForm();

  console.log(id)
  const isEdit = Boolean(id);

  // ---------------- APIs ----------------
  const { mutate: createEvent, isPending: createLoading } =
    useCreateEvents();

  // const { mutate: updateEvent, isPending: updateLoading } =
  //   useUpdateEvents();

  const {
    data: eventData,
    isFetching,
  } = useGetEventById(id!);

  // ---------------- Fill Form (Edit Mode) ----------------
  useEffect(() => {
    if (eventData && isEdit) {
      form.setFieldsValue({
        titleDefaultIsEn: eventData.titleDefaultIsEn,
        duplicateEventAllow: eventData.duplicateEventAllow,
        titleKordish: eventData.titleKordish,
        titleEnglish: eventData.titleEnglish,
        descriptionKordish: eventData.descriptionKordish,
        descriptionEnglish: eventData.descriptionEnglish,
        startdate: dayjs(eventData.startdate),
        enddate: dayjs(eventData.enddate),
        code: eventData.code,
        score: eventData.score,
      });
    }
  }, [eventData, isEdit]);

  // ---------------- Submit ----------------
  const onFinish = (values: any) => {
    const payload = {
      ...values,
      startdate: values.startdate.toISOString(),
      enddate: values.enddate.toISOString(),
      code: Number(values.code),
      score: Number(values.score),
    };

    if (isEdit) {
      // updateEvent(
      //   { id: id!, ...payload },
      //   {
      //     onSuccess: () => {
      //       message.success("✏️ چالاکی نوێکرایەوە");
      //     },
      //   }
      // );
    } else {
      createEvent(payload, {
        onSuccess: () => {
          message.success("🎉 چالاکی بە سەرکەوتوویی تۆمار کرا");
          form.resetFields();
        },
      });
    }
  };

  // ---------------- JSX ----------------
  return (
    <div className="h-full bg-gray-100 p-4 flex justify-center items-center">
      <Card className="w-full md:w-2/3 shadow-lg rounded-xl bg-white">
        <h1 className="text-2xl font-bold mb-4">
          {isEdit ? "✏️ دەستکاری چالاکی" : "➕ زیادکردنی چالاکی نوێ"}
        </h1>

        {isFetching ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="titleDefaultIsEn"
                label="زمانی بنەڕەتی ناونیشان (ئینگلیزی؟)"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="duplicateEventAllow"
                label="ڕێگەدان بە دووبارەکردنەوەی چالاکی"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="titleKordish"
                label="ناونیشانی چالاکی (کوردی)"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="titleEnglish"
                label="ناونیشانی چالاکی (ئینگلیزی)"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="startdate" label="کاتی دەستپێک" required>
                <DatePicker showTime className="w-full" />
              </Form.Item>

              <Form.Item name="enddate" label="کاتی کۆتایی" required>
                <DatePicker showTime className="w-full" />
              </Form.Item>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="descriptionKordish"
                label="وردەکاری (کوردی)"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item
                name="descriptionEnglish"
                label="وردەکاری (ئینگلیزی)"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>
            </div>

            {/* Code & Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="code" label="کۆد" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>

              <Form.Item name="score" label="خاڵ" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button htmlType="reset">هەڵوەشاندنەوە</Button>
              <Button
                type="primary"
                htmlType="submit"
                // loading={isEdit ? updateLoading : createLoading}
              >
                {isEdit ? "💾 نوێکردنەوە" : "💾 پاشەکەوتکردن"}
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default AddEvent;
