'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PublicTalksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    // Пользователям с reduced motion ничего не прячем
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(gsap.utils.toArray('[data-talk-video-wrap] > div', section), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const words = heading.querySelectorAll('[data-talks-word]');
      const rule = heading.querySelector('[data-talks-rule]');

      gsap.set(words, { yPercent: 100 });
      gsap.set(rule, { scaleY: 0 });

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: isMobile ? 'top 85%' : 'top 80%',
          end: isMobile ? 'top 45%' : 'top 35%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      headingTl
        .to(words, { yPercent: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0)
        .to(rule, { scaleY: 1, duration: 0.6, ease: 'expo.inOut' }, 0.3);

      // Видео: каждое появляется по прогрессу собственного положения на экране.
      // Триггер — неанимируемая обёртка, чтобы transform не сдвигал точки старта/конца.
      const wraps = gsap.utils.toArray<HTMLElement>('[data-talk-video-wrap]', section);
      wraps.forEach((wrap, i) => {
        const inner = wrap.firstElementChild as HTMLElement | null;
        if (!inner) return;
        // На десктопе видео стоят рядом — второе чуть запаздывает, на мобильном — идут друг за другом
        const lag = !isMobile && i > 0 ? 6 : 0;
        gsap.fromTo(
          inner,
          { opacity: 0, y: 56, scale: 0.96, transformOrigin: '50% 100%' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wrap,
              start: `top ${isMobile ? 82 : 72 - lag}%`,
              end: `top ${isMobile ? 46 : 34 - lag}%`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full ${isMobile ? '' : 'public-talks-padding'}`}
      style={{ 
        paddingLeft: isMobile ? '16px' : '64px', 
        paddingRight: isMobile ? '16px' : '64px',
        paddingTop: isMobile ? '48px' : undefined,
        paddingBottom: isMobile ? '48px' : undefined,
        backgroundColor: '#020202',
        zIndex: 20,
      }}
    >
      <div className="flex flex-col" style={{ gap: isMobile ? '32px' : '56px' }}>
        <div ref={headingRef} className="talks-heading">
          <span className="talks-rule" data-talks-rule aria-hidden />
          <h2 className="talks-headline">
            <span className="talks-word-mask">
              <span className="talks-word" data-talks-word>Public</span>
            </span>{' '}
            <span className="talks-word-mask">
              <span className="talks-word" data-talks-word>Talks</span>
            </span>
          </h2>
        </div>

        <div className={`${isMobile ? 'flex flex-col' : 'flex'} w-full`} style={{ gap: '16px' }}>
          <div data-talk-video-wrap className="flex-1">
            <div style={{ opacity: 0 }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  src="https://www.youtube.com/embed/dqeFii50Gg8"
                  title="YouTube video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>

          <div data-talk-video-wrap className="flex-1">
            <div style={{ opacity: 0 }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  src="https://www.youtube.com/embed/Y-Eu5dlszDU"
                  title="YouTube video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
