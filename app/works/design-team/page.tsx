'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/ui/Header';
import GlassButton from '@/components/ui/GlassButton';
import KeyResults from '@/components/sections/KeyResults';

export default function DesignTeamPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 960);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Активируем тёмный хедер для контентных секций (кроме hero)
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
              Scaling Design at&nbsp;QIC
            </h1>

            <div className="flex flex-col" style={{ gap: isMobile ? '16px' : '24px' }}>
              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Area
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Ecosystem, Insurance, Health, Travel, Car
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Role
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Product Design Lead, Design Manager
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: '4px' }}>
                <span style={{ fontWeight: 200, fontSize: '16px', lineHeight: '1.4em', color: 'rgba(255,255,255,0.6)' }}>
                  Expertise
                </span>
                <span style={{ fontWeight: 400, fontSize: '16px', lineHeight: '1.4em', color: '#FFFFFF' }}>
                  Team Scaling • Design Operations • Product Ecosystems • Design Systems • Cross-functional Leadership
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
              order: isMobile ? 1 : undefined,
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
          style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}
        >
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
              Scaling Design Through Three Stages of Growth
            </h2>
          </div>
          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p
              style={{
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              In 2022, I took over a two-person Mobile Design Team at QIC during a period of rapid growth.
              <br />
              Over the following years, I built the foundations of a scalable design organization: establishing design operations, enabling team growth, leading the shift to product-based teams, and driving consistency across multiple product streams.
            </p>
          </div>
        </div>
      </section>

      <KeyResults
        isMobile={isMobile}
        title="Key numbers"
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
        ref={contentRef}
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
          style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}
        >
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
              Stage 1 — Creating Predictability
            </h2>
          </div>

          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p
              style={{
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              <span style={{ fontWeight: 500 }}>Challenge</span>
              <br />
              Design delivery was inconsistent and heavily dependent on individuals. There were no established workflows, review processes, or clear collaboration with engineering.
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>What I Did</span>
              <br />
              Introduced an end-to-end design delivery process
              <br />
              Established design reviews and quality checkpoints
              <br />
              Standardized design-engineering collaboration
              <br />
              Reorganized Figma assets and documentation
              <br />
              Laid the foundation for a Design System
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>Outcome</span>
              <br />
              The new operating model significantly improved delivery predictability and reduced design bottlenecks.
              <br />
              <br />
              Design Time-to-Market was reduced from 4 weeks to 2 weeks while maintaining quality standards.
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
          onClick={() => openFullscreen('/images/works/design-team/stage-1-predictability.png')}
        >
          <Image
            src="/images/works/design-team/stage-1-predictability.png"
            alt="Stage 1 — Creating Predictability"
            width={1600}
            height={1000}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Section: Stage 2 */}
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
          style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}
        >
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
              Stage 2 — Building for Scale
            </h2>
          </div>

          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p
              style={{
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              <span style={{ fontWeight: 500 }}>Challenge</span>
              <br />
              As the team grew, we needed repeatable systems for hiring, onboarding, and performance management.
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>What I Did</span>
              <br />
              Built a hiring framework for Product Designers
              <br />
              Introduced grading and performance evaluation
              <br />
              Created onboarding and growth programs
              <br />
              Defined clear career development paths
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>Outcome</span>
              <br />
              Design evolved from a small team into a scalable organizational function with transparent growth and hiring processes.
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
          onClick={() => openFullscreen('/images/works/design-team/stage-2-building-for-scale.png')}
        >
          <Image
            src="/images/works/design-team/stage-2-building-for-scale.png"
            alt="Stage 2 — Building for Scale"
            width={1600}
            height={1000}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Section: Stage 3 */}
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
          style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}
        >
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
              Stage 3 —
              <br />
              From Platforms to Product Verticals
            </h2>
          </div>

          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p
              style={{
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              <span style={{ fontWeight: 500 }}>Challenge</span>
              <br />
              The company was transitioning toward an ecosystem model, while design teams were still organized around platforms.
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>What I Did</span>
              <br />
              Collaborated with fellow Leads to drive the transition from platform teams to cross-platform product units
              <br />
              Established onboarding process to help designers quickly ramp up on new platforms
              <br />
              Established collaboration across product verticals
              <br />
              Introduced practices focused on cross-product consistency
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>Outcome</span>
              <br />
              Design became better aligned with business goals, customer journeys, and ecosystem thinking.
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
          onClick={() => openFullscreen('/images/works/design-team/stage-3-platforms-to-verticals.png')}
        >
          <Image
            src="/images/works/design-team/stage-3-platforms-to-verticals.png"
            alt="Stage 3 — From Platforms to Product Verticals"
            width={1600}
            height={1000}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Section: Driving consistency */}
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
          style={{ gap: isMobile ? '24px' : '48px', alignItems: 'flex-start' }}
        >
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
              Driving Consistency and Future-Ready Design Practices
            </h2>
          </div>

          <div style={{ flex: isMobile ? undefined : '1 1 0', width: isMobile ? '100%' : undefined }}>
            <p
              style={{
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: '#020202',
              }}
            >
              As the organization expanded across multiple products and product streams, maintaining consistency became a strategic challenge.
              <br />
              <br />
              Alongside the transition to product verticals, I focused on creating shared principles, reusable patterns, and stronger alignment between teams. This work helped increase Design System adoption, improve cross-platform experiences, and strengthen ecosystem thinking across the organization.
              <br />
              <br />
              At the same time, I collaborated with other Design Leads to prepare teams for emerging ways of working. Together, we defined a shared approach to AI-assisted design, established workflows and best practices, and supported adoption across multiple teams.
              <br />
              <br />
              <span style={{ fontWeight: 500 }}>Outcome</span>
              <br />
              Increased consistency across products and platforms
              <br />
              Strengthened alignment between seven product streams
              <br />
              Improved Design System adoption and reuse
              <br />
              Established a scalable framework for AI-enabled design work
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
          <GlassButton href="/works/cross-product-experiences" variant="light" className="relative" fullWidth={isMobile}>
            See what we built
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
