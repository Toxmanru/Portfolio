'use client';

import Image from 'next/image';

interface PicCardProps {
  imageUrl: string;
  variant?: 'full' | 'half';
  className?: string;
  isHero?: boolean;
}

export default function PicCard({ imageUrl, variant = 'full', className = '', isHero = false }: PicCardProps) {
  return (
    <div className={`w-full relative ${className}`}>
      <div className={`w-full relative rounded-[24px] md:rounded-[38px] overflow-hidden bg-[#EAEAEA] ${isHero ? 'pt-[62.5%]' : variant === 'full' ? 'aspect-[16/9]' : 'aspect-square'}`}>
        <div className={`${isHero ? 'absolute inset-0' : ''}`}>
          <Image
            src={imageUrl}
            alt="Project image"
            fill
            className="object-cover"
            sizes={variant === 'full' 
              ? "(max-width: 768px) 100vw, (max-width: 1920px) 90vw, 1720px"
              : "(max-width: 768px) 100vw, (max-width: 1920px) 45vw, 860px"
            }
            quality={85}
            loading="lazy"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
} 