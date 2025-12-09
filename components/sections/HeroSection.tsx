'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

// Динамический импорт для WebGL компонента (client-side only)
const HeroImageEffect = dynamic(
  () => import('@/components/3d/HeroImageEffect'),
  { ssr: false }
);

export default function HeroSection() {
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const accentWord1Ref = useRef<HTMLSpanElement>(null);
  const accentWord2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [triggerDemo, setTriggerDemo] = useState(false);

  // Fade out scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeDistance = 100; // Полностью исчезает после 100px
      const opacity = Math.max(0, 1 - scrollY / fadeDistance);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Trigger demo spotlight after all animations complete
          setTimeout(() => setTriggerDemo(true), 300);
        }
      });
      const words = wordsRef.current.filter(Boolean);

      // Картинка - плавный fade
      tl.from(imageContainerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      // Слова появляются
      .from(words, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
      }, '-=0.8')
      // Закрашивание оранжевых слов
      .to([accentWord1Ref.current, accentWord2Ref.current], {
        backgroundPosition: '0% 0%',
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.inOut',
      }, '-=0.3')
      // Подзаголовок
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5');
    });

    return () => ctx.revert();
  }, []);

  const accentWordStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #ED5C4E 0%, #ED5C4E 50%, #FFFFFF 50%, #FFFFFF 100%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '100% 0%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const setWordRef = (index: number) => (el: HTMLSpanElement | null) => {
    wordsRef.current[index] = el;
  };

  return (
    <section 
      className="relative hero-margin hero-section"
    >

      {/* Hero Picture with WebGL Liquid Effect */}
      <div 
        ref={imageContainerRef}
        className="overflow-hidden hero-image-mobile"
        style={{
          right: '64px',
          top: '0',
          borderRadius: '50%',
        }}
      >
        <Suspense fallback={<div className="w-full h-full bg-[#494949]" />}>
          <HeroImageEffect 
            className="w-full h-full"
            style={{ borderRadius: '50%' }}
            triggerDemo={triggerDemo}
          />
        </Suspense>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col relative z-10 hero-content-gap hero-content">
        <h1 className="hero-title text-white">
          <div className="overflow-hidden" style={{ paddingBottom: '10px', marginBottom: '-10px' }}>
            <span 
              ref={(el) => {
                wordsRef.current[0] = el;
                (accentWord1Ref as React.MutableRefObject<HTMLSpanElement | null>).current = el;
              }}
              className="inline-block"
              style={{ ...accentWordStyle, paddingBottom: '10px', marginBottom: '-10px' }}
            >
              Product
            </span>
            {' '}
            <span ref={setWordRef(1)} className="inline-block">Design</span>
          </div>
          <div className="overflow-hidden" style={{ paddingBottom: '10px', marginBottom: '-10px' }}>
            <span ref={setWordRef(2)} className="inline-block">Lead</span>
            {' '}
            <span ref={setWordRef(3)} className="inline-block">&</span>
            {' '}
            <span 
              ref={(el) => {
                wordsRef.current[4] = el;
                (accentWord2Ref as React.MutableRefObject<HTMLSpanElement | null>).current = el;
              }}
              className="inline-block"
              style={{ ...accentWordStyle, paddingBottom: '10px', marginBottom: '-10px' }}
            >
              Design
            </span>
          </div>
          <div className="overflow-hidden" style={{ paddingBottom: '10px', marginBottom: '-10px' }}>
            <span ref={setWordRef(5)} className="inline-block">Manager</span>
          </div>
        </h1>

        <p ref={subtitleRef} className="hero-subtitle text-white">
          8+ years of experience • Design ops • Team building • Cross-Platform • Insure-Tech • E-com • Med-Tech •
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="fixed left-1/2 -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-300"
        style={{ 
          bottom: '32px', 
          gap: '8px',
          opacity: scrollOpacity,
          pointerEvents: scrollOpacity === 0 ? 'none' : 'auto',
        }}
      >
        {/* Animated Arrow */}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          className="animate-bounce"
          style={{ animationDuration: '1.5s' }}
        >
          <path 
            d="M8 3L8 13M8 13L13 8M8 13L3 8" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Text */}
        <span 
          className="text-white"
          style={{ 
            fontWeight: 300, 
            fontSize: '16px',
            lineHeight: '1.25em',
          }}
        >
          Scroll down
        </span>
      </div>
    </section>
  );
}
