'use client';

import { useEffect, useRef } from 'react';

export default function ScrollIndicator() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.classList.add('is-scrolling');
      
      // Убираем класс через 1 секунду после остановки скролла
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
}

