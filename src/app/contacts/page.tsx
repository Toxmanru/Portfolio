'use client';

import { motion } from 'framer-motion';
import NavCard from '@/components/NavCard';
import BackgroundSvg from '@/components/BackgroundSvg';
import Image from 'next/image';

export default function ContactsPage() {
  return (
    <main className="relative min-h-screen overflow-auto md:overflow-hidden bg-white">
      <BackgroundSvg />
      <div className="relative min-h-screen pb-20 pt-[64px] md:pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 h-[calc(100vh-184px)]">
          {/* Navigation Card */}
          <div className="hidden md:block">
            <NavCard title="CONTACTS" />
          </div>
          
          <div className="md:mt-8 h-[calc(100%-104px)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 h-full">
              {/* Основная секция */}
              <div className="md:col-span-2 rounded-[16px] md:rounded-[48px] flex flex-col justify-between p-8 md:p-10 text-[#1C1C1C] card left-card h-[calc(50vh-32px)] md:h-auto text-center md:text-left" style={{ backgroundColor: 'rgba(221, 221, 221, 0.6)' }}>
                <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-medium leading-[100%]">
                  LET'S STAY
                  <span className="block mt-2 md:mt-4">CONNECTED</span>
                </h1>
                <div className="space-y-4 md:space-y-8">
                  {/* Email сегмент */}
                  <div>
                    <p className="text-[10px] md:text-[12px] font-medium uppercase tracking-[0.05em]">E-MAIL</p>
                    <p className="mt-1 md:mt-2 text-[16px] md:text-[20px] lg:text-[24px] font-medium uppercase leading-[100%]">TOXMANRU@ICLOUD.COM</p>
                  </div>
                  
                  {/* Telegram сегмент */}
                  <div>
                    <p className="text-[10px] md:text-[12px] font-medium uppercase tracking-[0.05em]">TELEGRAM</p>
                    <p className="mt-1 md:mt-2 text-[16px] md:text-[20px] lg:text-[24px] font-medium uppercase leading-[100%]">@TOXMAN</p>
                  </div>
                  
                  {/* LinkedIn сегмент */}
                  <div>
                    <p className="text-[10px] md:text-[12px] font-medium uppercase tracking-[0.05em]">LINKEDIN</p>
                    <p className="mt-1 md:mt-2 text-[16px] md:text-[20px] lg:text-[24px] font-medium uppercase leading-[100%]">IN/ANTON-GUBAREV-PENTIN</p>
                  </div>
                </div>
              </div>

              {/* Правая карточка с изображением */}
              <div className="md:col-span-1 flex flex-col gap-2 md:gap-4 perspective-1000 h-[calc(50vh-32px)] md:h-auto mb-8 md:mb-0">
                <div className="relative rounded-[16px] md:rounded-[48px] overflow-hidden h-full">
                  <Image
                    src="/images/contacts.jpg"
                    alt="Contacts"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 