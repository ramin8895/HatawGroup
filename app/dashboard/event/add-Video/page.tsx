"use client";

import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message, Card } from "antd";
import moment from "moment";

const { TextArea } = Input;

const AddEvent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);

    // فرمت تاریخ و زمان
    const formattedValues = {
      ...values,
      startTime: values.startTime.format("YYYY-MM-DD HH:mm"),
      endTime: values.endTime.format("YYYY-MM-DD HH:mm"),
    };

    console.log("Submitted Event:", formattedValues);

    setTimeout(() => {
      message.success("Event added successfully ✅");
      form.resetFields();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full bg-gray-100 p-4! flex flex-col justify-center items-center">
      <Card className="shadow-lg rounded-xl p-4! w-full md:w-2/3 bg-white  ">
        <h1 className="text-2xl md:text-3xl font-bold mb-4!">
          🎉 Add New Event
        </h1>
        <p className="text-gray-500 mb-6">
          Fill in the details below to add a new event.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[
              { required: true, message: "Please enter the event title" },
            ]}
          >
            <Input placeholder="e.g. Summer Music Festival" size="large" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="code"
              label="Event code"
              rules={[
                { required: true, message: "Please enter the event code" },
              ]}
            >
              <Input placeholder="e.g. code" size="large" />
            </Form.Item>
            <Form.Item
              name="point"
              label="Event code"
              rules={[
                { required: true, message: "Please enter the event point" },
              ]}
            >
              <Input placeholder="e.g. point" size="large" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            <Form.Item
              name="startTime"
              label="Start Date & Time"
              rules={[
                { required: true, message: "Please select start date & time" },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="endTime"
              label="End Date & Time"
              rules={[
                { required: true, message: "Please select end date & time" },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full"
                size="large"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Event Description"
            rules={[
              { required: true, message: "Please enter event description" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Full event description with details..."
            />
          </Form.Item>

          <div className="flex justify-end gap-2 mt-2!">
            <Button htmlType="reset" size="large" className="border-gray-300">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Event
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddEvent;
