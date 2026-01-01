"use client";

import { motion } from "framer-motion";

type Props = {
  icon: any;
  inputClass: string;
  iconClass: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  icon: Icon,
  inputClass,
  iconClass,
  ...props
}: Props) {
  return (
    <motion.div className="relative! group!">
      <Icon className={iconClass} size={20} />
      <input className={inputClass} {...props} />
    </motion.div>
  );
}
