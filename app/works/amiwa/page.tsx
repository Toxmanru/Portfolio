'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';

export default function AmiwaPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    document.body.classList.add('case-page');
    return () => {
      document.body.classList.remove('case-page');
      document.body.style.overflow = '';
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
  const canOpenFullscreen = true;

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
        className="relative w-full"
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
          style={{ backgroundColor: '#020202', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
        />
        
        <div className={`relative ${isMobile ? 'flex flex-col' : 'flex items-start'}`} style={{ gap: isMobile ? '32px' : '64px', zIndex: 1 }}>
          {/* Left content */}
          <div className="flex flex-col" style={{ gap: isMobile ? '24px' : '40px', width: isMobile ? '75%' : 'calc(40% - 32px)', flexShrink: 0, order: isMobile ? 2 : undefined }}>
            <h1 
              style={{
                fontWeight: 900,
                fontSize: isMobile ? '32px' : '48px',
                lineHeight: '1.13em',
                letterSpacing: '-0.08em',
                textTransform: 'uppercase',
                color: '#C0FE06',
                width: isMobile ? 'calc(100% / 0.75)' : undefined,
              }}
            >
              Amiwa
            </h1>
            
            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              {/* Area */}
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 300, fontSize: '12px', lineHeight: '1.4em', color: '#FFFFFF', textTransform: 'uppercase' }}>
                  Area
                </span>
                <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Travel companion, AI-driven
                </span>
              </div>
              
              {/* Role */}
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 300, fontSize: '12px', lineHeight: '1.4em', color: '#FFFFFF', textTransform: 'uppercase' }}>
                  Role
                </span>
                <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Solo Founder, product designer
                </span>
              </div>
              
              {/* My focuses */}
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 300, fontSize: '12px', lineHeight: '1.4em', color: '#FFFFFF', textTransform: 'uppercase' }}>
                  My focuses
                </span>
                <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Full-cycle production, product design, development
                </span>
              </div>

            {!isMobile && (
              <div className="flex flex-col" style={{ gap: '8px', marginTop: '48px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    width: 'auto',
                  }}
                >
                  <GlassButton href="https://www.amiwa.app/" openInNewTab variant="light">
                    Visit Amiwa
                  </GlassButton>
                  <span style={{ fontWeight: 300, fontSize: '12px', lineHeight: '1.4em', color: '#FFFFFF', opacity: 0.7 }}>
                    mobile only
                  </span>
                </div>
              </div>
            )}
            </div>
          </div>

          {isMobile && (
            <div style={{ width: '100%', order: 3 }}>
              <GlassButton href="https://www.amiwa.app/" openInNewTab variant="light" fullWidth>
                Visit Amiwa
              </GlassButton>
            </div>
          )}
          
          {/* Right - Hero image */}
          <div 
            className="relative"
            style={{
              width: isMobile ? '100%' : 'calc(60% - 32px)',
              aspectRatio: '16 / 12',
              borderRadius: '8px',
              clipPath: 'inset(0 round 8px)',
              flexShrink: 0,
              cursor: canOpenFullscreen ? 'pointer' : 'default',
              order: isMobile ? 1 : undefined,
            }}
            onClick={canOpenFullscreen ? () => openFullscreen('/images/works/amiwa/hero.png') : undefined}
          >
            <Image
              quality={90}
              src="/images/works/amiwa/hero.png"
              alt="Amiwa app preview"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              draggable={false}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      
      {/* Content Section - Text + Images */}
      <section
        className="relative w-full"
        style={{
          padding: isMobile ? '32px 16px' : '64px',
        }}
      >
        {/* Full-width white background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
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
                borderRadius: '8px',
                clipPath: 'inset(0 round 8px)',
                cursor: canOpenFullscreen ? 'pointer' : 'default',
              }}
              onClick={canOpenFullscreen ? () => openFullscreen('/images/works/amiwa/content-1.png') : undefined}
            >
              <Image
                quality={90}
                src="/images/works/amiwa/content-1.png"
                alt="Amiwa app screens showcase 1"
                fill
                sizes="(max-width: 1440px) 100vw, 1312px"
                draggable={false}
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div 
              className="relative w-full"
              style={{
                aspectRatio: '16 / 7',
                borderRadius: '8px',
                clipPath: 'inset(0 round 8px)',
                cursor: canOpenFullscreen ? 'pointer' : 'default',
              }}
              onClick={canOpenFullscreen ? () => openFullscreen('/images/works/amiwa/content-2.png') : undefined}
            >
              <Image
                quality={90}
                src="/images/works/amiwa/content-2.png"
                alt="Amiwa app screens showcase 2"
                fill
                sizes="(max-width: 1440px) 100vw, 1312px"
                draggable={false}
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
          style={{ backgroundColor: '#020202', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
        />
        <div style={{ width: isMobile ? '100%' : 'fit-content', paddingLeft: isMobile ? '16px' : 0, paddingRight: isMobile ? '16px' : 0 }}>
          <GlassButton href="/" variant="light" className="relative" fullWidth={isMobile}>
            Back to main
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
          style={{ backgroundColor: '#020202', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
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
              quality={90}
              src={fullscreenImage}
              alt="Fullscreen view"
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

