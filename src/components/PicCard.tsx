'use client';

import Image from 'next/image';

interface PicCardProps {
  imageUrl: string;
  variant?: 'full' | 'half';
  className?: string;
}

export default function PicCard({ imageUrl, variant = 'full', className = '' }: PicCardProps) {
  return (
    <div className={`${width} ${className} ${isWide ? 'rounded-[24px] md:rounded-[48px]' : ''} h-full`}>
      {isWide ? (
        <div className="relative w-full pt-[56.25%] rounded-[24px] md:rounded-[48px] overflow-hidden">
          <div className="absolute inset-0 rounded-[24px] md:rounded-[48px]">
            <div className="w-full h-full bg-[#1C1C1C] rounded-[24px] md:rounded-[48px] flex flex-col justify-end p-6 md:p-12 text-[20px]">
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
      ) : (
        <div className={`w-full relative rounded-[24px] md:rounded-[48px] overflow-hidden bg-[#EAEAEA] ${variant === 'full' ? 'aspect-[16/9]' : 'aspect-square'} ${className}`}>
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
      )}
    </div>
  );
} 