"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Switch, Spin, ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import { Settings, Hash, Trophy, Save, XCircle, Sparkles, Languages } from "lucide-react";
import { useCreateEvents, useGetEventById } from "@/api/EventService/useRequest";

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
    createEvent(payload, { 
      onSuccess: () => { 
        message.success("🎉 چالاکی بە سەرکەوتوویی تۆمار کرا"); 
        !isEdit && form.resetFields(); 
      } 
    });
  };

  return (
    <ConfigProvider 
      theme={{ 
        algorithm: theme.defaultAlgorithm, // تغییر به الگوریتم روشن
        token: { 
          colorPrimary: "#D4AF37",
          colorBgBase: "#FFFFFF", 
          borderRadius: 20,
          colorLink: "#D4AF37",
          colorTextBase: "#2D2D2D", // متن‌های تیره برای خوانایی در پس‌زمینه سفید
        },
        components: {
          Input: {
            colorBgContainer: "#F9F9F9",
            activeBorderColor: "#D4AF37",
            hoverBorderColor: "#E5C158",
            colorTextPlaceholder: "#A0A0A0",
          },
          DatePicker: {
            colorBgContainer: "#F9F9F9",
          },
          Switch: {
            colorPrimary: "#D4AF37",
          }
        }
      }}
    >
      <div className="min-h-screen! bg-[#F7F7F7]! p-4! md:p-10! flex! justify-center! font-sans selection:bg-[#D4AF37]/20" dir="rtl">
        <div className="max-w-6xl! w-full! animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Header Section - Light Luxury */}
          <div className="relative overflow-hidden! mb-10! p-8! bg-white border! border-gray-200 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 blur-[80px] rounded-full" />
            <div className="relative z-10! flex! flex-col! md:flex-row! items-center! justify-between! gap-6!">
              <div className="flex! items-center! gap-5!">
                <div className="p-4! bg-[#D4AF37]/10 border! border-[#D4AF37]/20 rounded-2xl shadow-sm">
                  <Sparkles className="text-[#D4AF37]" size={28} />
                </div>
                <div>
                  <h1 className="text-2xl! md:text-3xl! font-black! text-[#1A1A1A] m-0! tracking-tight">
                    {isEdit ? "دەستکاری چالاکی" : "زیادکردنی چالاکی نوێ"}
                  </h1>
                  <p className="text-gray-400! text-xs! mt-1! font-bold">بەڕێوەبردنی زانیارییەکان لە Hataw Group</p>
                </div>
              </div>
              
              <div className="flex! items-center! gap-4! bg-gray-50! p-3.5! rounded-[1.5rem]! border! border-gray-100">
                <Form form={form} component={false}>
                  <div className="flex! items-center! gap-6! px-2!">
                    <Form.Item name="titleDefaultIsEn" valuePropName="checked" className="m-0!">
                      <div className="flex! flex-col! items-center! gap-1.5!">
                        <span className="text-[10px]! text-gray-400 font-black uppercase tracking-widest">Language EN</span>
                        <Switch size="small" />
                      </div>
                    </Form.Item>
                    <div className="w-[1px]! h-8! bg-gray-200" />
                    <Form.Item name="duplicateEventAllow" valuePropName="checked" className="m-0!">
                      <div className="flex! flex-col! items-center! gap-1.5!">
                        <span className="text-[10px]! text-gray-400 font-black uppercase tracking-widest">Duplicate</span>
                        <Switch size="small" />
                      </div>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          {isFetching ? (
            <div className="flex! justify-center! items-center! h-64!"><Spin size="large" /></div>
          ) : (
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className="m-0!">
              <div className="grid! grid-cols-1 lg:grid-cols-12! gap-10!">
                
                {/* Main Content Area */}
                <div className="lg:col-span-8!">
                  <div className="bg-white! p-10! rounded-[3.5rem]! border! border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] transition-all duration-500 h-full!">
                    <div className="flex! items-center! gap-3! text-[#D4AF37] text-[13px] font-black mb-10! uppercase tracking-[0.2em]">
                      <div className="w-10! h-[2px]! bg-[#D4AF37]/20" />
                      <Languages size={18} /> زانیارییە سەرەکییەکان
                    </div>
                    
                    <div className="space-y-8!">
                      <div className="grid! grid-cols-1 md:grid-cols-2! gap-8!">
                        <Form.Item name="titleKordish" label={<span className="text-xs! text-gray-500 font-black pr-1">ناونیشانی کوردی</span>} rules={[{ required: true }]}>
                          <Input placeholder="ناوی چالاکی لێرە بنووسە..." className="h-15! rounded-2xl border-gray-100! hover:border-[#D4AF37]!" />
                        </Form.Item>
                        <Form.Item name="titleEnglish" label={<span className="text-xs! text-gray-500 font-black pr-1">English Title</span>} rules={[{ required: true }]}>
                          <Input dir="ltr" placeholder="Enter activity title..." className="h-15! rounded-2xl border-gray-100! hover:border-[#D4AF37]!" />
                        </Form.Item>
                      </div>

                      <div className="grid! grid-cols-1 md:grid-cols-2! gap-8!">
                        <Form.Item name="startdate" label={<span className="text-xs! text-gray-500 font-black pr-1">بەرواری دەستپێک</span>} rules={[{ required: true }]}>
                          <DatePicker showTime className="w-full! h-15! rounded-2xl border-gray-100! hover:border-[#D4AF37]!" />
                        </Form.Item>
                        <Form.Item name="enddate" label={<span className="text-xs! text-gray-500 font-black pr-1">بەرواری کۆتایی</span>} rules={[{ required: true }]}>
                          <DatePicker showTime className="w-full! h-15! rounded-2xl border-gray-100! hover:border-[#D4AF37]!" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Controls */}
                <div className="lg:col-span-4! space-y-8!">
                  <div className="bg-white! p-10! rounded-[3.5rem]! border! border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full" />
                    
                    <div className="flex! items-center! gap-3! text-[#D4AF37] text-[13px] font-black mb-10! uppercase tracking-[0.2em]">
                      <Settings size={16} /> پارامیتەرەکان
                    </div>
                    
                    <div className="space-y-6!">
                      <Form.Item name="code" label={<span className="text-xs! text-gray-400 font-black">کۆدی ناسنامە</span>} rules={[{ required: true }]}>
                        <Input 
                          prefix={<Hash size={16} className="ml-2 text-[#D4AF37]" />} 
                          className="bg-gray-50! border-none! h-15! rounded-2xl font-mono text-lg! text-[#D4AF37] font-bold" 
                        />
                      </Form.Item>
                      
                      <Form.Item name="score" label={<span className="text-xs! text-gray-400 font-black">خاڵی دیاریکراو (Score)</span>} rules={[{ required: true }]}>
                        <Input 
                          prefix={<Trophy size={18} className="ml-2 text-[#D4AF37]" />} 
                          className="bg-gray-50! border-none! h-15! rounded-2xl font-black text-xl! text-[#D4AF37]" 
                        />
                      </Form.Item>
                    </div>
                    
                    <div className="pt-10! mt-10! border-t! border-gray-100 space-y-4!">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={createLoading}
                        icon={<Save size={20} className="ml-1" />}
                        className="w-full! h-16! rounded-2xl! bg-[#D4AF37]! border-none! shadow-[0_10px_25px_rgba(212,175,55,0.3)] text-white! font-black! text-lg! hover:scale-[1.02]! hover:bg-[#B8860B]! transition-all duration-300"
                      >
                        {isEdit ? "نوێکردنەوە" : "تۆمارکردن"}
                      </Button>
                      
                      <Button 
                        onClick={() => form.resetFields()} 
                        icon={<XCircle size={18} className="ml-1" />}
                        className="w-full! h-14! rounded-2xl! border-gray-100! bg-gray-50! text-gray-400 font-bold hover:text-red-500! hover:border-red-100! transition-all"
                      >
                        پاککردنەوە
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