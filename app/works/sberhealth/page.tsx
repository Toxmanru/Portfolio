'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';
import KeyResults from '@/components/sections/KeyResults';

export default function SberHealthPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 960);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const openFullscreen = (src: string) => {
    if (isMobile) {
      setFullscreenImage(src);
      document.body.style.overflow = 'hidden';
    }
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

      {/* Hero */}
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
              SberHealth
            </h1>

            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Area
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Health, B2C
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Role
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Product Designer
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  My focuses
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Sales flows, Revenue growth, Mobile UX, Design System
                </span>
              </div>
            </div>
          </div>

          <div
            className="relative"
            style={{
              width: isMobile ? '100%' : 'calc(60% - 32px)',
              aspectRatio: '16 / 12',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: '#A4A0FF',
            }}
          >
            <Image
              src="/images/works/sberhealth/hero.png"
              alt="SberHealth hero"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Redefining catalog */}
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
              Redefining the digital medical catalog
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
              As the B2C product designer, I completely redesigned the digital medical services catalog — a key sales channel for the company. The previous structure made navigation difficult and obscured product value. I rebuilt the catalog around clarity, hierarchy, and guided decision-making, simplifying the user journey and helping customers quickly understand what they need.
              <br />
              This new structure connected products more logically, surfaced complementary services at the right moments, and created a smoother, more confident buying experience.
            </p>
          </div>

          <div
            className="relative"
            style={{
              width: isMobile ? '100%' : '50%',
              aspectRatio: '16 / 11',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              backgroundColor: '#EDE9FB',
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={() => openFullscreen('/images/works/sberhealth/old-new.png')}
          >
            <Image
              src="/images/works/sberhealth/old-new.png"
              alt="Old vs new catalog view"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* New version screens */}
      <section
        className="relative w-full"
        style={{
          paddingTop: '0px',
          paddingLeft: isMobile ? '16px' : '64px',
          paddingRight: isMobile ? '16px' : '64px',
          paddingBottom: isMobile ? '32px' : '64px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

        <div className="relative flex flex-col">
          <div
            className="relative w-full"
            style={{
              marginTop: isMobile ? '16px' : '0px',
              aspectRatio: '16 / 7',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              backgroundColor: '#E6DBFF',
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={() => openFullscreen('/images/works/sberhealth/new-version.png')}
          >
            <Image
              src="/images/works/sberhealth/new-version.png"
              alt="New catalog version screens"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <KeyResults
        isMobile={isMobile}
        items={[
          { title: 'UX tests conducted', value: '40+' },
          { title: 'Conversion to purchase', value: '↑12%' },
          { title: 'Bounce rate', value: '↓ 11.3%' },
        ]}
        columnsDesktop={3}
        horizontalPadding={horizontalPadding}
        paddingTopDesktop={104}
        paddingBottomDesktop={104}
        paddingYMobile={48}
      />

      {/* Research impact */}
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
              backgroundColor: '#EDE9FB',
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={() => openFullscreen('/images/works/sberhealth/research.png')}
          >
            <Image
              src="/images/works/sberhealth/research.png"
              alt="Research-driven improvements"
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
              Measurable impact through research
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
              The redesign was backed by extensive research: I conducted 40+ interviews and usability tests, identifying critical UX issues early and preventing them from reaching development.
              <br />
              By restructuring the catalog, improving product clarity, and simplifying the decision-making flow, we achieved a measurable improvement in user behavior: conversion to purchase increased by 12%, while bounce rate decreased by 11.3%.
              <br />
              These changes made the catalog more intuitive for users and more effective as a revenue-driving touchpoint.
            </p>
          </div>
        </div>
      </section>

      {/* Next Case */}
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
