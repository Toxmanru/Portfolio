'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';

export default function AmiwaPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Включаем тёмный хедер при входе в основной контент (кроме hero)
  useEffect(() => {
    const section = contentRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('case-section-active');
          } else {
            document.body.classList.remove('case-section-active');
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('case-section-active');
    };
  }, []);

  const openFullscreen = (src: string) => {
    setFullscreenImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = '';
  };

  const horizontalPadding = isMobile ? 16 : 64;
  const verticalPadding = isMobile ? 32 : 120;

  return (
    <main 
      className="relative min-h-screen bg-[#020202]"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: isMobile ? '96px' : '168px',
          paddingBottom: isMobile ? '32px' : '120px',
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
        }}
      >
        {/* Full-width background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        
        {/* Background Glow */}
        <div 
          className="absolute pointer-events-none"
          style={{
            width: isMobile ? '100vw' : '872px',
            height: isMobile ? '100vw' : '872px',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: isMobile ? '-20vw' : '-436px',
            borderRadius: '50%',
            backgroundColor: 'rgba(237, 92, 78, 0.2)',
            filter: isMobile ? 'blur(50vw)' : 'blur(400px)',
            WebkitFilter: isMobile ? 'blur(50vw)' : 'blur(400px)',
            zIndex: 0,
          }}
        />
        
        <div className={`relative ${isMobile ? 'flex flex-col' : 'flex items-start'}`} style={{ gap: isMobile ? '32px' : '64px', zIndex: 1 }}>
          {/* Left content */}
          <div className="flex flex-col" style={{ gap: isMobile ? '24px' : '40px', width: isMobile ? '100%' : 'calc(40% - 32px)', flexShrink: 0 }}>
            <h1 
              style={{
                fontWeight: 500,
                fontSize: isMobile ? '32px' : '48px',
                lineHeight: '1.05em',
                letterSpacing: '-0.1em',
                color: '#FFFFFF',
              }}
            >
              Amiwa
            </h1>
            
            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              {/* Area */}
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Area
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Travel companion, AI-driven
                </span>
              </div>
              
              {/* Role */}
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Role
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Solo Founder, product designer
                </span>
              </div>
              
              {/* My focuses */}
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  My focuses
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Full-cycle production, product design, development
                </span>
              </div>

            <div className="flex flex-col" style={{ gap: '8px', marginTop: '48px', alignItems: 'flex-start' }}>
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <GlassButton href="https://www.amiwa.app/" variant="light" fullWidth={isMobile}>
                  Visit Amiwa
                </GlassButton>
                <span style={{ fontWeight: 300, fontSize: '12px', lineHeight: '1.4em', color: '#FFFFFF', opacity: 0.7 }}>
                  mobile only
                </span>
              </div>
            </div>
            </div>
          </div>
          
          {/* Right - Hero image */}
          <div 
            className="relative"
            style={{
              width: isMobile ? '100%' : 'calc(60% - 32px)',
              aspectRatio: '16 / 12',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              flexShrink: 0,
              cursor: 'pointer',
            }}
            onClick={() => openFullscreen('/images/works/amiwa/hero.png')}
          >
            <Image
              src="/images/works/amiwa/hero.png"
              alt="Amiwa app preview"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      
      {/* Content Section - Text + Images */}
      <section
        ref={contentRef}
        className="relative w-full"
        style={{
          padding: isMobile ? '32px 16px' : '64px',
        }}
      >
        {/* Full-width white background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        
        <div className="relative flex flex-col" style={{ gap: '32px' }}>
          {/* Text block - 60% width */}
          <p
            style={{
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: '1.6em',
              letterSpacing: '-0.02em',
              color: '#020202',
              width: isMobile ? '100%' : '60%',
            }}
          >
            Amiwa™ is a travel companion designed for the journey itself — not just the memories after. It keeps your plans, tickets, locations, notes, and links all in one clean, accessible space, so you can stay organized without losing the flow of your trip. Built solo with the help of AI, Amiwa™ is focused on simplicity, privacy, and the feeling of being fully present on the road.
          </p>
          
          {/* Images - full width, 16:7 aspect ratio */}
          <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '32px' }}>
            <div 
              className="relative w-full"
              style={{
                aspectRatio: '16 / 7',
                borderRadius: isMobile ? '24px' : '32px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => openFullscreen('/images/works/amiwa/content-1.png')}
            >
              <Image
                src="/images/works/amiwa/content-1.png"
                alt="Amiwa app screens showcase 1"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div 
              className="relative w-full"
              style={{
                aspectRatio: '16 / 7',
                borderRadius: isMobile ? '24px' : '32px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => openFullscreen('/images/works/amiwa/content-2.png')}
            >
              <Image
                src="/images/works/amiwa/content-2.png"
                alt="Amiwa app screens showcase 2"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Next Case Section */}
      <section
        className="relative w-full flex items-center justify-center"
        style={{
          paddingTop: isMobile ? '32px' : '64px',
          paddingBottom: isMobile ? '32px' : '64px',
        }}
      >
        {/* Full-width background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div style={{ width: isMobile ? '100%' : 'fit-content', paddingLeft: isMobile ? '16px' : 0, paddingRight: isMobile ? '16px' : 0 }}>
          <GlassButton href="/works/design-team" variant="light" className="relative" fullWidth={isMobile}>
            Check next case
          </GlassButton>
        </div>
      </section>
      
      {/* Footer */}
      <footer 
        className="relative w-full flex items-center justify-center"
        style={{ 
          height: isMobile ? '80px' : '104px',
          paddingLeft: isMobile ? '16px' : '64px',
          paddingRight: isMobile ? '16px' : '64px',
        }}
      >
        {/* Full-width background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        <p 
          className="relative text-white text-center"
          style={{ 
            fontWeight: isMobile ? 400 : 300, 
            fontSize: isMobile ? '12px' : '20px', 
            lineHeight: '1.4em',
          }}
        >
          Designed by me. Coded by Cursor
        </p>
      </footer>
      
      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={closeFullscreen}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              closeFullscreen();
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          {/* Image */}
          <div
            className="relative w-full h-full"
            style={{ padding: '60px 16px 16px 16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenImage}
              alt="Fullscreen view"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

