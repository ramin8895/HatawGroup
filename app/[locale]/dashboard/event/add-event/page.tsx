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
  Spin,
  Empty,
} from "antd";
import {
  Hash,
  Trophy,
  Sparkles,
  CalendarRange,
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

  const {
    data: eventScoreData,
    isPending: isFetchingEventScore,
    refetch: refetchScores,
  } = useGetEventScoreById(createdEventId || undefined);

  useEffect(() => {
    if (isEdit && eventData?.data) {
      form.setFieldsValue({
        titleEvent: eventData.data.titleEvent || "",
        codeEvent: eventData.data.codeEvent || "",
      });
      setCreatedEventId(id as number);
    }
  }, [eventData, id, isEdit, form]);

  const handleEventSubmit = (values: any) => {
    const payloadEvent = {
      titleEvent: values.titleEvent,
      codeEvent: String(values.codeEvent),
      ...(isEdit && { id }),
    };

    createEvent(payloadEvent as any, {
      onSuccess: (data: any) => {
        message.success(
          isEdit ? "چالاکیەکە نوێکرایەوە" : "🎉 چالاکیەکە تۆمار کرا"
        );
        // دریافت ID از ریسپانس سرور (فرض بر این است که دیتا شامل id است)
        const newId = data?.data?.id || data?.id || id;
        if (newId) {
          setCreatedEventId(newId);
          setStep(2);
        }
      },
      onError: () => message.error("کێشەیەک ڕوویدا"),
    });
  };

  const handleScoreSubmit = (values: any) => {
    if (!createdEventId) {
      message.warning("تکایە سەرەتا چالاکییەکە تۆمار بکە");
      return;
    }

    const payloadScore = {
      eventId: createdEventId,
      startdate: values.range[0].toISOString(),
      enddate: values.range[1].toISOString(),
      scoreEvent: Number(values.scoreEvent),
    };

    createEventScore(payloadScore as any, {
      onSuccess: () => {
        message.success("✅ امتیازەکە زیاد کرا");
        scoreForm.resetFields();
        refetchScores();
      },
      onError: () => message.error("هەڵەیەک ڕوویدا"),
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: { colorPrimary: "#D4AF37", borderRadius: 12 },
      }}
    >
      <div
        className="min-h-screen! bg-[#FAFAFA]! p-4! md:p-8! flex! justify-center!"
        dir="rtl"
      >
        <div className="max-w-4xl! w-full! space-y-4!">
          {/* Header */}
          <div className="bg-white! p-5! border! border-gray-100! rounded-2xl! flex! items-center! justify-between!">
            <div className="flex! items-center! gap-3!">
              <div className="p-2! bg-gray-50! rounded-lg!">
                {isEdit && isFetchingEvent ? (
                  <Loader2 className="animate-spin text-gray-400!" size={20} />
                ) : (
                  <Sparkles className="text-[#D4AF37]!" size={20} />
                )}
              </div>
              <h1 className="text-lg! font-bold! m-0! text-gray-800!">
                {isEdit ? "دەستکاری چالاکی" : "چالاکی نوێ"}
              </h1>
            </div>
          </div>

          <div className="grid! grid-cols-1! lg:grid-cols-12! gap-4!">
            {/* Step 1: Info */}
            <div
              className={`lg:col-span-5! ${
                step === 2 && !isEdit ? "opacity-50!" : ""
              }`}
            >
              <Spin spinning={isEdit && isFetchingEvent}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleEventSubmit}
                  className="bg-white! p-6! rounded-2xl! border! border-gray-100!"
                >
                  <div className="text-[11px]! font-bold! text-gray-400! mb-4! uppercase! tracking-wider!">
                    ١. زانیارییە گشتییەکان
                  </div>
                  <Form.Item
                    name="titleEvent"
                    label="ناونیشان"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="ناونیشانی چالاکی..."
                      className="h-11! rounded-lg!"
                      disabled={step === 2 && !isEdit}
                    />
                  </Form.Item>
                  <Form.Item
                    name="codeEvent"
                    label="کۆد"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix={<Hash size={14} className="text-gray-400!" />}
                      placeholder="کۆدی چالاکی"
                      className="h-11! rounded-lg!"
                      disabled={step === 2 && !isEdit}
                    />
                  </Form.Item>

                  {step === 1 || isEdit ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={eventLoading}
                      block
                      className="h-11! rounded-lg! bg-[#1A1A1A]! border-none! font-medium!"
                    >
                      {isEdit ? "نوێکردنەوە" : "بەردەوام بوون"}
                    </Button>
                  ) : (
                    <Button
                      type="link"
                      onClick={() => setStep(1)}
                      className="w-full! text-gray-400! text-xs!"
                    >
                      گۆڕینی زانیارییەکان
                    </Button>
                  )}
                </Form>
              </Spin>
            </div>

            {/* Step 2: Scores */}
            <div className="lg:col-span-7! space-y-4!">
              {step === 1 && !isEdit ? (
                <div className="h-full! min-h-[300px]! border! border-dashed! border-gray-200! rounded-2xl! flex! flex-col! items-center! justify-center! bg-white/50!">
                  <CalendarRange size={32} className="mb-2! text-gray-300!" />
                  <p className="text-gray-400! text-sm!">
                    سەرەتا چالاکییەکە تۆمار بکە
                  </p>
                </div>
              ) : (
                <>
                  <Form
                    form={scoreForm}
                    layout="vertical"
                    onFinish={handleScoreSubmit}
                    className="bg-white! p-6! rounded-2xl! border! border-gray-100!"
                  >
                    <div className="text-[11px]! font-bold! text-gray-400! mb-4! uppercase! tracking-wider!">
                      ٢. زیادکردنی امتیاز
                    </div>
                    <div className="grid! grid-cols-1! md:grid-cols-2! gap-3!">
                      <Form.Item
                        name="range"
                        label="ماوە"
                        rules={[{ required: true }]}
                        className="md:col-span-2!"
                      >
                        <DatePicker.RangePicker
                          showTime
                          format="YYYY-MM-DD HH:mm"
                          className="w-full! h-11! rounded-lg!"
                        />
                      </Form.Item>
                      <Form.Item
                        name="scoreEvent"
                        label="امتیاز"
                        rules={[{ required: true }]}
                        className="md:col-span-2!"
                      >
                        <Input
                          type="number"
                          prefix={
                            <Trophy size={14} className="text-gray-400!" />
                          }
                          className="h-11! rounded-lg!"
                        />
                      </Form.Item>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={evenScoretLoading}
                      className="h-11! mt-2! rounded-lg! bg-[#D4AF37]! border-none! font-medium!"
                    >
                      تۆمارکردنی امتیاز
                    </Button>
                  </Form>

                  <div className="bg-white! p-6! rounded-2xl! border! border-gray-100!">
                    <div className="flex! items-center! justify-between! mb-4!">
                      <div className="flex! items-center! gap-2! text-gray-800! font-bold! text-sm!">
                        <ArrowLeftRight size={16} className="text-[#D4AF37]!" />{" "}
                        لیست
                      </div>
                      <div className="text-[10px]! text-gray-400! bg-gray-50! px-2! py-1! rounded-md!">
                        تعداد:{" "}
                        {eventScoreData?.data?.eventScoreList?.length || 0}
                      </div>
                    </div>

                    <Spin spinning={isFetchingEventScore}>
                      <div className="space-y-2!">
                        {eventScoreData?.data?.eventScoreList?.length ? (
                          eventScoreData.data.eventScoreList.map(
                            (item: any, index: number) => (
                              <div
                                key={item.idScore}
                                className="p-3! bg-gray-50/50! border! border-gray-100! rounded-xl! flex! items-center! justify-between!"
                              >
                                <div className="flex! items-center! gap-3!">
                                  <div className="text-xs! text-gray-400! font-mono!">
                                    0{index + 1}
                                  </div>
                                  <div>
                                    <div className="flex! items-center! gap-2! text-[10px]! text-gray-400!">
                                      <Calendar size={10} />
                                      {dayjs(item.startdate).format(
                                        "MM/DD HH:mm"
                                      )}{" "}
                                      - {dayjs(item.enddate).format("HH:mm")}
                                    </div>
                                    <div className="text-xs! font-bold! text-gray-700!">
                                      بڕی نمرە: {item.scoreEvent}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-[#D4AF37]! font-bold! text-xs!">
                                  +{item.scoreEvent}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="هیچ امتیازێک نییە"
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
