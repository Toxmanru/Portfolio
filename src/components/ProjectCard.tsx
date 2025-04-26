'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProjectCardProps {
  imageUrl: string;
  category: string;
  title: string;
  projectId: string;
}

export default function ProjectCard({ imageUrl, category, title, projectId }: ProjectCardProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем, является ли устройство мобильным при монтировании компонента
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      router.push('/work/mobile');
    } else {
      router.push(`/work/${projectId}`);
    }
  };

  const calculateRotation = (e: React.MouseEvent<HTMLDivElement>, bounds: DOMRect) => {
    if (isMobile) return { rotateX: 0, rotateY: 0 };
    
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const rotateX = -(((e.clientY - centerY) / (bounds.height / 2)) * 4.75);
    const rotateY = ((e.clientX - centerX) / (bounds.width / 2)) * 4.75;
    
    return { rotateX, rotateY };
  };

  // Разделяем категорию на строки
  const categoryLines = category.split('\n');

  return (
    <div 
      className="block w-full cursor-pointer" 
      onClick={handleClick}
    >
      <motion.div
        className="w-full relative rounded-[16px] md:rounded-[48px] overflow-hidden bg-[#EAEAEA] group"
        style={{ transformStyle: 'preserve-3d' }}
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
        {/* Контейнер с соотношением сторон 16:9 */}
        <div className="relative w-full pt-[56.25%]">
          {/* Изображение */}
          <div className="absolute inset-0 rounded-[16px] md:rounded-[48px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          
          {/* Оверлей */}
          <div className="absolute inset-0 bg-black/0" />
          
          {/* Контент */}
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 p-0 text-[#1C1C1C]">
            <div className={`text-[8px] md:text-[12px] font-medium uppercase leading-[110%] ${projectId === 'leadership' ? 'text-white' : ''}`}>
              {categoryLines.map((line, index) => (
                <div key={index} className={index > 0 ? 'mt-0.5' : ''}>
                  {line}
                </div>
              ))}
            </div>
            <h2 className={`text-[24px] md:text-[32px] font-medium uppercase mt-0.5 ${projectId === 'leadership' ? 'text-white' : ''}`}>{title}</h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 