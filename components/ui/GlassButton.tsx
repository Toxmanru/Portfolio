'use client';

import { ReactNode, useState, useEffect } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  openInNewTab?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function GlassButton({
  children,
  onClick,
  href,
  openInNewTab = false,
  variant = 'light',
  className = '',
  fullWidth = false,
  disabled = false,
}: GlassButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchInput, setIsTouchInput] = useState(false);

  useEffect(() => {
    const updateInputType = () => {
      const hasCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
      setIsTouchInput(hasCoarsePointer);
    };
    updateInputType();
    window.addEventListener('resize', updateInputType);
    return () => window.removeEventListener('resize', updateInputType);
  }, []);

  // На touch-устройствах кнопки всегда активны (как hover)
  const isActive = disabled ? false : (isTouchInput || isHovered);

  // Единый padding для всех вариантов
  const padding = '16px 32px';

  const bgColor = disabled
    ? (variant === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(2, 2, 2, 0.08)')
    : (variant === 'light' ? 'rgba(255, 255, 255, 0.24)' : 'rgba(2, 2, 2, 0.16)');

  const content = (
    <>
      {/* Лёгкий оранжевый glow слева */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '0%',
          bottom: '-40%',
          left: '-10%',
          width: '50%',
          background: 'radial-gradient(circle at 30% 50%, rgba(237, 92, 78, 0.3), rgba(237, 92, 78, 0))',
          filter: 'blur(18px)',
          WebkitFilter: 'blur(18px)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: disabled ? 0 : 1,
        }}
      />
      {/* Оранжевая заливка слева направо */}
      <span 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ED5C4E',
          borderRadius: '48px',
          transform: isActive ? 'translateX(0%)' : 'translateX(-102%)',
          transition: isTouchInput ? 'none' : 'transform 0.4s ease-out',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Текст поверх всего */}
      <span 
        style={{ 
          position: 'relative', 
          zIndex: 2,
          color: variant === 'light' ? '#FFFFFF' : (isActive ? '#FFFFFF' : '#020202'),
          transition: isTouchInput ? 'none' : 'color 0.4s ease-out',
          pointerEvents: 'none',
        }}
      >
        {children}
      </span>
    </>
  );

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    padding: padding,
    backgroundColor: bgColor,
    borderRadius: '48px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    fontWeight: 300,
    fontSize: '16px',
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    zIndex: 1,
    pointerEvents: disabled ? 'none' : 'auto',
    opacity: disabled ? 0.6 : 1,
  };

  const handleMouseEnter = () => {
    console.log('Mouse entered, isHovered:', true);
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    console.log('Mouse left, isHovered:', false);
    setIsHovered(false);
  };

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={className}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
