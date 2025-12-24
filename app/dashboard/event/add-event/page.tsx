"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Switch, Spin, ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import { Settings, Type, Hash, Trophy, Save, XCircle, Sparkles, Languages } from "lucide-react";
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
        algorithm: theme.darkAlgorithm, 
        token: { 
          colorPrimary: "#D4AF37",
          colorBgBase: "#050505", 
          borderRadius: 16,
          colorLink: "#D4AF37",
          colorTextBase: "#e5e7eb"
        },
        components: {
          Input: {
            colorBgContainer: "rgba(255, 255, 255, 0.03)",
            activeBorderColor: "#D4AF37",
            hoverBorderColor: "rgba(212, 175, 55, 0.5)",
          },
          DatePicker: {
            colorBgContainer: "rgba(255, 255, 255, 0.03)",
          }
        }
      }}
    >
      <div className="min-h-screen! bg-[#050505]! p-4! md:p-10! flex! justify-center! font-sans" dir="rtl">
        <div className="max-w-6xl! w-full! animate-in fade-in duration-700">
          
          {/* Header Section */}
          <div className="relative overflow-hidden! mb-8! p-8! bg-white/[0.01] border! border-white/[0.08] rounded-[2.5rem] shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[60px] rounded-full" />
            <div className="relative z-10! flex! flex-col! md:flex-row! items-center! justify-between! gap-6!">
              <div className="flex! items-center! gap-5!">
                <div className="p-4! bg-gradient-to-br from-[#D4AF37]/20 to-transparent border! border-[#D4AF37]/30 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  <Sparkles className="text-[#D4AF37]" size={28} />
                </div>
                <div>
                  <h1 className="text-2xl! md:text-3xl! font-black! text-white m-0! tracking-tight">
                    {isEdit ? "دەستکاری چالاکی" : "زیادکردنی چالاکی نوێ"}
                  </h1>
                  <p className="text-slate-500! text-xs! mt-1! font-medium">بەڕێوەبردنی زانیارییەکان و ڕێکخستنی کاتەکان</p>
                </div>
              </div>
              
              <div className="flex! items-center! gap-4! bg-black/40! p-3! rounded-2xl! border! border-white/5">
                <Form form={form} component={false}>
                  <div className="flex! items-center! gap-6! px-2!">
                    <Form.Item name="titleDefaultIsEn" valuePropName="checked" className="m-0!">
                      <div className="flex! flex-col! items-center! gap-1.5!">
                        <span className="text-[9px]! text-slate-400 font-black uppercase tracking-widest">Language EN</span>
                        <Switch size="small" className="bg-white/10" />
                      </div>
                    </Form.Item>
                    <div className="w-[1px]! h-8! bg-white/10" />
                    <Form.Item name="duplicateEventAllow" valuePropName="checked" className="m-0!">
                      <div className="flex! flex-col! items-center! gap-1.5!">
                        <span className="text-[9px]! text-slate-400 font-black uppercase tracking-widest">Duplicate</span>
                        <Switch size="small" className="bg-white/10" />
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
              <div className="grid! grid-cols-1 lg:grid-cols-12! gap-8!">
                
                {/* Main Content Area - Titles & Dates */}
                <div className="lg:col-span-8!">
                  <div className="group bg-white/[0.02]! p-10! rounded-[3rem]! border! border-white/[0.05] shadow-xl hover:border-[#D4AF37]/20! transition-all duration-500 h-full!">
                    <div className="flex! items-center! gap-3! text-[#D4AF37] text-[12px] font-black mb-10! uppercase tracking-[0.3em]">
                      <div className="w-8! h-[1px]! bg-[#D4AF37]/30" />
                      <Languages size={18} /> زانیارییە سەرەکییەکان
                    </div>
                    
                    <div className="space-y-8!">
                      <div className="grid! grid-cols-1 md:grid-cols-2! gap-8!">
                        <Form.Item name="titleKordish" label={<span className="text-xs! text-slate-300 font-bold pr-1">ناونیشانی کوردی</span>} rules={[{ required: true }]}>
                          <Input placeholder="بنووسە..." className="bg-black/40! border-white/10! h-14! rounded-2xl focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]!" />
                        </Form.Item>
                        <Form.Item name="titleEnglish" label={<span className="text-xs! text-slate-300 font-bold pr-1">English Title</span>} rules={[{ required: true }]}>
                          <Input dir="ltr" placeholder="Type here..." className="bg-black/40! border-white/10! h-14! rounded-2xl focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]!" />
                        </Form.Item>
                      </div>

                      <div className="grid! grid-cols-1 md:grid-cols-2! gap-8!">
                        <Form.Item name="startdate" label={<span className="text-xs! text-slate-300 font-bold pr-1">بەرواری دەستپێک</span>} rules={[{ required: true }]}>
                          <DatePicker showTime className="w-full! bg-black/40! border-white/10! h-14! rounded-2xl hover:border-[#D4AF37]/50!" />
                        </Form.Item>
                        <Form.Item name="enddate" label={<span className="text-xs! text-slate-300 font-bold pr-1">بەرواری کۆتایی</span>} rules={[{ required: true }]}>
                          <DatePicker showTime className="w-full! bg-black/40! border-white/10! h-14! rounded-2xl hover:border-[#D4AF37]/50!" />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Controls */}
                <div className="lg:col-span-4! space-y-8!">
                  <div className="bg-gradient-to-b from-[#D4AF37]/10 to-black/40! p-8! rounded-[3rem]! border! border-[#D4AF37]/20 shadow-2xl backdrop-blur-xl">
                    <div className="flex! items-center! gap-3! text-[#D4AF37] text-[12px] font-black mb-10! uppercase tracking-[0.3em]">
                      <Settings size={16} /> پارامیتەرەکان
                    </div>
                    
                    <div className="space-y-6!">
                      <Form.Item name="code" label={<span className="text-xs! text-slate-400 font-bold">کۆدی ناسنامە</span>} rules={[{ required: true }]}>
                        <Input 
                          prefix={<Hash size={16} className="ml-2 text-[#D4AF37]/60" />} 
                          className="bg-black/60! border-white/10! h-14! rounded-2xl font-mono text-lg! text-[#D4AF37] focus:border-[#D4AF37]!" 
                        />
                      </Form.Item>
                      
                      <Form.Item name="score" label={<span className="text-xs! text-slate-400 font-bold">خاڵی دیاریکراو (Score)</span>} rules={[{ required: true }]}>
                        <Input 
                          prefix={<Trophy size={18} className="ml-2 text-amber-500" />} 
                          className="bg-black/60! border-white/10! h-14! rounded-2xl font-black text-xl! text-amber-500" 
                        />
                      </Form.Item>
                    </div>
                    
                    <div className="pt-10! mt-10! border-t! border-white/5 space-y-4!">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={createLoading}
                        icon={<Save size={20} className="ml-1" />}
                        className="w-full! h-16! rounded-[1.25rem]! bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700]! border-none! shadow-2xl shadow-[#D4AF37]/30 text-black! font-black! text-lg! hover:scale-[1.03] transition-all duration-300"
                      >
                        {isEdit ? "نوێکردنەوە" : "تۆمارکردن"}
                      </Button>
                      
                      <Button 
                        onClick={() => form.resetFields()} 
                        icon={<XCircle size={18} className="ml-1" />}
                        className="w-full! h-14! rounded-[1.25rem]! border-white/5! bg-white/5! text-slate-400 font-bold hover:text-white! hover:bg-white/10! hover:border-white/20! transition-all"
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