'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const subtitleText = 'What design means to me —';
const tagline1Text = 'Crafting simple experiences, keeping all complexity';
const tagline2Text = 'behind the scenes';

/**
 * Структура:
 *  <section.tagline-section>        — высокий «трек» для скролла (сам не пинится)
 *    <div.tagline-sticky>           — CSS `position: sticky`, ровно 100svh, контент по центру
 *
 * Прогресс скролла по треку (ScrollTrigger со scrub) плавно «проявляет» слова:
 * opacity + сдвиг + blur. Следующая секция (белая) наезжает поверх залипшего блока
 * за счёт отрицательного margin-bottom у трека.
 */
export default function TaglineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagline2ContainerRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const trailLength = 8;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-tagline-word]', section);
      if (!words.length) return;

      // Пользователям с reduced motion сразу показываем текст
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(words, { opacity: 1, y: 0, filter: 'none' });
        revealedRef.current = true;
        return;
      }

      const subtitleCount = subtitleText.split(' ').length;
      const STEP = 0.32; // сдвиг между соседними словами
      const GAP = 0.9; // пауза между подзаголовком и заголовком

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          // Начинаем, когда блок только появляется снизу, заканчиваем уже на залипшем экране
          start: 'top 30%',
          end: 'top -100%',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            revealedRef.current = self.progress > 0.96;
          },
        },
      });

      words.forEach((word, i) => {
        const at = i * STEP + (i >= subtitleCount ? GAP : 0);
        tl.fromTo(
          word,
          { opacity: 0, y: 28, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
          at,
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tagline2ContainerRef.current || !revealedRef.current) return;
    const rect = tagline2ContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y });
    setTrail((prev) => [{ x, y }, ...prev].slice(0, trailLength));
  };

  const renderWords = (text: string) => {
    const parts = text.split(' ');
    return parts.map((word, index) => (
      <span key={index} data-tagline-word className="tagline-word">
        {word}
        {index < parts.length - 1 ? '\u00A0' : ''}
      </span>
    ));
  };

  const tagline2BaseStyle: React.CSSProperties = {
    color: '#020202',
    WebkitTextStroke: '2px #ED5C4E',
    paintOrder: 'stroke fill',
  };

  return (
    <section ref={sectionRef} className="relative w-full tagline-section" style={{ zIndex: 0 }}>
      <div className="tagline-sticky">
        {/* Background Glow */}
        <div className="absolute pointer-events-none tagline-glow" style={{ zIndex: 0 }} />

        <div
          className="flex flex-col items-center relative z-10 tagline-content"
          style={{ gap: '40px', margin: '0 auto' }}
        >
          <p
            className="text-white text-center"
            style={{
              fontWeight: 200,
              fontSize: '16px',
              lineHeight: '1.4em',
              letterSpacing: '0.02em',
            }}
          >
            {renderWords(subtitleText)}
          </p>

          <div className="flex flex-col w-full text-center" style={{ gap: '1px' }}>
            <h2 className="text-white tagline-headline">{renderWords(tagline1Text)}</h2>

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
                {renderWords(tagline2Text)}
              </h2>

              {/* Верхний слой - белая заливка с эффектом "колбаски" */}
              {(() => {
                const circles = trail.map((pos, i) => {
                  const size = 80 - i * 8;
                  return `radial-gradient(circle ${Math.max(size, 20)}px at ${pos.x}% ${pos.y}%, black 0%, black 100%, transparent 100%)`;
                });

                const mainCircle = `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, black 0%, black 100%, transparent 100%)`;
                const allCircles = [mainCircle, ...circles].join(', ');

                return (
                  <h2
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none tagline-headline-stroke"
                    style={{
                      color: '#FFFFFF',
                      WebkitTextStroke: '2px #FFFFFF',
                      paintOrder: 'stroke fill',
                      opacity: isHovering && revealedRef.current ? 1 : 0,
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
      </div>
    </section>
  );
}
