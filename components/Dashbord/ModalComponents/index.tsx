"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const ModalComponents: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed! inset-0! w-full! z-999! flex! items-center! justify-center! p-4! md:p-6!"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop (پس‌زمینه محو کننده روشن) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute! inset-0! bg-white/40! backdrop-blur-md!"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            dir="rtl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative! z-10! w-full! max-w-7xl! rounded-[3rem]! bg-white! border! border-gray-100! shadow-[0_30px_100px_-20px_rgba(212,175,55,0.2)] overflow-hidden!"
          >
            {/* Top Golden Bar (خط طلایی ظریف بالای مدال) */}
            <div className="absolute! top-0! left-0! right-0! h-1.5! bg-gradient-to-r! from-transparent! via-[#D4AF37]! to-transparent!" />

            {/* Header */}
            <div className="flex! items-center! justify-between! px-10! py-4! border-b! border-gray-50! bg-[#FDFBF7]/50!">
              {title && (
                <div className="text-xl! font-black! text-[#1A1A1A]! flex! items-center! gap-3!">
                  <div className="w-10! h-10! rounded-xl! bg-[#D4AF37]/10! flex! items-center! justify-center!">
                    <div className="w-2! h-2! bg-[#D4AF37]! rounded-full!" />
                  </div>
                  {title}
                </div>
              )}
              <button
                onClick={onClose}
                className="group! rounded-2xl! p-3! bg-gray-50! text-gray-400! hover:bg-red-50! hover:text-red-500! transition-all! duration-300! border! border-gray-100!"
              >
                <X
                  size={20}
                  className="group-hover:rotate-90! transition-transform! duration-300!"
                />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-4! md:p-4! max-h-full! overflow-y-auto! custom-scrollbar!">
              <div className="bg-transparent! text-[#2D2D2D]!">{children}</div>
            </div>

            {/* Footer / Decorative Element */}
            <div className="px-10! py-6! bg-gray-50/50! border-t! border-gray-50! flex! justify-end! gap-3!">
              <div className="text-[10px]! text-[#D4AF37]! font-bold! uppercase! tracking-tighter!">
                © Golden Interface System
              </div>
            </div>

            {/* Decorative Glows (نورهای طلایی ملایم در پس‌زمینه محتوا) */}
            <div className="absolute! -bottom-20! -right-20! w-64! h-64! bg-[#D4AF37]/5! blur-[80px]! pointer-events-none!" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalComponents;
