'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем, является ли устройство мобильным
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем при монтировании
    checkMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkMobile);

    // Если не мобильное устройство, добавляем обработчик движения мыши
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        
        // Проверяем, находится ли курсор над кликабельным элементом
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('a, button, [role="button"], .card');
        setIsHovering(!!isInteractive);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Не рендерим курсор на мобильных устройствах
  if (isMobile) return null;

  return (
    <div 
      className={`custom-cursor ${isHovering ? 'hover' : ''}`} 
      style={{ 
        left: cursorPosition.x, 
        top: cursorPosition.y 
      }} 
    />
  );
} 