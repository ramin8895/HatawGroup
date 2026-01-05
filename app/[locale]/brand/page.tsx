"use client";
import Assessment from "@/components/Assessment";
import Evaluating from "@/components/Evaluating";
import AboutComponents from "@/components/HomePage/About";
import HomeSection from "@/components/HomePage/Home";
import React from "react";
const BrandPage = ({ locale, translations }: any) => {
  const isRtl = locale === "fa" || locale === "ku";

  return (
    <main
      className="bg-[#121212]! text-[#E0E0E0]! overflow-x-hidden! selection:bg-[#D4AF37]/30 mt-10! selection:text-[#D4AF37]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <HomeSection />
      <AboutComponents />
      <Evaluating />

      <Assessment />
      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </main>
  );
};

export default BrandPage;
