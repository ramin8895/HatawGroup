"use client";
import { AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ExternalLink, Zap } from "lucide-react";

const LotterySection = () => {
  const [lotteryCode, setLotteryCode] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <section id="award" className="py-32! relative!">
      <div className="max-w-5xl! mx-auto! px-6!">
        {/* باکس اصلی با گرادینت طلایی تیره و حاشیه درخشان */}
        <div className="bg-gradient-to-br! from-amber-950/40! to-black/60! border! border-amber-500/20! rounded-[3rem]! p-12! md:p-20! relative! overflow-hidden! backdrop-blur-xl! text-center! shadow-[0_20px_50px_-20px_rgba(245,158,11,0.2)]">
          
          {/* آیکون کاپ بزرگ در پس‌زمینه */}
          <div className="absolute! top-0! right-0! p-8! text-amber-500! opacity-10! pointer-events-none!">
            <Trophy size={200} />
          </div>

          <h2 className="text-4xl! md:text-6xl! font-black! text-white! mb-8!">
            🏆 خـلاتی <span className="text-transparent! bg-clip-text! bg-gradient-to-r! from-amber-200! to-amber-500!">HATAW</span>
          </h2>

          {/* نشان مبلغ جایزه با استایل طلایی درخشان */}
          <div className="inline-block! px-10! py-4! bg-gradient-to-r! from-amber-500! to-amber-600! text-black! rounded-full! font-black! text-2xl! mb-10! shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4)]!">
            900$ مجمـوع جـوایز
          </div>

          <p className="text-lg! text-slate-300! mb-12! leading-relaxed! max-w-2xl! mx-auto!">
            آموزش ببین، کدها را پیدا کن و برنده باش. ۱۸۰ ویدیوی اختصاصی برندینگ
            در یوتیوب منتظر شماست.
          </p>

          <div className="flex! flex-col! items-center! justify-center! gap-6!">
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex! items-center! gap-2! text-amber-500!"
                >
                  <Loader2 className="animate-spin!" />
                  در حال بررسی دسترسی...
                </motion.div>
              ) : status === "authenticated" && session?.backendToken ? (
                /* --- فرم وارد کردن کد (کاربر وارد شده) --- */
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
                    placeholder="کۆدی بەشداری لێرە بنووسە..."
                    className="w-full! bg-white/5! border-2! border-white/10! rounded-2xl! py-5! px-8! text-center! text-white! text-xl! font-bold! tracking-widest! outline-none! focus:border-amber-500! focus:bg-amber-500/5! transition-all! placeholder:text-slate-600! placeholder:text-sm! placeholder:tracking-normal!"
                  />
                  <Zap
                    className="absolute! right-5! top-1/2! -translate-y-1/2! text-amber-500! group-focus-within:animate-pulse!"
                    size={24}
                  />

                  <button className="mt-6! w-full! py-4! bg-amber-500! hover:bg-amber-400! text-black! rounded-2xl! font-black! transition-all! shadow-lg! shadow-amber-600/20! flex! items-center! justify-center! gap-2!">
                    تۆمارکردنی کۆد <ExternalLink size={18} />
                  </button>
                </motion.div>
              ) : (
                /* --- دکمه فراخوان (کاربر وارد نشده) --- */
                <motion.div
                  key="signin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex! flex-wrap! justify-center! gap-6!"
                >
                  <button
                    onClick={() => router.push("/auth/signin")}
                    className="px-10! py-4! bg-white! text-black! rounded-2xl! font-black! hover:bg-amber-500! transition-all! shadow-xl! hover:shadow-amber-500/20!"
                  >
                    به چالش بپیوندید
                  </button>
                  <div className="flex! items-center! gap-2! text-amber-400/80! font-bold!">
                    شروع دور جدید تا ۱۲ روز دیگر
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