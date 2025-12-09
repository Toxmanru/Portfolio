'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TaglineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tagline1WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tagline2WordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tagline2ContainerRef = useRef<HTMLDivElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [trail, setTrail] = useState<{x: number, y: number}[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const trailLength = 8;

  const subtitleText = "What design means to me —";
  const tagline1Text = "Crafting simple experiences, keeping all complexity";
  const tagline2Text = "behind the scenes";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const subtitleWords = subtitleWordsRef.current.filter(Boolean);
      const tagline1Words = tagline1WordsRef.current.filter(Boolean);
      const tagline2Words = tagline2WordsRef.current.filter(Boolean);

      // Устанавливаем начальное состояние
      gsap.set([...subtitleWords, ...tagline1Words, ...tagline2Words], {
        opacity: 0,
        y: 30,
      });

      // Timeline для анимации появления текста
      // На мобильном анимация начинается на 20% выше (60% вместо 80%)
      const isMobile = window.innerWidth < 960;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 60%' : 'top 80%',
          end: 'center 50%',
          scrub: 1,
        },
      });

      // Pin секцию когда она достигнет центра экрана
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'center center',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
      });

      // Сначала появляется subtitle по словам
      tl.to(subtitleWords, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
      })
      // Пауза перед tagline
      .to({}, { duration: 0.4 })
      // Затем первая строка tagline
      .to(tagline1Words, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
      })
      // Затем вторая строка tagline
      .to(tagline2Words, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.1')
      // Пауза после tagline
      .to({}, { duration: 0.5 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tagline2ContainerRef.current) return;
    const rect = tagline2ContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePos({ x, y });
    setTrail(prev => {
      const newTrail = [{ x, y }, ...prev].slice(0, trailLength);
      return newTrail;
    });
  };

  const renderWords = (
    text: string, 
    refsArray: React.MutableRefObject<(HTMLSpanElement | null)[]>,
    style?: React.CSSProperties
  ) => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        ref={(el) => { refsArray.current[index] = el; }}
        className="inline-block"
        style={style}
      >
        {word}{index < text.split(' ').length - 1 ? '\u00A0' : ''}
      </span>
    ));
  };

  const tagline2BaseStyle: React.CSSProperties = {
    color: '#020202',
    WebkitTextStroke: '2px #ED5C4E',
    paintOrder: 'stroke fill',
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full tagline-section" 
      style={{ paddingTop: '208px', zIndex: 0 }}
    >
      {/* Background Glow */}
      <div 
        className="absolute pointer-events-none tagline-glow"
        style={{
          borderRadius: '50%',
          backgroundColor: 'rgba(237, 92, 78, 0.2)',
          zIndex: 0,
        }}
      />
      
      <div className="flex flex-col items-center relative z-10 tagline-content" style={{ gap: '40px', margin: '0 auto' }}>
        <p 
          className="text-white text-center"
          style={{
            fontWeight: 200,
            fontSize: '16px',
            lineHeight: '1.4em',
            letterSpacing: '0.02em',
          }}
        >
          {renderWords(subtitleText, subtitleWordsRef)}
        </p>

        <div className="flex flex-col w-full text-center" style={{ gap: '1px' }}>
          <h2 className="text-white tagline-headline">
            {renderWords(tagline1Text, tagline1WordsRef)}
          </h2>
          
          {/* "behind the scenes" с spotlight эффектом */}
          <div 
            ref={tagline2ContainerRef}
            className="relative cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Базовый слой - оранжевая обводка без заливки */}
            <h2 className="tagline-headline-stroke" style={tagline2BaseStyle}>
              {renderWords(tagline2Text, tagline2WordsRef)}
            </h2>
            
            {/* Верхний слой - белая заливка с эффектом "колбаски" */}
            {(() => {
              // Создаём маску из нескольких кругов (trail эффект)
              const circles = trail.map((pos, i) => {
                const size = 80 - i * 8; // Уменьшаем размер для каждого следующего круга
                return `radial-gradient(circle ${Math.max(size, 20)}px at ${pos.x}% ${pos.y}%, black 0%, black 100%, transparent 100%)`;
              });
              
              // Добавляем текущую позицию как главный круг
              const mainCircle = `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 100%, transparent 100%)`;
              const allCircles = [mainCircle, ...circles].join(', ');
              
              return (
                <h2 
                  className="absolute inset-0 transition-opacity duration-300 pointer-events-none tagline-headline-stroke"
                  style={{
                    color: '#FFFFFF',
                    WebkitTextStroke: '2px #FFFFFF',
                    paintOrder: 'stroke fill',
                    opacity: isHovering ? 1 : 0,
                    maskImage: allCircles,
                    WebkitMaskImage: allCircles,
                    maskComposite: 'add',
                    WebkitMaskComposite: 'source-over',
                  }}
                >
                  {tagline2Text}
                </h2>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
