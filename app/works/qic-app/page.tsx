'use client';

import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';
import KeyResults from '@/components/sections/KeyResults';

const B = ({ children }: { children: ReactNode }) => <span style={{ fontWeight: 500 }}>{children}</span>;

type CaseSection = {
  id: string;
  title: ReactNode;
  body: ReactNode[];
  image?: { src: string; alt: string; width: number; height: number };
};

const sections: CaseSection[] = [
  {
    id: 'challenge',
    title: 'When Business Outgrew the Product',
    body: [
      <>QIC App was originally built around insurance policies and vehicle management. Its home screen and navigation reflected that focus.</>,
      <>With Insurance, Health, Travel, Car Market, and other new products becoming major business verticals, the existing architecture could no longer accommodate the company’s ambitions without compromising usability.</>,
      <>
        <B>The challenge</B> was to introduce an entirely new product structure while keeping familiar insurance journeys accessible and making future expansion possible without repeated redesigns.
      </>,
    ],
    image: { src: '/images/works/qic-app/challenge.webp', alt: 'Old version of QIC App', width: 2304, height: 1080 },
  },
  {
    id: 'vision',
    title: 'The Vision — Rethinking the Core Experience',
    body: [
      <>
        Anticipating the ecosystem expansion, <B>I initiated the redesign</B> in November 2025 and personally developed a new UX concept.
      </>,
      <>
        <B>The central idea</B> was a vertical-based architecture: independent product experiences connected through a unified home screen and navigation.
      </>,
      <>
        <span>The concept introduced three <B>key principles</B>:</span>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '8px' }}>
          <li>Equal visibility: Dedicated entry points for major business verticals.</li>
          <li>Contextual relevance: Urgent actions surfaced when customers need them.</li>
          <li>Continuous discovery: Frequently used services and highlights from different verticals available directly on the home screen.</li>
        </ul>
      </>,
      <>Together, these principles created a flexible structure designed to evolve alongside the business.</>,
    ],
    image: { src: '/images/works/qic-app/vision.webp', alt: 'Ecosystem concept', width: 2304, height: 1038 },
  },
  {
    id: 'validation',
    title: 'Validation — Testing the Vision',
    body: [
      <>
        In December 2025, <B>I organized</B> and conducted <B>qualitative research</B> with two audiences: existing QIC App customers and potential new users.
      </>,
      <>
        <B>We tested</B> two critical journeys: whether existing customers could still find their insurance products effortlessly, and whether newcomers could discover and purchase products within the expanded ecosystem.
      </>,
      <>
        <B>We also validated</B> urgent actions and promotional highlights.
        <br />
        The concept demonstrated strong task completion across the key scenarios, requiring only minor adjustments to content and visual emphasis.
      </>,
    ],
    image: { src: '/images/works/qic-app/validation.webp', alt: 'Concept validation', width: 2304, height: 1038 },
  },
  {
    id: 'execution',
    title: (
      <>
        Execution —
        <br />
        From Vision
        <br />
        to Production
      </>
    ),
    body: [
      <>
        In January 2026, <B>I presented the concept</B> and research findings to product and strategy leadership, securing approval for the redesign.
      </>,
      <>
        The strongest <B>arguments were validated</B> usability and an architecture capable of accommodating future business verticals without repeated structural changes.
        <br />
        We translated the vision into a phased delivery backlog, with the first production release launching in February 2026.
      </>,
      <>I delegated detailed production design to a designer on my team, supporting the transition through discovery sessions, design reviews, and strategic alignment with Product Management.</>,
      <>Over next iterations, the complete concept reached production, with refinements to visual design, edge cases, and content priorities.</>,
    ],
    image: { src: '/images/works/qic-app/execution.webp', alt: 'Final production version of QIC App', width: 2304, height: 1112 },
  },
  {
    id: 'impact',
    title: 'Impact — Making the Ecosystem Discoverable',
    body: [
      <>The new architecture established a unified entry point for insurance and lifestyle services while preserving access to existing customer journeys.</>,
      <>
        Within the first three months after launch, each of the three measured verticals — Insurance, Car Market, and Travel — <B>reached at least 30% penetration</B> among newly registered users, measured by discovery and completion of at least one meaningful action within the vertical.
        <br />
        Performance of existing urgent actions also remained stable after their integration into the new notification experience.
      </>,
      <>The redesign established a scalable UX foundation for QIC App’s continued ecosystem expansion.</>,
    ],
  },
];

