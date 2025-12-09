'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';
import KeyResults from '@/components/sections/KeyResults';

export default function DesignTeamPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 960);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
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
      style={{ maxWidth: '1440px', margin: '0 auto' }}
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
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

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
              Architecture of a Design Team
            </h1>

            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Area
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Insurance, Health, Travel
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Role
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Team Lead, Design Manager
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  My focuses
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Design Ops, Delivery Processes, Product Consistency, Team Scaling, Design System
                </span>
              </div>
            </div>
          </div>

          {/* Right - Hero placeholder with link */}
          <div
            className="relative"
            style={{
              width: isMobile ? '100%' : 'calc(60% - 32px)',
              aspectRatio: '16 / 12',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: '#A4A0FF',
              cursor: 'pointer',
            }}
            onClick={() => openFullscreen('/images/works/design-team/hero.png')}
          >
            <Image
              src="/images/works/design-team/hero.png"
              alt="Design workflow"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Section: Building the design foundation */}
      <section
        className="relative w-full"
        style={{
          padding: isMobile ? '32px 16px' : '64px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

        <div
          className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`}
          style={{ gap: isMobile ? '24px' : '64px', alignItems: isMobile ? 'flex-start' : 'center' }}
        >
          <div className="flex flex-col" style={{ gap: isMobile ? '12px' : '16px', width: isMobile ? '100%' : '50%' }}>
            <h2
              style={{
                fontWeight: 500,
                fontSize: isMobile ? '28px' : '40px',
                lineHeight: '1.2em',
                letterSpacing: '-0.06em',
                color: '#020202',
              }}
            >
              Building the design foundation
            </h2>
            <p
              style={{
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              I joined QIC team at the earliest stage and built the Mobile design team from the ground up. I set up core design processes, established smooth collaboration between designers, developers, and analysts, and created a workflow that balanced speed and quality. My focus was on building a sustainable design culture that could scale as the product grew.
            </p>
          </div>

          <div
            className="relative"
            style={{
              width: isMobile ? '100%' : '50%',
              aspectRatio: '16 / 11',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              backgroundColor: '#A4A0FF',
              cursor: 'pointer',
            }}
            onClick={() => openFullscreen('/images/works/design-team/foundation.png')}
          >
            <Image
              src="/images/works/design-team/foundation.png"
              alt="Specifications and limitations"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <KeyResults
        isMobile={isMobile}
        items={[
          { title: 'Design TTM', value: '4 weeks → 2 weeks' },
          { title: 'Delivery predictability', value: '56% → 82%' },
          { title: 'Design bugs in prod', value: '↓ 90%+' },
          { title: 'Design System adoption', value: '50% → 98%' },
        ]}
        columnsDesktop={4}
        horizontalPadding={horizontalPadding}
        paddingTopDesktop={104}
        paddingBottomDesktop={104}
        paddingYMobile={48}
      />

      {/* Section: Scaling leadership */}
      <section
        className="relative w-full"
        style={{
          padding: isMobile ? '32px 16px' : '64px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

        <div
          className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`}
          style={{ gap: isMobile ? '24px' : '64px', alignItems: isMobile ? 'flex-start' : 'center' }}
        >
          <div
            className="relative"
            style={{
              width: isMobile ? '100%' : '50%',
              aspectRatio: '16 / 11',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              backgroundColor: '#A4A0FF',
              cursor: 'pointer',
            }}
            onClick={() => openFullscreen('/images/works/design-team/collage.png')}
          >
            <Image
              src="/images/works/design-team/collage.png"
              alt="Product screens collage"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="flex flex-col" style={{ gap: isMobile ? '12px' : '16px', width: isMobile ? '100%' : '50%' }}>
            <h2
              style={{
                fontWeight: 500,
                  fontSize: isMobile ? '28px' : '40px',
                lineHeight: '1.2em',
                letterSpacing: '-0.06em',
                color: '#020202',
              }}
            >
              Scaling leadership
            </h2>
            <p
              style={{
                fontWeight: 300,
                  fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              As the product evolved, I transitioned to leading a cross-platform team within the same business stream — shifting from a single-platform focus to a unified design approach across all surfaces we owned.
              <br />
              This shift helped us drive consistency, improve UX across platforms, and establish a shared design language and system tailored to the needs of our stream, while staying aligned with the other streams.
            </p>
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
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div style={{ width: isMobile ? '100%' : 'fit-content', paddingLeft: isMobile ? '16px' : 0, paddingRight: isMobile ? '16px' : 0 }}>
          <GlassButton href="/works/sberhealth" variant="light" className="relative" fullWidth={isMobile}>
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

      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={closeFullscreen}
        >
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
