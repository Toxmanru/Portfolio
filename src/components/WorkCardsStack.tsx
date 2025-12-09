'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

interface CardData {
  title: string;
  label: string;
  href: string;
  rotation: 'left' | 'right';
  column: 'left' | 'right';
}

const cards: CardData[] = [
  { title: 'AMIWA', label: 'Travel Companion', href: '/work/amiwa', rotation: 'left', column: 'left' },
  { title: 'QIC APP', label: 'Ecosystem Hub', href: '/work/qic-app', rotation: 'right', column: 'right' },
  { title: 'BALANCY', label: 'AI-based Nutrition Tracker', href: '/work/balancy', rotation: 'left', column: 'left' },
  { title: 'SBERHEALTH', label: 'Med-Tech B2C Service', href: '/work/sberhealth', rotation: 'right', column: 'right' },
];

export default function WorkCardsStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
  
  const { scrollY } = useScroll();
  
  // Триггер анимации при начале скролла
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10 && !isAnimationTriggered) {
      setIsAnimationTriggered(true);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ perspective: '1200px' }}>
      <div className="flex justify-center w-full">
        <div className="flex gap-14 2xl:gap-[72px]">
          {/* Левая колонка */}
          <div className="flex flex-col gap-12 xl:gap-14">
            {cards.filter(c => c.column === 'left').map((card) => (
              <StackCard 
                key={card.title}
                card={card}
                index={cards.indexOf(card)}
                isAnimationTriggered={isAnimationTriggered}
                totalCards={cards.length}
              />
            ))}
          </div>
          {/* Правая колонка - смещена вниз */}
          <div className="flex flex-col gap-12 xl:gap-14 mt-32">
            {cards.filter(c => c.column === 'right').map((card) => (
              <StackCard 
                key={card.title}
                card={card}
                index={cards.indexOf(card)}
                isAnimationTriggered={isAnimationTriggered}
                totalCards={cards.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StackCardProps {
  card: CardData;
  index: number;
  isAnimationTriggered: boolean;
  totalCards: number;
}

function StackCard({ card, index, isAnimationTriggered, totalCards }: StackCardProps) {
  const baseRotation = card.rotation === 'left' ? -6 : 6;
  const randomOffset = useMemo(() => (Math.random() - 0.5) * 4, []);
  const finalRotation = baseRotation + randomOffset;
  
  // Для hover эффекта
  const [isHovered, setIsHovered] = useState(false);
  
  // Размеры карточек
  const [cardHeight, setCardHeight] = useState(238);
  const [gap, setGap] = useState(48);
  const [rightColumnOffset, setRightColumnOffset] = useState(128);
  
  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      if (width >= 1400) {
        setCardHeight(328);
        setGap(56);
        setRightColumnOffset(128);
      } else if (width >= 1280) {
        setCardHeight(300);
        setGap(56);
        setRightColumnOffset(128);
      } else {
        setCardHeight(238);
        setGap(48);
        setRightColumnOffset(128);
      }
    };
    
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);
  
  // Начальные смещения для стопки
  const initialX = card.column === 'left' ? 300 : -300;
  const cardStep = cardHeight + gap;
  const cardFinalYOffset = card.column === 'left' 
    ? (cards.filter(c => c.column === 'left').indexOf(card)) * cardStep 
    : rightColumnOffset + (cards.filter(c => c.column === 'right').indexOf(card)) * cardStep;
  const targetY = -20;
  const initialY = targetY - cardFinalYOffset;
  const initialRotation = (index - (totalCards - 1) / 2) * 8;
  
  // Задержка для каждой карточки
  const staggerDelay = index * 0.12;

  return (
    <motion.div
      initial={{
        x: initialX,
        y: initialY,
        rotate: initialRotation,
        scale: 0.85,
      }}
      animate={isAnimationTriggered ? {
        x: 0,
        y: 0,
        rotate: finalRotation,
        scale: 1,
      } : {}}
      transition={{
        duration: 0.7,
        delay: staggerDelay,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
      }}
      style={{
        zIndex: isHovered ? 100 : totalCards - index,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={card.href} className="block" style={{ perspective: '800px' }}>
        <motion.div 
          className="relative w-[420px] h-[238px] xl:w-[530px] xl:h-[300px] 2xl:w-[580px] 2xl:h-[328px] rounded-[24px] xl:rounded-[32px] border-4 border-white overflow-hidden"
          animate={{
            y: isHovered ? -12 : 0,
            rotateX: isHovered ? 3 : 0,
            rotateY: isHovered ? -4 : 0,
            boxShadow: isHovered 
              ? '0px 12px 24px rgba(0, 0, 0, 0.18)' 
              : '0px 2px 4px rgba(0, 0, 0, 0.15)',
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
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
            className="absolute bottom-0 right-0 w-[100px] h-[100px] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ borderRadius: '0 0 28px 0' }}
          >
            {/* Тень под загнутым уголком - мягкий градиент */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 30%, transparent 70%)',
              }}
            />
            
            {/* Загнутый уголок */}
            <motion.div
              className="absolute bottom-0 right-0 w-[70px] h-[70px]"
              initial={{ rotateX: 0, rotateY: 0 }}
              animate={{ 
                rotateX: isHovered ? -25 : 0, 
                rotateY: isHovered ? 25 : 0 
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
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
          <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-10 flex flex-col justify-end">
            <p className="text-[14px] font-normal text-[#1C1C1C] mb-1">
              {card.label}
            </p>
            <h3 className="text-[32px] font-semibold text-[#1C1C1C]">
              {card.title}
            </h3>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
