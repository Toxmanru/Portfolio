'use client';

import Image from 'next/image';

interface PicCardProps {
  imageUrl: string;
  variant?: 'full' | 'half';
  className?: string;
}

export default function PicCard({ imageUrl, variant = 'full', className = '' }: PicCardProps) {
  return (
    <div className={`w-full ${className} ${variant === 'full' ? 'aspect-[16/9]' : 'aspect-square'} rounded-[24px] md:rounded-[48px] overflow-hidden bg-[#EAEAEA] h-full`}>
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
  );
} 