export default function QicAppPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 960);
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
  const canOpenFullscreen = true;

  const headingStyle = {
    fontWeight: 500,
    fontSize: isMobile ? '28px' : '32px',
    lineHeight: '1.2em',
    letterSpacing: '-0.06em',
    color: '#020202',
  } as const;

  const bodyStyle = {
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '1.6em',
    letterSpacing: '-0.02em',
    color: '#020202',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.6em',
  } as const;

  return (
    <main className="relative min-h-screen bg-[#020202]" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <Header />

      {/* Hero */}
      <section
        className="relative w-full"
        style={{
          clipPath: 'inset(0)',
          paddingTop: isMobile ? '96px' : '168px',
          paddingBottom: isMobile ? '32px' : '120px',
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
        />

        <div
          className="absolute pointer-events-none"
          style={{
            width: isMobile ? '140vw' : '1200px',
            height: isMobile ? '140vw' : '1200px',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: isMobile ? '-40vw' : '-600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(237, 92, 78, 0.20) 0%, rgba(237, 92, 78, 0.10) 40%, rgba(237, 92, 78, 0) 70%)',
            zIndex: 0,
          }}
        />

        <div className={`relative ${isMobile ? 'flex flex-col' : 'flex items-start'}`} style={{ gap: isMobile ? '32px' : '64px', zIndex: 1 }}>
          <div className="flex flex-col" style={{ gap: isMobile ? '24px' : '40px', width: isMobile ? '75%' : 'calc(40% - 32px)', flexShrink: 0, order: isMobile ? 2 : undefined }}>
            <h1
              style={{
                fontWeight: 500,
                fontSize: isMobile ? '32px' : '48px',
                lineHeight: '1.05em',
                letterSpacing: '-0.1em',
                color: '#FFFFFF',
              }}
            >
              QIC App transformation
            </h1>

            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>Area</span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>Ecosystem, Client Experience</span>
              </div>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>Role</span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>Lead product Designer, Product Design Manager</span>
              </div>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>My focuses</span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Product Vision, UX Strategy, Information Architecture, UX Research, Design Leadership
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
              clipPath: `inset(0 round ${isMobile ? '24px' : '32px'})`,
              flexShrink: 0,
              backgroundColor: '#D9D9FF',
              cursor: canOpenFullscreen ? 'pointer' : 'default',
              order: isMobile ? 1 : undefined,
            }}
            onClick={canOpenFullscreen ? () => openFullscreen('/images/works/qic-app/hero.webp') : undefined}
          >
            <Image src="/images/works/qic-app/hero.webp" alt="QIC App hero" fill priority sizes="(max-width: 1440px) 100vw, 1440px" draggable={false} style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative w-full" style={{ padding: isMobile ? '32px 16px' : '64px' }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
        />

        <div className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`} style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}>
          <div style={{ flex: isMobile ? undefined : '0 0 calc((100% - 48px) / 3)', width: isMobile ? '100%' : undefined }}>
            <h2 style={headingStyle}>Overview</h2>
          </div>
          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <div style={bodyStyle}>
              <p>I initiated and led the transformation of QIC App from an insurance-focused application into a scalable, multi-vertical ecosystem.</p>
              <p>From the initial UX vision and user validation to stakeholder buy-in and production rollout, I directed the initiative to prepare the app for a new generation of connected products and services.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyResults
        isMobile={isMobile}
        title="Key numbers"
        items={[
          { title: 'Idea to First Release', value: '3 months' },
          { title: 'In-Depth UX Tests', value: '21 sessions' },
          { title: 'Vertical Penetration', value: '≥30%' },
          { title: 'Payments & Renewals', value: 'No decline' },
        ]}
        columnsDesktop={4}
        horizontalPadding={horizontalPadding}
        paddingTopDesktop={104}
        paddingBottomDesktop={104}
        paddingYMobile={48}
      />

      {/* Story sections */}
      {sections.map((section) => (
        <section key={section.id} className="relative w-full" style={{ padding: isMobile ? '32px 16px' : '64px' }}>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: '#FFFFFF', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
          />

          <div className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`} style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}>
            <div style={{ flex: isMobile ? undefined : '0 0 calc((100% - 48px) / 3)', width: isMobile ? '100%' : undefined }}>
              <h2 style={headingStyle}>{section.title}</h2>
            </div>
            <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
              <div style={bodyStyle}>
                {section.body.map((paragraph, index) => (
                  <div key={index}>{paragraph}</div>
                ))}
              </div>
            </div>
          </div>

          {section.image && (
            <div
              className="relative"
              style={{
                width: '100%',
                marginTop: isMobile ? '24px' : '32px',
                borderRadius: isMobile ? '24px' : '32px',
                clipPath: `inset(0 round ${isMobile ? '24px' : '32px'})`,
                cursor: canOpenFullscreen ? 'pointer' : 'default',
              }}
              onClick={canOpenFullscreen ? () => openFullscreen(section.image!.src) : undefined}
            >
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={section.image.width}
                height={section.image.height}
                sizes="(max-width: 1440px) 100vw, 1312px"
                draggable={false}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
        </section>
      ))}

      {/* Next Case */}
      <section
        className="relative w-full flex items-center justify-center"
        style={{ paddingTop: isMobile ? '32px' : '64px', paddingBottom: isMobile ? '32px' : '64px' }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
        />
        <div style={{ width: isMobile ? '100%' : 'fit-content', paddingLeft: isMobile ? '16px' : 0, paddingRight: isMobile ? '16px' : 0 }}>
          <GlassButton href="/works/amiwa" variant="light" className="relative" fullWidth={isMobile}>
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

      {fullscreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }} onClick={closeFullscreen}>
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

          <div className="relative w-full h-full" style={{ padding: '60px 16px 16px 16px' }} onClick={(e) => e.stopPropagation()}>
            <Image src={fullscreenImage} alt="Fullscreen view" fill sizes="100vw" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </main>
  );
}
