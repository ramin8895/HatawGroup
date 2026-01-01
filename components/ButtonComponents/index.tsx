import React from "react";
import { motion, Variants } from "framer-motion";

interface ButtonProps {
  Title: string;
  Icon: React.ReactNode;
  Onclic: () => void;
}

const ButtonComponents = ({ Title, Icon, Onclic }: ButtonProps) => {
  return (
    <motion.a
      className="group relative px-12! py-6! bg-color-primary text-color-gold rounded-2xl! overflow-hidden flex items-center gap-3! transition-all duration-300 shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon}
      <span className="text-[#121212] font-black text-xl! uppercase tracking-tight">
        {Title}
      </span>
    </motion.a>
  );
};

export default ButtonComponents;
