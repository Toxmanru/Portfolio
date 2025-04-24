'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, label, onClick, className = '', type = 'button' }: ButtonProps) {
  const content = children || label;
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      className={`px-[48px] py-[24px] rounded-[16px] bg-[#1C1C1C] text-white text-[16px] md:text-[20px] lg:text-[24px] font-medium uppercase tracking-[0.05em] ${className}`}
    >
      {content}
    </motion.button>
  );
} 