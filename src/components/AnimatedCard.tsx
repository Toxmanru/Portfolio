'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface AnimatedCardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({ href, children, className = '' }: AnimatedCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={false}
      animate={isPressed ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        width: '100vw',
        height: '100vh',
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }
      } : {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(24, 48, 47, 0.7)',
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => {
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }}
    >
      {children}
    </motion.div>
  );
} 