'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundSvg from '@/components/BackgroundSvg';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateRotation = (e: React.MouseEvent<HTMLAnchorElement>, bounds: DOMRect) => {
    if (isMobile) return { rotateX: 0, rotateY: 0 };
    
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const rotateX = -(((e.clientY - centerY) / (bounds.height / 2)) * 4.75);
    const rotateY = ((e.clientX - centerX) / (bounds.width / 2)) * 4.75;
    
    return { rotateX, rotateY };
  };

  return (
    <main className="relative min-h-screen overflow-auto md:overflow-hidden bg-white">
      <BackgroundSvg />
      <div className={`custom-cursor ${isHovering ? 'hover' : ''}`} style={{ left: cursorPosition.x, top: cursorPosition.y }} />
      <div className="relative min-h-screen pb-20 md:pb-20 pt-[64px] md:pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 md:h-[calc(100vh-184px)]">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:h-full">
            {/* Левая секция */}
            <div className="w-full md:w-2/3 rounded-[14px] md:rounded-[48px] flex flex-col justify-between p-7 md:p-10 text-[#1C1C1C] card left-card md:h-auto text-center md:text-left" style={{ backgroundColor: 'rgba(221, 221, 221, 0.6)' }}>
              <h1 className="text-[28px] md:text-[64px] font-medium leading-[100%]">
                LEAD PRODUCT
                <span className="block mt-2 md:mt-4">DESIGNER &</span>
                <span className="block mt-2 md:mt-4">DESIGN MANAGER</span>
              </h1>
              <p className="text-[16px] md:text-[28px] font-normal leading-[140%] uppercase tracking-[0.05em] mt-[120px] md:mt-0">
                7+ YEARS OF EXPERIENCE • DESIGN OPS &<br />
                TEAM BUILDING • CROSS-PLATFORM •<br />
                INSURE-TECH • E-COM • MED-TECH •
              </p>
            </div>

            {/* Правая секция */}
            <div className="w-full md:w-1/3 flex flex-col gap-2 md:gap-4 perspective-1000 md:h-auto">
              <motion.div
                className="md:h-1/3"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.a
                  href="/work"
                  className="card work text-white relative block h-full rounded-[10px] md:rounded-[48px]"
                  onMouseMove={(e) => {
                    if (!isMobile) {
                      const bounds = e.currentTarget.getBoundingClientRect();
                      const { rotateX, rotateY } = calculateRotation(e, bounds);
                      e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    }
                  }}
                >
                  <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-8 h-8 md:w-[52px] md:h-[52px] hidden md:block">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 16H27M27 16L16 5M27 16L16 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 w-8 h-8 md:w-[52px] md:h-[52px] hidden md:block">
                    <motion.svg 
                      viewBox="0 0 52 52" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ rotate: 0, y: 0 }}
                      animate={{ 
                        rotate: 180,
                        y: [0, -12, 0]
                      }}
                      transition={{ 
                        delay: 2,
                        duration: 0.3,
                        ease: "easeOut",
                        times: [0, 0.5, 1]
                      }}
                    >
                      <path d="M26 0L52 26L26 52L0 26L26 0Z" fill="white"/>
                    </motion.svg>
        </div>
                  <h2 className="text-[24px] md:text-[32px] font-medium absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 md:top-10 md:left-10 text-center md:text-left w-full md:w-auto">MY WORKS</h2>
                </motion.a>
              </motion.div>

              <motion.div
                className="md:h-1/3"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.a
                  href="/consulting"
                  className="card consulting text-[#1C1C1C] relative block h-full rounded-[10px] md:rounded-[48px]"
                  onMouseMove={(e) => {
                    if (!isMobile) {
                      const bounds = e.currentTarget.getBoundingClientRect();
                      const { rotateX, rotateY } = calculateRotation(e, bounds);
                      e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    }
                  }}
                >
                  <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-8 h-8 md:w-[52px] md:h-[52px] hidden md:block">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 16H27M27 16L16 5M27 16L16 27" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 w-8 h-8 md:w-[52px] md:h-[52px] hidden md:block">
                    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="26" cy="26" r="26" fill="#1C1C1C"/>
                    </svg>
                  </div>
                  <h2 className="text-[24px] md:text-[32px] font-medium absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 md:top-10 md:left-10 text-center md:text-left w-full md:w-auto">CONSULTING</h2>
                </motion.a>
              </motion.div>

              <motion.div
                className="md:h-1/3"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.a
                  href="/contacts"
                  className="card contacts text-[#1C1C1C] relative block h-full rounded-[10px] md:rounded-[48px]"
                  onMouseMove={(e) => {
                    if (!isMobile) {
                      const bounds = e.currentTarget.getBoundingClientRect();
                      const { rotateX, rotateY } = calculateRotation(e, bounds);
                      e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    }
                  }}
                >
                  <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 w-8 h-8 md:w-[52px] md:h-[52px] hidden md:block">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 16H27M27 16L16 5M27 16L16 27" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-4 md:bottom-10 left-4 md:left-10 w-8 h-8 md:w-[52px] md:h-[52px] hidden md:block">
                    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 26C0 11.64 11.64 0 26 0H52V26C52 40.36 40.36 52 26 52H0V26Z" fill="#1C1C1C"/>
                    </svg>
                  </div>
                  <h2 className="text-[24px] md:text-[32px] font-medium absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 md:top-10 md:left-10 text-center md:text-left w-full md:w-auto">CONTACTS</h2>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Safe area с надписью */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-20 flex items-center justify-center">
          <p className="text-[12px] font-medium uppercase text-[#1C1C1C]">DESIGN & CODE BY ME</p>
        </div>
    </div>
    </main>
  );
}
