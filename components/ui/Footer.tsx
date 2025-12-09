'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <footer 
      className="w-full flex items-center justify-center"
      style={{ 
        height: isMobile ? '80px' : '104px', 
        backgroundColor: '#020202',
        paddingLeft: isMobile ? '16px' : '64px',
        paddingRight: isMobile ? '16px' : '64px',
      }}
    >
      <p 
        className="text-white text-center"
        style={{ 
          fontWeight: isMobile ? 400 : 300, 
          fontSize: isMobile ? '12px' : '20px', 
          lineHeight: '1.4em',
        }}
      >
        Designed by me. Builded by Cursor.
      </p>
    </footer>
  );
}

