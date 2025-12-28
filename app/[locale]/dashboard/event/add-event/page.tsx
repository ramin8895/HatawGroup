"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  ConfigProvider,
  theme,
  Divider,
  Spin,
  Empty,
} from "antd";
import {
  Hash,
  Trophy,
  Sparkles,
  Plus,
  CalendarRange,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Type,
  Calendar,
  ArrowLeftRight,
} from "lucide-react";
import {
  useCreateEvents,
  useCreateEventsScore,
  useGetEventById,
  useGetEventScoreById,
} from "@/api/EventService/useRequest";
import dayjs from "dayjs";

const AddEvent: React.FC<{ id?: number }> = ({ id }) => {
  const [form] = Form.useForm();
  const [scoreForm] = Form.useForm();

  const isEdit = Boolean(id);
  const [createdEventId, setCreatedEventId] = useState<number | null>(
    id || null
  );
  const [step, setStep] = useState(isEdit ? 2 : 1);

  const { mutate: createEvent, isPending: eventLoading } = useCreateEvents();
  const { mutate: createEventScore, isPending: evenScoretLoading } =
    useCreateEventsScore();

  const { data: eventData, isPending: isFetchingEvent } = useGetEventById(id);

  // دریافت لیست امتیازها بر اساس آیدی (چه ایدی ورودی چه ایدی جدید ساخته شده)
  const {
    data: eventScoreData,
    isPending: isFetchingEventScore,
    refetch: refetchScores,
  } = useGetEventScoreById(createdEventId || undefined);

  useEffect(() => {
    if (id && eventData?.data) {
      form.setFieldsValue({
        titleEvent: eventData.data.titleEvent || "",
        codeEvent: eventData.data.codeEvent || "",
      });
      setCreatedEventId(id);
      setStep(2);
    }
  }, [eventData, id, form]);

  const handleEventSubmit = (values: any) => {
    const payloadEvent = {
      titleEvent: values.titleEvent,
      codeEvent: String(values.codeEvent),
    };

    createEvent(payloadEvent as any, {
      onSuccess: (data: any) => {
        message.success("🎉 چالاکیەکە بە سەرکەوتوویی تۆمار کرا");
        const newId = data?.id || id;
        setCreatedEventId(newId);
        setStep(2);
      },
      onError: () => message.error("کێشەیەک ڕوویدا"),
    });
  };

  const handleScoreSubmit = (values: any) => {
    if (!createdEventId) return;

    const payloadScore = {
      eventId: createdEventId,
      startdate: values.range[0].toISOString(),
      enddate: values.range[1].toISOString(),
      scoreEvent: Number(values.scoreEvent),
    };

    createEventScore(payloadScore as any, {
      onSuccess: () => {
        message.success("✅ امتیازەکە بە سەرکەوتوویی زیاد کرا");
        scoreForm.resetFields();
        refetchScores(); // بروزرسانی لیست پس از ثبت موفق
      },
      onError: () => message.error("هەڵەیەک ڕوویدا"),
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: { colorPrimary: "#D4AF37", borderRadius: 20 },
      }}
    >
      <div
        className="min-h-screen! bg-[#F7F7F7]! p-4! md:p-10! flex! justify-center!"
        dir="rtl"
      >
        <div className="max-w-5xl! w-full! space-y-6!">
          {/* Header */}
          <div className="bg-white! p-6! border! border-gray-200! rounded-[2.5rem]! flex! items-center! justify-between!">
            <div className="flex! items-center! gap-4!">
              <div className="p-3! bg-[#D4AF37]/10! rounded-2xl!">
                {isFetchingEvent ? (
                  <Loader2 className="animate-spin text-[#D4AF37]!" size={24} />
                ) : (
                  <Sparkles className="text-[#D4AF37]!" size={24} />
                )}
              </div>
              <h1 className="text-xl! font-black! m-0!">
                {isEdit
                  ? "دەستکاری کردنی چالاکی"
                  : "تۆمارکردنی چالاکی و امتیاز"}
              </h1>
            </div>
          </div>

          <div className="grid! grid-cols-1! lg:grid-cols-12! gap-6!">
            {/* Step 1: Event Info */}
            <div
              className={`lg:col-span-5! transition-all! ${
                step === 2 ? "opacity-60!" : ""
              }`}
            >
              <Spin spinning={isFetchingEvent}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleEventSubmit}
                  className="bg-white! p-8! rounded-[3rem]! border! border-gray-100!"
                >
                  <div className="flex! items-center! gap-3! text-[#D4AF37]! text-[12px]! font-black! mb-6! uppercase!">
                    <Type size={16} /> ١. زانیارییە سەرەکییەکان
                  </div>
                  <Form.Item
                    name="titleEvent"
                    label="ناونیشانی چالاکی"
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="h-12! rounded-xl!"
                      disabled={step === 2}
                    />
                  </Form.Item>
                  <Form.Item
                    name="codeEvent"
                    label="کۆدی چالاکی"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix={<Hash size={14} />}
                      className="bg-gray-50! h-12! rounded-xl!"
                      disabled={step === 2}
                    />
                  </Form.Item>
                  {step === 1 ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={eventLoading}
                      block
                      className="h-14! rounded-xl! bg-[#D4AF37]! font-bold!"
                    >
                      بەردەوام بوون
                    </Button>
                  ) : (
                    <Button
                      type="link"
                      onClick={() => setStep(1)}
                      className="w-full! text-[#D4AF37]!"
                    >
                      گۆڕینی زانیارییەکان
                    </Button>
                  )}
                </Form>
              </Spin>
            </div>

            {/* Step 2: Score Form & History */}
            <div className="lg:col-span-7! space-y-6!">
              {step === 1 ? (
                <div className="h-[400px]! border-2! border-dashed! border-gray-200! rounded-[3rem]! flex! flex-col! items-center! justify-center! text-gray-400! bg-gray-50/50!">
                  <CalendarRange size={40} className="mb-4! opacity-20!" />
                  <p className="font-bold!">سەرەتا چالاکییەکە تۆمار بکە</p>
                </div>
              ) : (
                <>
                  {/* Form */}
                  <Form
                    form={scoreForm}
                    layout="vertical"
                    onFinish={handleScoreSubmit}
                    className="bg-white! p-8! rounded-[3rem]! border! border-[#D4AF37]/20! shadow-xl!"
                  >
                    <div className="flex! items-center! gap-3! text-[#D4AF37]! text-[12px]! font-black! uppercase! mb-8!">
                      <Trophy size={18} /> ٢. زیادکردنی امتیاز و کات
                    </div>
                    <div className="space-y-4! p-6! bg-gray-50! rounded-[2.5rem]!">
                      <Form.Item
                        name="range"
                        label="ماوەی کاتی"
                        rules={[{ required: true }]}
                      >
                        <DatePicker.RangePicker
                          showTime
                          format="YYYY-MM-DD HH:mm"
                          className="w-full! h-14! rounded-2xl!"
                        />
                      </Form.Item>
                      <Form.Item
                        name="scoreEvent"
                        label="بڕی امتیاز"
                        rules={[{ required: true }]}
                      >
                        <Input
                          prefix={<Trophy size={16} />}
                          type="number"
                          className="h-14! rounded-2xl!"
                        />
                      </Form.Item>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={evenScoretLoading}
                      className="h-16! mt-6! rounded-2xl! bg-[#1A1A1A]! text-white! font-black!"
                    >
                      تۆمارکردنی امتیاز
                    </Button>
                  </Form>

                  {/* Score History List */}
                  <div className="bg-white! p-8! rounded-[3rem]! border! border-gray-100!">
                    <div className="flex! items-center! justify-between! mb-6!">
                      <h3 className="text-sm! font-bold! m-0! flex! items-center! gap-2!">
                        <ArrowLeftRight size={18} className="text-[#D4AF37]!" />{" "}
                        لیست امتیازەکانی تۆمارکراو
                      </h3>
                      <span className="text-[10px]! bg-gray-100! px-3! py-1! rounded-full! text-gray-500! font-bold!">
                        کۆی گشتی:{" "}
                        {eventScoreData?.data?.eventScoreList?.length || 0}
                      </span>
                    </div>

                    <Spin spinning={isFetchingEventScore}>
                      <div className="space-y-3!">
                        {eventScoreData?.data?.eventScoreList &&
                        eventScoreData.data.eventScoreList.length > 0 ? (
                          eventScoreData.data.eventScoreList.map(
                            (item: any, index: number) => (
                              <div
                                key={item.idScore}
                                className="p-4! bg-gray-50! border! border-gray-100! rounded-2xl! flex! items-center! justify-between! transition-hover! hover:border-[#D4AF37]/30!"
                              >
                                <div className="flex! items-center! gap-4!">
                                  <div className="w-10! h-10! bg-white! rounded-xl! flex! items-center! justify-center! border! border-gray-100! text-[#D4AF37]! font-bold!">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <div className="flex! items-center! gap-2! text-[11px]! text-gray-500!">
                                      <Calendar size={12} />
                                      <span>
                                        {dayjs(item.startdate).format(
                                          "YYYY/MM/DD HH:mm"
                                        )}
                                      </span>
                                      <span>-</span>
                                      <span>
                                        {dayjs(item.enddate).format("HH:mm")}
                                      </span>
                                    </div>
                                    <div className="text-xs! font-black! mt-1!">
                                      نمرەی چالاکی: {item.scoreEvent}
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-[#D4AF37]/10! text-[#D4AF37]! px-3! py-1! rounded-lg! text-[10px]! font-black!">
                                  +{item.scoreEvent} امتیاز
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="هیچ امتیازێک تۆمار نەکراوە"
                          />
                        )}
                      </div>
                    </Spin>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AddEvent;
