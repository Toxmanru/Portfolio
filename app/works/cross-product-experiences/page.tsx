'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';
import KeyResults from '@/components/sections/KeyResults';

type StageSection = {
  title: string;
  content: string;
  image: string;
};

const stageSections: StageSection[] = [
  {
    title: 'Motor Stream',
    content:
      'Motor insurance is one of the most important entry points into the ecosystem.\n\nThe challenge was not only to create a fast and intuitive insurance purchase experience, but also to extend the relationship beyond the transaction itself. Insurance is purchased infrequently, while vehicle ownership generates continuous needs throughout the year.\n\nMy work focused on designing experiences that connected insurance with surrounding automotive services, helping customers manage different aspects of vehicle ownership within the same ecosystem.\n\nAs a result, the product evolved from a simple insurance flow into a broader automotive services experience that encouraged ongoing engagement beyond policy purchase.',
    image: '/images/works/cross-product-experiences/motor-stream.png',
  },
  {
    title: 'Life & Health',
    content:
      'Unlike Motor Insurance, this initiative required creating an entirely new product area from the ground up.\n\nThe vision extended beyond insurance coverage itself. We designed a comprehensive health experience that combined insurance products with a growing collection of health-related services and tools.\n\nMy role included defining product experiences that helped users manage different aspects of their health journey in one place, creating a stronger connection between insurance and everyday health needs.\n\nThe result was a health-focused ecosystem that increased product relevance and created more frequent customer interactions compared to traditional insurance products.',
    image: '/images/works/cross-product-experiences/life-health.png',
  },
  {
    title: 'Loyalty Program',
    content:
      'As the ecosystem expanded, we designed a cross-product loyalty system built around a shared rewards currency.\n\nCustomers could earn and redeem rewards across multiple products, creating stronger connections between services and encouraging deeper ecosystem engagement.\n\nMy contribution was focused on creating reusable loyalty patterns that different product teams could adopt while maintaining a consistent customer experience.\n\nToday, the loyalty framework serves as a shared ecosystem layer used across multiple products and teams.',
    image: '/images/works/cross-product-experiences/loyalty-program.png',
  },
];

