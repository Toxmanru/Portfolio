'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProjectCardProps {
  imageUrl: string;
  category: string;
  title: string;
  projectId: string;
}

export default function ProjectCard({ imageUrl, category, title, projectId }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const isLeadership = projectId === 'leadership';

  const handleClick = () => {
    router.push(`/work/${projectId}`);
  };

  const calculateRotation = (e: React.MouseEvent<HTMLDivElement>, bounds: DOMRect) => {
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const rotateX = -(((e.clientY - centerY) / (bounds.height / 2)) * 4.75);
    const rotateY = ((e.clientX - centerX) / (bounds.width / 2)) * 4.75;
    
    return { rotateX, rotateY };
  };

  // Разделяем категорию на строки
  const categoryLines = category.split('\\n');

  return (
    <div 
      className="block w-full cursor-pointer" 
      onClick={handleClick}
    >
      <motion.div
        className="w-full relative rounded-[16px] md:rounded-[48px] overflow-hidden bg-[#EAEAEA] group"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={(e) => {
          setIsHovering(false);
          e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }}
        onMouseMove={(e) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          const { rotateX, rotateY } = calculateRotation(e, bounds);
          e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }}
      >
        {/* Контейнер с соотношением сторон 16:9 */}
        <div className="relative w-full pt-[56.25%]">
          {/* Изображение */}
          <div className="absolute inset-0 rounded-[16px] md:rounded-[48px] overflow-hidden">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 960px"
              quality={85}
              priority={false}
              loading="lazy"
            />
          </div>
          
          {/* Оверлей */}
          <div className="absolute inset-0 bg-black/0" />
          
          {/* Контент */}
          <div className={`absolute bottom-4 md:bottom-10 left-4 md:left-10 p-0 ${isLeadership ? 'text-white' : 'text-[#1C1C1C]'}`}>
            <div className="text-[12px] font-medium uppercase leading-[110%]">
              {categoryLines.map((line, index) => (
                <div key={index} className={index > 0 ? 'mt-0.5' : ''}>
                  {line}
                </div>
              ))}
            </div>
            <h2 className="text-[16px] md:text-[32px] font-medium uppercase mt-0.5">{title}</h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 