"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode; // تغییر به ReactNode برای پشتیبانی از آیکون در عنوان
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
          className="fixed! inset-0! w-full! z-[999]! flex! items-center! justify-center! p-4!"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop (پس‌زمینه محو کننده) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute! inset-0! bg-black/80! backdrop-blur-md!"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            dir="rtl"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative! z-10! w-full! max-w-3xl! rounded-[2.5rem]! bg-[#020617]! border! border-white/10 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] overflow-hidden!"
          >
            {/* Header */}
            <div className="flex! items-center! justify-between! px-8! py-5! border-b! border-white/5 bg-white/[0.02]!">
              {title && (
                <div className="text-lg! font-black! text-white!">
                  {title}
                </div>
              )}
              <button
                onClick={onClose}
                className="group! rounded-xl! p-2! bg-white/5! text-slate-400! hover:bg-red-500/10! hover:text-red-500! transition-all! duration-300!"
              >
                <X size={20} className="group-hover:rotate-90! transition-transform! duration-300!" />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-2! md:p-4! max-h-[85vh]! overflow-y-auto! custom-scrollbar!">
                <div className="bg-transparent!">
                    {children}
                </div>
            </div>

            {/* Decorative Glow (نور تزیینی گوشه مدال) */}
            <div className="absolute! -top-[10%]! -right-[10%]! w-40! h-40! bg-indigo-500/10! blur-[60px]! pointer-events-none!" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalComponents;