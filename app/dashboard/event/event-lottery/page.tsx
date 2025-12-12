"use client";

import React, { useState, useMemo, useCallback } from 'react';

// 1. داده‌های نمونه کاربران واجد شرایط
interface Participant {
    id: number;
    name: string;
    score: number;
    color: string; // برای تمایز بصری در چرخ
}

const PARTICIPANTS: Participant[] = [
    { id: 1, name: "علی ر.ا", score: 120, color: "#EF4444" }, // Red
    { id: 2, name: "سارا م.ی", score: 150, color: "#F97316" }, // Orange
    { id: 3, name: "محسن ح.س", score: 105, color: "#EAB308" }, // Yellow
    { id: 4, name: "زهرا ک.ن", score: 180, color: "#22C55E" }, // Green
    { id: 5, name: "رضا ا.م", score: 110, color: "#06B6D4" }, // Cyan
    { id: 6, name: "مریم ن.ف", score: 135, color: "#3B82F6" }, // Blue
    { id: 7, name: "امید ی.ع", score: 160, color: "#8B5CF6" }, // Violet
    { id: 8, name: "ندا س.ه", score: 100, color: "#EC4899" }, // Pink
];

// تعداد بخش‌ها در چرخ
const NUM_SEGMENTS = PARTICIPANTS.length;
// درجه هر بخش (360 تقسیم بر تعداد بخش‌ها)
const SEGMENT_DEGREE = 360 / NUM_SEGMENTS; 


const EventLottery = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<Participant | null>(null);
    const [finalRotation, setFinalRotation] = useState(0); // درجه چرخش نهایی چرخ

    // --- محاسبه مکان برنده و چرخش ---
    const spinWheel = useCallback(() => {
        if (isSpinning) return;

        setIsSpinning(true);
        setWinner(null);

        // 1. انتخاب تصادفی یک برنده
        const randomIndex = Math.floor(Math.random() * NUM_SEGMENTS);
        const selectedWinner = PARTICIPANTS[randomIndex];

        // 2. محاسبه درجه‌ای که فلش باید روی بخش برنده متوقف شود
        const winningSectorDegree = SEGMENT_DEGREE * randomIndex + SEGMENT_DEGREE / 2;

        // 3. ایجاد یک چرخش تصادفی بزرگ (برای حس چرخش واقعی)
        const randomSpins = Math.floor(Math.random() * 6) + 5; // 5 تا 10 دور
        const totalRotation = 360 * randomSpins + (360 - winningSectorDegree);
        
        // 4. اعمال چرخش
        setFinalRotation(totalRotation);

        // 5. اعلام برنده پس از اتمام انیمیشن (5 ثانیه)
        setTimeout(() => {
            setIsSpinning(false);
            setWinner(selectedWinner);
        }, 5000); // زمان انیمیشن (مطابقت با transition-duration)

    }, [isSpinning]);

    // محاسبه استایل چرخش
    const wheelStyle: React.CSSProperties = {
        transform: `rotate(${finalRotation}deg)`,
        transition: 'transform 4.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)', // انیمیشن کندشونده (Ease-Out)
    };

    // --- ساخت چرخ با بخش‌ها ---
    const wheelSegments = useMemo(() => {
        return PARTICIPANTS.map((p, index) => {
            const skewDeg = 90 - SEGMENT_DEGREE;
            const rotateDeg = index * SEGMENT_DEGREE;

            return (
                <div
                    key={p.id}
                    className="absolute inset-0 clip-path-polygon-half"
                    style={{
                        transform: `rotate(${rotateDeg}deg) skewY(${skewDeg}deg)`,
                        backgroundColor: p.color,
                        zIndex: 1,
                        // اطمینان از قرارگیری نام در بخش
                        clipPath: 'polygon(0 0, 50% 50%, 0 100%)', 
                    }}
                >
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold !text-lg !pointer-events-none"
                        style={{
                            // چرخاندن متن برای خوانایی و رفع اریب شدن
                            transform: `rotate(${90 + SEGMENT_DEGREE / 2}deg) skewY(-${skewDeg}deg) translateY(-80px)`,
                            width: '120px', 
                            textAlign: 'center',
                        }}
                    >
                        {p.name}
                    </div>
                </div>
            );
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8!">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-10!">قرعه‌کشی شانس کاربران واجد شرایط</h1>

            {/* ناحیه چرخ و نشانگر */}
            <div className="relative w-[500px] h-[500px] mb-12!">
                
                {/* 2. نشانگر (Pointer) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-r-15 border-b-30 !border-l-transparent !border-r-transparent !border-b-gray-800 !z-30 !transform !-translate-y-[15px]"/>

                {/* 3. چرخ گردان */}
                <div
                    className={`!w-full !h-full !rounded-full !shadow-[0_0_0_8px_rgba(255,255,255,0.8),_0_0_20px_rgba(0,0,0,0.3)] !border-4 !border-gray-300 !relative !overflow-hidden`}
                    style={wheelStyle}
                >
                    {/* بخش‌های چرخ */}
                    {wheelSegments}
                    
                    {/* نقطه مرکزی */}
                    <div className="!absolute !top-1/2 !left-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 !w-16 !h-16 !bg-white !rounded-full !border-4 !border-gray-800 !z-10 !flex !items-center !justify-center">
                        <span className="!text-xs !font-bold !text-gray-800">START</span>
                    </div>
                </div>
            </div>

            {/* 4. بخش کنترل و اعلام برنده */}
            <div className="!flex !flex-col !items-center">
                <button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className={`!px-8 !py-3 !text-xl !font-bold !rounded-full !shadow-lg !transition !duration-300 !transform 
                                ${isSpinning ? '!bg-gray-400 !cursor-not-allowed !scale-100' : '!bg-indigo-600 !hover:bg-indigo-700 !text-white !hover:scale-105'}`}
                >
                    {isSpinning ? 'در حال چرخش...' : 'شروع قرعه‌کشی'}
                </button>

                {/* نمایش نتیجه */}
                <div className="!mt-8 !p-6 !bg-white !rounded-2xl !shadow-xl !border-t-4 !border-indigo-500 !min-w-[300px] !text-center">
                    {winner ? (
                        <>
                            <p className="!text-xl !font-medium !text-gray-600 !mb-2">برنده خوش شانس:</p>
                            <h2 className="!text-4xl !font-extrabold !text-indigo-600 !animate-pulse">
                                🎉 {winner.name} 🎉
                            </h2>
                            <p className="!text-sm !text-gray-500 !mt-2">امتیاز: {winner.score}</p>
                        </>
                    ) : (
                        <p className="!text-lg !text-gray-500">
                            {isSpinning ? 'منتظر نتیجه باشید...' : 'برای شروع کلیک کنید.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default EventLottery;