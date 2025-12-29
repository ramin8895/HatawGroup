"use client";
import { AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ExternalLink, Zap } from "lucide-react";
import { useAddEventUser } from "@/api/EventUserService/useRequest";
const LotterySection = ({ translations, locale }: any) => {
  const [lotteryCode, setLotteryCode] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  // استفاده از هوک میوتیشن
  const { mutate: addEvent, isPending: isSubmitting } = useAddEventUser();

  const isRtl = locale === "fa" || locale === "ku";
  const { Lottery = {} } = translations;

  // تابع هندل کردن کلیک دکمه
  const handleSubmit = () => {
    if (!lotteryCode) return; // ولیدیشن ساده برای خالی نبودن

    addEvent(
      { codeEvent: lotteryCode },
      {
        onSuccess: (response: any) => {
          console.log("Success:", response);
          setLotteryCode("");
        },
        onError: (error: any) => {
          console.error("Error:", error);
        },
      }
    );
  };

  return (
    <section
      id="award"
      className="py-32! relative!"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl! mx-auto! px-6!">
        {/* باکس اصلی */}
        <div className="bg-gradient-to-br! from-[#B8860B]/20! to-black/60! border! border-[#D4AF37]/20! rounded-[3rem]! p-12! md:p-20! relative! overflow-hidden! backdrop-blur-xl! text-center! shadow-[0_20px_50px_-20px_rgba(212,175,55,0.2)]">
          <div
            className={`absolute! top-0! ${
              isRtl ? "right-0!" : "left-0!"
            } p-8! text-[#D4AF37]! opacity-10! pointer-events-none!`}
          >
            <Trophy size={200} />
          </div>

          <h2 className="text-4xl! md:text-6xl! font-black! text-white! mb-8!">
            {Lottery.title}{" "}
            <span className="text-transparent! text-4xl! md:text-6xl! bg-clip-text! bg-gradient-to-r! from-[#F5E1A4]! via-[#D4AF37]! to-[#B8860B]!">
              {Lottery.brandName}
            </span>
          </h2>

          <div className="inline-block! px-10! py-4! bg-gradient-to-r! from-[#D4AF37]! to-[#B8860B]! text-black! rounded-full! font-black! text-2xl! mb-10! shadow-[0_10px_30px_-5px_rgba(212,175,55,0.4)]!">
            {Lottery.prizePool}
          </div>

          <p className="text-lg! text-slate-300! mb-12! leading-relaxed! max-w-2xl! mx-auto!">
            {Lottery.description}
          </p>

          <div className="flex! flex-col! items-center! justify-center! gap-6!">
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex! items-center! gap-2! text-[#D4AF37]!"
                >
                  <Loader2 className="animate-spin!" />
                  {Lottery.checkingAccess}
                </motion.div>
              ) : status === "authenticated" && session?.backendToken ? (
                /* --- فرم وارد کردن کد --- */
                <motion.div
                  key="input"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full! max-w-md! relative! group!"
                >
                  <input
                    type="text"
                    value={lotteryCode}
                    onChange={(e) => setLotteryCode(e.target.value)}
                    placeholder={Lottery.inputPlaceholder}
                    disabled={isSubmitting} // غیرفعال کردن هنگام ارسال
                    className="w-full! bg-white/5! border-2! border-white/10! rounded-2xl! py-5! px-8! text-center! text-white! text-xl! font-bold! tracking-widest! outline-none! focus:border-[#D4AF37]! focus:bg-[#D4AF37]/5! transition-all! placeholder:text-slate-600! placeholder:text-sm! placeholder:tracking-normal! disabled:opacity-50!"
                  />
                  <Zap
                    className={`absolute! ${
                      isRtl ? "right-5!" : "left-5!"
                    } top-1/2! -translate-y-1/2! text-[#D4AF37]! group-focus-within:animate-pulse!`}
                    size={24}
                  />

                  <button
                    onClick={handleSubmit} // اتصال تابع هندل
                    disabled={isSubmitting || !lotteryCode} // غیرفعال کردن دکمه
                    className="mt-6! w-full! py-4! bg-[#D4AF37]! hover:bg-[#C19A2E]! text-black! rounded-2xl! font-black! transition-all! shadow-lg! shadow-[#D4AF37]/20! flex! items-center! justify-center! gap-2! disabled:opacity-70! disabled:cursor-not-allowed!"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        در حال ثبت...
                      </>
                    ) : (
                      <>
                        {Lottery.submitButton} <ExternalLink size={18} />
                      </>
                    )}
                  </button>
                </motion.div>
              ) : (
                /* --- دکمه فراخوان --- */
                <motion.div
                  key="signin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex! flex-wrap! justify-center! gap-6!"
                >
                  <button
                    onClick={() => router.push("/auth/signin")}
                    className="px-10! py-4! bg-white! text-black! rounded-2xl! font-black! hover:bg-[#D4AF37]! transition-all! shadow-xl! hover:shadow-[#D4AF37]/20!"
                  >
                    {Lottery.joinButton}
                  </button>
                  <div className="flex! items-center! gap-2! text-[#D4AF37]/80! font-bold!">
                    {Lottery.countdown}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotterySection;
