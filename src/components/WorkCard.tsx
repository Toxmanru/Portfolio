'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface WorkCardProps {
  title: string;
  label: string;
  href: string;
  rotation?: 'left' | 'right';
  index?: number;
}

export default function WorkCard({ title, label, href, index = 0 }: WorkCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Для hover эффекта
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div ref={ref} className="w-full" style={{ perspective: '800px' }}>
      <Link href={href} className="block w-full">
        <motion.div 
          className="w-full aspect-[530/300] rounded-[24px] border-4 border-white overflow-hidden relative"
          initial={{ 
            opacity: 0, 
            y: 30,
          }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
          } : {}}
          transition={{ 
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              y: isHovered ? -10 : 0,
              rotateX: isHovered ? 2.5 : 0,
              rotateY: isHovered ? -3 : 0,
              boxShadow: isHovered 
                ? '0px 10px 20px rgba(0, 0, 0, 0.16)' 
                : '0px 2px 4px rgba(0, 0, 0, 0.15)',
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {/* Основной фон карточки */}
            <div className="absolute inset-0 bg-[#DDDDDD]" />
            
            {/* Лёгкий градиент для объёма */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.03) 100%)',
              }}
            />
            
            {/* Peel эффект - загибающийся уголок */}
            <motion.div
              className="absolute bottom-0 right-0 w-[80px] h-[80px] pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ borderRadius: '0 0 20px 0' }}
            >
              {/* Тень под загнутым уголком - мягкий градиент */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 30%, transparent 70%)',
                }}
              />
              
              {/* Загнутый уголок */}
              <motion.div
                className="absolute bottom-0 right-0 w-[55px] h-[55px]"
                initial={{ rotateX: 0, rotateY: 0 }}
                animate={{ 
                  rotateX: isHovered ? -22 : 0, 
                  rotateY: isHovered ? 22 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: 'linear-gradient(135deg, #EDEDED 0%, #E0E0E0 50%, #D5D5D5 100%)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  transformOrigin: 'bottom right',
                }}
              >
                {/* Блик на загнутом уголке */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Контент */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
              <p className="text-[12px] font-normal text-[#1C1C1C] mb-1">
                {label}
              </p>
              <h3 className="text-[24px] font-semibold text-[#1C1C1C]">
                {title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
}
