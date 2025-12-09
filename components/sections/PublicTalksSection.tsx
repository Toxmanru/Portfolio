'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PublicTalksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const video1Ref = useRef<HTMLDivElement>(null);
  const video2Ref = useRef<HTMLDivElement>(null);
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
    const ctx = gsap.context(() => {
      // Начальное состояние
      gsap.set([publicWordRef.current, talksWordRef.current], {
        opacity: 0,
        y: 80,
      });
      gsap.set([video1Ref.current, video2Ref.current], {
        opacity: 0,
        x: -30,
      });

      // Timeline привязанный к скроллу
      // На мобильных start ниже (top 80%), чтобы анимация начиналась раньше
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 50%' : 'top 280px',
          end: isMobile ? '+=250' : '+=400',
          scrub: 1,
          once: true,
        },
      });

      // Слова появляются снизу вверх
      tl.to(publicWordRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(talksWordRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      // Закрашивание слова "Talks" оранжевым
      .to(talksWordRef.current, {
        backgroundPosition: '0% 0%',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.4')
      // Первое видео появляется (слева направо)
      .to(video1Ref.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.4')
      // Второе видео появляется с небольшой задержкой
      .to(video2Ref.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.2');
    }, sectionRef);

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
        <h2 className="text-white text-center work-headline">
        
          <span ref={publicWordRef} className="inline-block">Public</span>
          {' '}
          <span ref={talksWordRef} className="inline-block" style={{ ...accentWordStyle, paddingRight: '0.1em' }}>
            Talks
          </span>
        </h2>

        <div className={`${isMobile ? 'flex flex-col' : 'flex'} w-full`} style={{ gap: '16px' }}>
          <div 
            ref={video1Ref}
            className="flex-1"
          >
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

          <div 
            ref={video2Ref}
            className="flex-1"
          >
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
    </section>
  );
}