export default function CrossProductExperiencesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 960);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const section = contentRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('case-section-active');
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

  return (
    <main className="relative min-h-screen bg-[#020202]" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <Header />

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
              Cross-Product Experiences
            </h1>

            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>Area</span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Car Insurance, Life services, Health, Loyalty, Platform foundation
                </span>
              </div>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>Role</span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>Lead product designer, Team Leader</span>
              </div>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>Expertise</span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Cross-Product UX • Ecosystem Thinking •
                  <br />
                  Service Design • Customer Retention •
                  <br />
                  Product Strategy
                </span>
              </div>
            </div>

            {!isMobile && (
              <div className="flex flex-col" style={{ gap: '8px', marginTop: '48px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 'auto',
                  }}
                >
                  <GlassButton href="https://qic.online/en" openInNewTab variant="light">
                    Visit QIC
                  </GlassButton>
                </div>
              </div>
            )}
          </div>

          {isMobile && (
            <div style={{ width: '100%', order: 3 }}>
              <GlassButton href="https://qic.online/en" openInNewTab variant="light" fullWidth>
                Visit QIC
              </GlassButton>
            </div>
          )}

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
              order: isMobile ? 1 : undefined,
            }}
            onClick={() => openFullscreen('/images/works/cross-product-experiences/hero.png')}
          >
            <Image src="/images/works/cross-product-experiences/hero.png" alt="Cross-product experiences hero" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section className="relative w-full" style={{ padding: isMobile ? '32px 16px' : '64px' }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

        <div className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`} style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}>
          <div style={{ flex: isMobile ? undefined : '0 0 calc((100% - 48px) / 3)', width: isMobile ? '100%' : undefined }}>
            <h2
              style={{
                fontWeight: 500,
                fontSize: isMobile ? '28px' : '32px',
                lineHeight: '1.2em',
                letterSpacing: '-0.06em',
                color: '#020202',
              }}
            >
              Overview
            </h2>
          </div>
          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.6em', letterSpacing: '-0.02em', color: '#020202' }}>
              Over the years, QIC evolved from a traditional insurance provider into a connected ecosystem spanning insurance, health, travel, automotive services, real estate, and loyalty programs.
              <br />
              <br />
              The challenge was to create a unified experience across products, platforms, and customer journeys while accounting for the unique needs of different audiences and business domains. Each product needed to solve its own customer problem while contributing to a broader ecosystem experience that encouraged seamless movement between services.
              <br />
              <br />
              As Product Design Lead, I was responsible for shaping several key areas of this ecosystem, including Motor Insurance, Medical Insurance, Loyalty Program, and the unified QIC App experience.
            </p>
          </div>
        </div>
      </section>

      <KeyResults
        isMobile={isMobile}
        title="Key numbers"
        items={[
          { title: 'Product Streams', value: '7' },
          { title: 'New Ecosystem Services', value: '4+' },
          { title: 'User Engagement', value: '+14%' },
          { title: 'Revenue Growth', value: '+200% YoY' },
        ]}
        columnsDesktop={4}
        horizontalPadding={horizontalPadding}
        paddingTopDesktop={104}
        paddingBottomDesktop={104}
        paddingYMobile={48}
      />

      {stageSections.map((stage, index) => (
        <section
          key={stage.title}
          ref={index === 0 ? contentRef : undefined}
          className="relative w-full"
          style={{ padding: isMobile ? '32px 16px' : '64px' }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
          />

          <div className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`} style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}>
            <div style={{ flex: isMobile ? undefined : '0 0 calc((100% - 48px) / 3)', width: isMobile ? '100%' : undefined }}>
              <h2
                style={{
                  fontWeight: 500,
                  fontSize: isMobile ? '28px' : '32px',
                  lineHeight: '1.2em',
                  letterSpacing: '-0.06em',
                  color: '#020202',
                }}
              >
                {stage.title}
              </h2>
            </div>
            <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
              <p style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.6em', letterSpacing: '-0.02em', color: '#020202', whiteSpace: 'pre-line' }}>
                {stage.title === 'Motor Stream' ? (
                  <>
                    Motor insurance is one of the most important entry points into the ecosystem.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>The challenge</span>
                    {' '}was not only to create a fast and intuitive insurance purchase experience, but also to extend the relationship beyond the transaction itself. Insurance is purchased infrequently, while vehicle ownership generates continuous needs throughout the year.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>My work</span>
                    {' '}focused on designing experiences that connected insurance with surrounding automotive services, helping customers manage different aspects of vehicle ownership within the same ecosystem.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>As a result</span>
                    {', '}the product evolved from a simple insurance flow into a broader automotive services experience that encouraged ongoing engagement beyond policy purchase.
                  </>
                ) : stage.title === 'Life & Health' ? (
                  <>
                    Unlike Motor Insurance, this initiative required creating an entirely new product area from the ground up.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>The vision</span>
                    {' '}extended beyond insurance coverage itself. We designed a comprehensive health experience that combined insurance products with a growing collection of health-related services and tools.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>My role</span>
                    {' '}included defining product experiences that helped users manage different aspects of their health journey in one place, creating a stronger connection between insurance and everyday health needs.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>The result</span>
                    {' '}was a health-focused ecosystem that increased product relevance and created more frequent customer interactions compared to traditional insurance products.
                  </>
                ) : stage.title === 'Loyalty Program' ? (
                  <>
                    As the ecosystem expanded, we designed a cross-product loyalty system built around a shared rewards currency.
                    {'\n\n'}
                    Customers could earn and redeem rewards across multiple products, creating stronger connections between services and encouraging deeper ecosystem engagement.
                    {'\n\n'}
                    <span style={{ fontWeight: 500 }}>My contribution</span>
                    {' '}was focused on creating reusable loyalty patterns that different product teams could adopt while maintaining a consistent customer experience.
                    {'\n\n'}
                    Today, the loyalty framework serves as a shared <span style={{ fontWeight: 500 }}>ecosystem layer</span> used across multiple products and teams.
                  </>
                ) : (
                  stage.content
                )}
              </p>
            </div>
          </div>

          <div
            className="relative"
            style={{
              width: '100%',
              marginTop: isMobile ? '24px' : '32px',
              borderRadius: isMobile ? '24px' : '32px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => openFullscreen(stage.image)}
          >
            <Image src={stage.image} alt={stage.title} width={1600} height={1000} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </section>
      ))}

      <section className="relative w-full" style={{ padding: isMobile ? '32px 16px' : '64px' }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

        <div className={`relative ${isMobile ? 'flex flex-col' : 'flex'}`} style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}>
          <div style={{ flex: isMobile ? undefined : '0 0 calc((100% - 48px) / 3)', width: isMobile ? '100%' : undefined }}>
            <h2
              style={{
                fontWeight: 500,
                fontSize: isMobile ? '28px' : '32px',
                lineHeight: '1.2em',
                letterSpacing: '-0.06em',
                color: '#020202',
              }}
            >
              Bringing Everything Together
            </h2>
          </div>
          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.6em', letterSpacing: '-0.02em', color: '#020202' }}>
              While each product serves a different purpose, they all come together in <span style={{ fontWeight: 500 }}>QIC App</span> — the central hub of the ecosystem.
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>Designed as a unified experience</span>, QIC App connects insurance, health, loyalty, and lifestyle services into a single customer journey.
              <br />
              <br />
              In the next case study, I’ll take a closer look at how we designed and scaled this ecosystem product.
            </p>
          </div>
        </div>

        <div
          className="relative"
          style={{
            width: '100%',
            marginTop: isMobile ? '24px' : '32px',
            borderRadius: isMobile ? '24px' : '32px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => openFullscreen('/images/works/cross-product-experiences/bringing-everything-together.png')}
        >
          <Image
            src="/images/works/cross-product-experiences/bringing-everything-together.png"
            alt="Bringing Everything Together"
            width={1600}
            height={1000}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      <section
        className="relative w-full flex items-center justify-center"
        style={{ paddingTop: isMobile ? '32px' : '64px', paddingBottom: isMobile ? '32px' : '64px' }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#020202', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        <div style={{ width: isMobile ? '100%' : 'fit-content', paddingLeft: isMobile ? '16px' : 0, paddingRight: isMobile ? '16px' : 0 }}>
          <GlassButton href="/works/amiwa" variant="light" className="relative" fullWidth={isMobile}>
            Check next case
          </GlassButton>
        </div>
      </section>

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
            <Image src={fullscreenImage} alt="Fullscreen view" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </main>
  );
}
