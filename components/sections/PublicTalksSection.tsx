'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PublicTalksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const publicWordRef = useRef<HTMLSpanElement>(null);
  const talksWordRef = useRef<HTMLSpanElement>(null);
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
    const words = [publicWordRef.current, talksWordRef.current];
    if (!section || !heading || words.some((w) => !w)) return;

    // Пользователям с reduced motion ничего не прячем
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(words, { opacity: 1, backgroundPosition: '0% 0%' });
      gsap.set(gsap.utils.toArray('[data-talk-video-wrap] > div', section), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Заголовок: слова поднимаются и проявляются из размытия, затем "Talks" закрашивается.
      // Всё идёт по прогрессу скролла (scrub), без привязки к фиксированному числу пикселей.
      const headingTl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: heading,
          start: isMobile ? 'top 72%' : 'top 70%',
          end: isMobile ? 'top 28%' : 'top 22%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      headingTl
        .fromTo(
          words[0],
          { opacity: 0, y: 48, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          0,
        )
        .fromTo(
          words[1],
          { opacity: 0, y: 48, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          0.3,
        )
        // Закрашивание слова "Talks" оранжевым
        .to(words[1], { backgroundPosition: '0% 0%', duration: 1, ease: 'power2.inOut' }, 0.9);

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

  const accentWordStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #ED5C4E 0%, #ED5C4E 50%, #FFFFFF 50%, #FFFFFF 100%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '100% 0%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full ${isMobile ? '' : 'public-talks-padding'}`}
      style={{ 
        paddingLeft: isMobile ? '16px' : '64px', 
        paddingRight: isMobile ? '16px' : '64px',
        paddingTop: isMobile ? '32px' : undefined,
        paddingBottom: isMobile ? '32px' : undefined,
        backgroundColor: '#020202',
        zIndex: 20,
      }}
    >
      <div className="flex flex-col items-center gap-8 xl:gap-16">
        <h2 ref={headingRef} className="text-white text-center work-headline">
          <span ref={publicWordRef} className="inline-block" style={{ opacity: 0 }}>Public</span>
          {' '}
          <span ref={talksWordRef} className="inline-block" style={{ ...accentWordStyle, paddingRight: '0.1em', opacity: 0 }}>
            Talks
          </span>
        </h2>

        <div className={`${isMobile ? 'flex flex-col' : 'flex'} w-full`} style={{ gap: '16px' }}>
          <div data-talk-video-wrap className="flex-1">
            <div style={{ opacity: 0 }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '24px', overflow: 'hidden' }}>
                <iframe
                  src="https://www.youtube.com/embed/dqeFii50Gg8"
                  title="YouTube video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '24px' }}
                />
              </div>
            </div>
          </div>

          <div data-talk-video-wrap className="flex-1">
            <div style={{ opacity: 0 }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '24px', overflow: 'hidden' }}>
                <iframe
                  src="https://www.youtube.com/embed/Y-Eu5dlszDU"
                  title="YouTube video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '24px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
