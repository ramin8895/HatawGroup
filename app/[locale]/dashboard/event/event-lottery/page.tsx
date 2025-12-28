"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, RotateCw, Star, Crown } from "lucide-react";

// ---------------------- Types ----------------------
interface Participant {
  id: number;
  name: string;
  score: number;
  color: string;
}

// ------------------- Participants -------------------
// رنگ‌های سگمنت‌ها به تناژهای طلایی، کرم و بژ تغییر یافت
const PARTICIPANTS: Participant[] = [
  { id: 1, name: "عەلی ر.ا", score: 120, color: "#D4AF37" }, // Gold
  { id: 2, name: "سارا م.ی", score: 150, color: "#F5E1A4" }, // Cream Gold
  { id: 3, name: "محسن ح.س", score: 105, color: "#B8860B" }, // Dark Gold
  { id: 4, name: "زەهرا ک.ن", score: 180, color: "#E5C158" }, // Bright Gold
  { id: 5, name: "ڕەزا ا.م", score: 110, color: "#FAF9F6" }, // Off White
  { id: 6, name: "مەریم ن.ف", score: 135, color: "#D4AF37" }, 
  { id: 7, name: "ئومێد ی.ع", score: 160, color: "#F5E1A4" },
  { id: 8, name: "نەدا س.ه", score: 100, color: "#B8860B" },
];

const NUM_SEGMENTS = PARTICIPANTS.length;
const SEGMENT_DEGREE = 360 / NUM_SEGMENTS;

const EventLottery = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [finalRotation, setFinalRotation] = useState(0);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const randomIndex = Math.floor(Math.random() * NUM_SEGMENTS);
    const selectedWinner = PARTICIPANTS[randomIndex];

    const winningSectorDegree = SEGMENT_DEGREE * randomIndex + SEGMENT_DEGREE / 2;
    const randomSpins = Math.floor(Math.random() * 6) + 7; 
    const totalRotation = 360 * randomSpins + (360 - winningSectorDegree);

    setFinalRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedWinner);
    }, 4500);
  }, [isSpinning]);

  const wheelSegments = useMemo(() => {
    return PARTICIPANTS.map((p, index) => {
      const rotateDeg = index * SEGMENT_DEGREE;
      return (
        <div
          key={p.id}
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotateDeg}deg)`,
            backgroundColor: p.color,
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan((SEGMENT_DEGREE * Math.PI) / 360)}% 0%)`,
            borderLeft: "2px solid rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 text-[#1A1A1A] font-black text-[11px]"
            style={{
              transform: `rotate(${SEGMENT_DEGREE / 2}deg) translateY(50px)`,
              writingMode: "vertical-rl",
              letterSpacing: "0.05em"
            }}
          >
            {p.name}
          </div>
        </div>
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-[#FDFDFD]! rounded-[4rem]! p-8! border! border-gray-100! relative overflow-hidden font-sans" dir="rtl">
      
      {/* Decorative Gold Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center mb-16!">
        <motion.div 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          className="inline-flex items-center justify-center p-3 bg-[#D4AF37]/10 rounded-2xl mb-4"
        >
          <Crown className="text-[#D4AF37]" size={32} />
        </motion.div>
        <h1 className="text-4xl! font-black! text-[#1A1A1A] m-0!">
          قرعەکێشی چالاکیەکان
        </h1>
        <p className="text-gray-400 mt-3! font-bold text-sm tracking-wide">شانسی خۆت تاقی بکەرەوە بۆ بردنەوەی خەڵاتی HATAW</p>
      </div>

      <div className="relative w-[480px] h-[480px] mb-20!">
        {/* Pointer - Luxury Gold Design */}
        <div className="absolute -top-6! left-1/2 -translate-x-1/2 z-40 drop-shadow-2xl">
          <div className="w-10 h-14 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] clip-path-pointer flex items-center justify-center pt-1 shadow-inner">
             <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        {/* Outer Ring - Gold/Marble effect */}
        <div className="absolute inset-[-20px] rounded-full border-[15px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.08),inset_0_0_20px_rgba(212,175,55,0.1)] z-10" />
        <div className="absolute inset-[-22px] rounded-full border border-[#D4AF37]/20 z-0" />

        {/* The Wheel */}
        <motion.div
          animate={{ rotate: finalRotation }}
          transition={{ duration: 4.5, ease: [0.2, 0, 0.1, 1] }}
          className="w-full h-full rounded-full relative overflow-hidden border-[8px] border-white shadow-2xl"
          style={{ transformOrigin: "center" }}
        >
          {wheelSegments}
          
          {/* Inner Decorative Circle */}
          <div className="absolute inset-0 rounded-full border-[60px] border-black/5 pointer-events-none" />
        </motion.div>

        {/* Center Pin - Premium Clock Style */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-[6px] border-[#F5E1A4] z-30 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30">
                <Star className="text-white fill-white" size={24} />
            </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 relative z-10">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`group relative px-16! py-6! rounded-[2rem]! font-black text-xl transition-all duration-500 shadow-2xl overflow-hidden
            ${isSpinning 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed scale-95" 
              : "bg-[#1A1A1A] text-white hover:bg-[#D4AF37] hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            }`}
        >
          <span className="relative z-10 flex items-center gap-3 tracking-tight">
            {isSpinning ? <RotateCw className="animate-spin" /> : <Sparkles size={20} />}
            {isSpinning ? "لە پڕۆسەدایە..." : "ئێستا دەستپێبکە"}
          </span>
          {!isSpinning && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          )}
        </button>

        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="p-10 bg-white border border-[#D4AF37]/20 rounded-[3rem] min-w-[400px] text-center shadow-[0_40px_80px_rgba(212,175,55,0.15)] relative overflow-hidden"
            >
              {/* Confetti-like decoration inside winner box */}
              <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={40} className="text-[#D4AF37]" /></div>
              
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-b from-[#FFD700] to-[#D4AF37] rounded-full flex items-center justify-center shadow-xl border-[6px] border-[#FDFDFD]">
                <Trophy className="text-white" size={36} />
              </div>
              
              <div className="mt-8!">
                <p className="text-[#D4AF37] font-black uppercase tracking-[0.2em] text-[10px] mb-3!">🏆 پیرۆزە! براوە دیاریکرا 🏆</p>
                <h2 className="text-5xl font-black text-[#1A1A1A] mb-6! tracking-tighter">
                  {winner.name}
                </h2>
                <div className="flex items-center justify-center gap-8! py-5! border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest">ID Code</span>
                    <span className="text-[#1A1A1A] font-mono font-bold text-lg">#H-{winner.id}00</span>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-100" />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Points</span>
                    <span className="text-[#D4AF37] font-black text-lg">{winner.score} Pts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-gray-400 font-bold text-sm italic tracking-wide"
            >
              {isSpinning ? "چاوەڕێی دیاریکردنی براوە بکە..." : "ئامادەی بۆ دیاریکردنی براوەی ئەمڕۆ؟"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .clip-path-pointer {
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default EventLottery;