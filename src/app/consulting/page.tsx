'use client';

import { motion } from 'framer-motion';
import NavCard from '@/components/NavCard';
import BackgroundSvg from '@/components/BackgroundSvg';

export default function ConsultingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <BackgroundSvg />
      <div className="relative min-h-screen pb-20 pt-[64px] md:pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 h-[calc(100vh-184px)]">
          {/* Navigation Card */}
          <div className="hidden md:block">
            <NavCard title="CONSULTING" />
          </div>
          <div className="md:mt-8 h-[calc(100%-104px)]">
            {/* Основная секция */}
            <div className="w-full rounded-[16px] md:rounded-[48px] flex flex-col justify-between p-7 md:p-10 text-[#1C1C1C] card left-card h-full text-center md:text-left" style={{ backgroundColor: 'rgba(221, 221, 221, 0.6)' }}>
              <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-medium leading-[100%]">
                MENTORSHIP &
                <span className="block mt-2 md:mt-4">PRODUCT AUDIT</span>
              </h1>
              <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[140%] uppercase">
                I OFFER PERSONAL MENTORSHIP AND CONSULTING FOR EARLY-STAGE PRODUCTS AND STARTUPS. I CAN HELP TEAMS SHAPE THEIR PRODUCT DESIGN STRATEGY, IMPROVE PROCESSES, AND INTERFACE QUALITY
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 