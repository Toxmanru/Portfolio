'use client';

import { ReactNode } from 'react';

interface TextCardProps {
  title?: string;
  text?: string;
  variant?: 'full' | 'half' | 'wide';
  className?: string;
  children?: ReactNode;
}

export default function TextCard({ 
  title, 
  text, 
  variant = 'full',
  className = '',
  children
}: TextCardProps) {
  const isWide = variant === 'wide';
  const width = variant === 'half' ? 'w-full md:w-1/2' : 'w-full';
  
  return (
    <div className={`${width} ${className} ${isWide ? 'rounded-[24px] md:rounded-[48px]' : ''} h-full`}>
      {isWide ? (
        <div className="relative w-full pt-[62.5%] rounded-[24px] md:rounded-[48px] overflow-hidden">
          <div className="absolute inset-0 rounded-[24px] md:rounded-[48px]">
            <div className="w-full h-full bg-[#1C1C1C] rounded-[24px] md:rounded-[48px] flex flex-col justify-end p-6 md:p-12 text-[20px]">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[rgba(221,221,221,0.6)] rounded-[24px] md:rounded-[48px] p-6 md:p-12 h-full text-[20px]">
          {children || (
            <>
              {title && (
                <h2 className="text-[24px] md:text-[32px] font-medium leading-[100%] mb-4 md:mb-6">
                  {title}
                </h2>
              )}
              {text && (
                <p className="text-[20px] font-normal leading-[140%]">
                  {text}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
} 