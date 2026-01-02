import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// تعریف مقادیر مجاز برای Variant
type ButtonVariant = "default" | "silver" | "outline";

interface ButtonProps {
  Title: string;
  Icon?: React.ReactNode;
  Onclic: () => void;
  className?: string;
  variant?: ButtonVariant; // اضافه شدن فیلد variant به صورت اختیاری
}

const variants: Record<ButtonVariant, string> = {
  default: "bg-primary text-gold border-gold hover:bg-gold hover:text-primary",
  silver:
    "bg-primary text-darkGray border-darkGray hover:bg-gold hover:text-primary",
  outline: "bg-transparent text-gray-500 border-gray-500",
};

const ButtonComponents = ({
  Title,
  Icon,
  Onclic,
  className,
  variant = "default", // مقدار پیش‌فرض
}: ButtonProps) => {
  return (
    <motion.a
      onClick={Onclic}
      className={cn(
        "group relative px-12! py-4! flex items-center justify-center gap-3 border rounded-md transition-all duration-300 cursor-pointer",
        variants[variant], // انتخاب استایل بر اساس variant
        className // اجازه بازنویسی استایل از بیرون
      )}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && Icon}
      <span className="font-black text-xl uppercase tracking-tight">
        {Title}
      </span>
    </motion.a>
  );
};

export default ButtonComponents;
