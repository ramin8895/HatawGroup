"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, RotateCw, User, Star } from "lucide-react";

// ---------------------- Types ----------------------
interface Participant {
  id: number;
  name: string;
  score: number;
  color: string;
}

// ------------------- Participants -------------------
const PARTICIPANTS: Participant[] = [
  { id: 1, name: "عەلی ر.ا", score: 120, color: "#6366f1" },
  { id: 2, name: "سارا م.ی", score: 150, color: "#a855f7" },
  { id: 3, name: "محسن ح.س", score: 105, color: "#ec4899" },
  { id: 4, name: "زەهرا ک.ن", score: 180, color: "#f43f5e" },
  { id: 5, name: "ڕەزا ا.م", score: 110, color: "#f59e0b" },
  { id: 6, name: "مەریم ن.ف", score: 135, color: "#10b981" },
  { id: 7, name: "ئومێد ی.ع", score: 160, color: "#06b6d4" },
  { id: 8, name: "نەدا س.ه", score: 100, color: "#3b82f6" },
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
    const randomSpins = Math.floor(Math.random() * 6) + 7; // 7–13 خول
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
            borderLeft: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 text-white font-bold text-sm"
            style={{
              transform: `rotate(${SEGMENT_DEGREE / 2}deg) translateY(40px)`,
              writingMode: "vertical-rl",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {p.name}
          </div>
        </div>
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#020617] rounded-[3rem] p-8 border border-white/5 relative overflow-hidden" dir="rtl">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center mb-12!">
        <h1 className="text-4xl font-black text-white flex items-center justify-center gap-3">
          <Trophy className="text-amber-400" size={40} />
          قرعەکێشی چالاکیەکان
        </h1>
        <p className="text-slate-400 mt-2! font-medium">شانسی خۆت تاقی بکەرەوە بۆ بردنەوەی خەڵات</p>
      </div>

      <div className="relative w-[450px] h-[450px] mb-16!">
        {/* Pointer (نشانگر بالا) */}
        <div className="absolute -top-4! left-1/2 -translate-x-1/2 z-40">
          <div className="w-8 h-10 bg-white clip-path-pointer shadow-xl flex items-center justify-center pt-1!">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
        </div>

        {/* Outer Ring */}
        <div className="absolute inset-[-15px] rounded-full border-[12px] border-white/5 shadow-[0_0_30px_rgba(99,102,241,0.2)]" />

        {/* The Wheel */}
        <motion.div
          animate={{ rotate: finalRotation }}
          transition={{ duration: 4.5, ease: [0.2, 0, 0.1, 1] }}
          className="w-full h-full rounded-full relative overflow-hidden border-4 border-white/10 shadow-2xl"
          style={{ transformOrigin: "center" }}
        >
          {wheelSegments}
          
          {/* Inner Decorative Circle */}
          <div className="absolute inset-0 rounded-full border-[40px] border-black/10 pointer-events-none" />
        </motion.div>

        {/* Center Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#0f172a] rounded-full border-4 border-white/10 z-30 shadow-2xl flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <Star className="text-white fill-white" size={24} />
            </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`group relative px-12! py-5! rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl overflow-hidden
            ${isSpinning 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-indigo-600/30"
            }`}
        >
          <span className="relative z-10 flex items-center gap-3">
            {isSpinning ? <RotateCw className="animate-spin" /> : <Sparkles />}
            {isSpinning ? "لە پڕۆسەدایە..." : "ئێستا دەستپێبکە"}
          </span>
          {!isSpinning && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          )}
        </button>

        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] min-w-[350px] text-center shadow-2xl relative"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/20 border-8 border-[#020617]">
                <Trophy className="text-[#020617]" size={32} />
              </div>
              
            <div className="mt-6!">
                <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2!">Winner Announced</p>
                <h2 className="text-4xl font-black text-white mb-4! tracking-tight">
                  {winner.name}
                </h2>
                <div className="flex items-center justify-center gap-6! py-3! border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Participant ID</span>
                    <span className="text-white font-mono">#00{winner.id}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Final Score</span>
                    <span className="text-amber-400 font-bold">{winner.score} Pts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-slate-500 font-medium"
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