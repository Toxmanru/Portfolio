'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Проверяем, находится ли курсор над кликабельным элементом
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], .card');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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