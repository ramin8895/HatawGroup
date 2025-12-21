"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Switch, Spin, ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import { Calendar, Settings, Type, FileText, Hash, Trophy, Save, XCircle, Sparkles } from "lucide-react";
import { useCreateEvents, useGetEventById } from "@/api/EventService/useRequest";

const { TextArea } = Input;

const AddEvent: React.FC<{ id?: number }> = ({ id }) => {
  const [form] = Form.useForm();
  const isEdit = Boolean(id);
  const { mutate: createEvent, isPending: createLoading } = useCreateEvents();
  const { data: eventData, isFetching } = useGetEventById(id!);

  useEffect(() => {
    if (eventData && isEdit) {
      form.setFieldsValue({
        ...eventData,
        startdate: dayjs(eventData.startdate),
        enddate: dayjs(eventData.enddate),
      });
    }
  }, [eventData, isEdit, form]);

  const onFinish = (values: any) => {
    const payload = { 
      ...values, 
      startdate: values.startdate.toISOString(), 
      enddate: values.enddate.toISOString(), 
      code: Number(values.code), 
      score: Number(values.score) 
    };
    createEvent(payload, { onSuccess: () => { message.success("🎉 چالاکی تۆمار کرا"); !isEdit && form.resetFields(); } });
  };

  return (
    <ConfigProvider 
      theme={{ 
        algorithm: theme.darkAlgorithm, 
        token: { colorPrimary: "#6366f1", colorBgBase: "#020617", borderRadius: 12 } 
      }}
    >
      <div className="min-h-screen! bg-[#020617]! p-6! flex! justify-center!" dir="rtl">
        <div className="max-w-5xl! w-full! m-0!">
          
          {/* Header & Quick Settings */}
          <div className="flex! items-center! justify-between! mb-6! p-4! bg-white/[0.02] border! border-white/10 rounded-2xl shadow-2xl">
            <div className="flex! items-center! gap-3!">
              <div className="p-2! bg-indigo-500/20 rounded-lg!">
                <Sparkles className="text-indigo-400" size={20} />
              </div>
              <h1 className="text-lg! font-bold! text-white m-0!">
                {isEdit ? "دەستکاری چالاکی" : "زیادکردنی چالاکی"}
              </h1>
            </div>
            
            <div className="flex! items-center! gap-6!">
              <Form form={form} component={false}>
                <Form.Item name="titleDefaultIsEn" valuePropName="checked" className="m-0!">
                  <div className="flex! items-center! gap-2!">
                    <span className="text-[10px]! text-slate-500 font-bold uppercase">EN Default</span>
                    <Switch size="small" />
                  </div>
                </Form.Item>
                <Form.Item name="duplicateEventAllow" valuePropName="checked" className="m-0!">
                  <div className="flex! items-center! gap-2!">
                    <span className="text-[10px]! text-slate-500 font-bold uppercase">Duplicate</span>
                    <Switch size="small" />
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>

          {isFetching ? (
            <div className="flex! justify-center! py-20!"><Spin size="large" /></div>
          ) : (
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className="m-0!">
              <div className="grid! grid-cols-1 md:grid-cols-3! gap-5!">
                
                {/* Main Content Area (2/3) */}
                <div className="md:col-span-2! space-y-5!">
                  {/* Titles Box */}
                  <div className="bg-white/[0.02]! p-5! rounded-2xl! border! border-white/5 shadow-lg">
                    <div className="flex! items-center! gap-2! text-indigo-400 text-[11px] font-bold mb-4! uppercase tracking-widest">
                      <Type size={14} /> ناونیشان و کات
                    </div>
                    <div className="grid! grid-cols-2! gap-4!">
                      <Form.Item name="titleKordish" label={<span className="text-xs! text-slate-400">ناونیشانی کوردی</span>} rules={[{ required: true }]} className="mb-2!">
                        <Input className="bg-black/40! border-white/10! h-10! rounded-lg" />
                      </Form.Item>
                      <Form.Item name="titleEnglish" label={<span className="text-xs! text-slate-400">English Title</span>} rules={[{ required: true }]} className="mb-2!">
                        <Input dir="ltr" className="bg-black/40! border-white/10! h-10! rounded-lg" />
                      </Form.Item>
                    </div>
                    <div className="grid! grid-cols-2! gap-4! mt-2!">
                      <Form.Item name="startdate" label={<span className="text-xs! text-slate-400">بەرواری دەستپێک</span>} rules={[{ required: true }]} className="mb-0!">
                        <DatePicker showTime className="w-full! bg-black/40! border-white/10! h-10! rounded-lg" />
                      </Form.Item>
                      <Form.Item name="enddate" label={<span className="text-xs! text-slate-400">بەرواری کۆتایی</span>} rules={[{ required: true }]} className="mb-0!">
                        <DatePicker showTime className="w-full! bg-black/40! border-white/10! h-10! rounded-lg" />
                      </Form.Item>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="bg-white/[0.02]! p-5! rounded-2xl! border! border-white/5">
                    <div className="flex! items-center! gap-2! text-indigo-400 text-[11px] font-bold mb-4! uppercase tracking-widest">
                      <FileText size={14} /> وەسفی چالاکی
                    </div>
                    <div className="grid! grid-cols-2! gap-4!">
                      <Form.Item name="descriptionKordish" label={<span className="text-xs! text-slate-400">وەسفی کوردی</span>} rules={[{ required: true }]} className="mb-0!">
                        <TextArea rows={3} className="bg-black/40! border-white/10! rounded-lg" />
                      </Form.Item>
                      <Form.Item name="descriptionEnglish" label={<span className="text-xs! text-slate-400">English Desc</span>} rules={[{ required: true }]} className="mb-0!">
                        <TextArea rows={3} dir="ltr" className="bg-black/40! border-white/10! rounded-lg" />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Sidebar (1/3) */}
                <div className="space-y-5!">
                  <div className="bg-indigo-600/5! p-6! rounded-2xl! border! border-indigo-500/20 flex! flex-col! justify-between! h-full!">
                    <div>
                      <div className="flex! items-center! gap-2! text-indigo-400 text-[11px] font-bold mb-6! uppercase tracking-widest">
                        <Settings size={14} /> پارامیتەرەکان
                      </div>
                      <Form.Item name="code" label={<span className="text-xs! text-slate-400">کۆدی چالاکی</span>} rules={[{ required: true }]} className="mb-4!">
                        <Input prefix={<Hash size={14} className="text-indigo-400" />} className="bg-black/40! border-indigo-500/20! h-11! rounded-lg font-mono" />
                      </Form.Item>
                      <Form.Item name="score" label={<span className="text-xs! text-slate-400">خاڵی دیاریکراو</span>} rules={[{ required: true }]} className="mb-4!">
                        <Input prefix={<Trophy size={14} className="text-amber-500" />} className="bg-black/40! border-indigo-500/20! h-11! rounded-lg font-bold text-amber-500" />
                      </Form.Item>
                    </div>
                    
                    <div className="space-y-3! pt-6! border-t! border-white/5 mt-4!">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={createLoading}
                        icon={<Save size={18} />}
                        className="w-full! h-12! rounded-xl! bg-indigo-600! border-none! shadow-lg shadow-indigo-600/20 font-bold!"
                      >
                        {isEdit ? "نوێکردنەوە" : "تۆمارکردن"}
                      </Button>
                      <Button 
                        onClick={() => form.resetFields()} 
                        icon={<XCircle size={18} />}
                        className="w-full! h-11! rounded-xl! border-white/10! bg-white/5! text-slate-400 hover:text-white!"
                      >
                        هەڵوەشاندنەوە
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </Form>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AddEvent;