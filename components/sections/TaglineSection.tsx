'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type MottoLine = { text: string; asterisk?: boolean };

// Переносы строк заданы макетами: на мобилке звёздочка переезжает в плашку
const LAYOUTS: Record<'desktop' | 'mobile', { lines: MottoLine[]; badge: MottoLine[] }> = {
  desktop: {
    lines: [
      { text: 'I design simple' },
      { text: 'experiences', asterisk: true },
      { text: 'Keeping complexity' },
    ],
    badge: [{ text: 'behind the scenes' }],
  },
  mobile: {
    lines: [
      { text: 'I design' },
      { text: 'simple' },
      { text: 'experiences' },
      { text: 'Keeping' },
      { text: 'complexity' },
    ],
    badge: [{ text: 'behind', asterisk: true }, { text: 'the scenes' }],
  },
};

const ARIA_LABEL = 'I design simple experiences Keeping complexity behind the scenes';

function Asterisk() {
  return <span className="motto-asterisk">*</span>;
}

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i} className="motto-char" data-motto-char>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
}

function BadgeLines({ lines }: { lines: MottoLine[] }) {
  return (
    <>
      {lines.map((line) => (
        <span key={line.text} className="motto-badge-line">
          {line.asterisk && <Asterisk />}
          <Chars text={line.text} />
        </span>
      ))}
    </>
  );
}

export default function TaglineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLSpanElement>(null);
  const revealedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 959px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      if (revealedRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealedRef.current = true;
        return;
      }

      const lines = q('[data-motto-line-inner]');
      const badgeBg = q('[data-motto-badge-bg]');
      const badgeChars = q('[data-motto-badge-text] .motto-badge-line > *');
      const circle = q('[data-motto-circle]');

      gsap.set(lines, { yPercent: 100 });
      gsap.set(badgeBg, { scaleX: 0 });
      gsap.set(badgeChars, { xPercent: -120, opacity: 0 });
      gsap.set(circle, { opacity: 0, rotate: -90, scale: 0.6 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });

      // Скраб только вперёд: прогресс не уменьшается при скролле вверх
      let maxProgress = 0;
      const advance = (self: ScrollTrigger) => {
        if (self.progress <= maxProgress) return;
        maxProgress = self.progress;
        gsap.to(tl, {
          progress: maxProgress,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: true,
          onComplete: () => {
            if (maxProgress >= 1) revealedRef.current = true;
          },
        });
      };

      // Секция закрепляется по центру экрана: скролл крутит анимацию, после её конца страница едет дальше.
      // Пин не снимаем после раскрытия, иначе пропадёт отступ под него и страница прыгнет.
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'center center',
        end: isMobile ? '+=900' : '+=1200',
        pin: true,
        anticipatePin: 1,
        // Выше пина works: пересчитывается первым, чтобы works мерил позицию уже с учётом этого pin-spacer
        refreshPriority: 2,
        invalidateOnRefresh: true,
        onUpdate: advance,
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      advance(trigger);

      tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0)
        .to(badgeBg, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, 0.9)
        .to(badgeChars, { xPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02 }, 1.6)
        .to(circle, { opacity: 1, rotate: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, 2)
        .to({}, { duration: 0.2 });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const moveSpotlight = (e: React.MouseEvent<HTMLSpanElement>) => {
    const badge = badgeRef.current;
    const spotlight = spotlightRef.current;
    if (!badge || !spotlight) return;
    const rect = badge.getBoundingClientRect();
    spotlight.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    spotlight.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  const setSpotlight = (radius: number) => {
    if (!revealedRef.current && radius > 0) return;
    gsap.to(spotlightRef.current, { '--spot-r': `${radius}px`, duration: 0.45, ease: 'power3.out' });
  };

  const layout = LAYOUTS[isMobile ? 'mobile' : 'desktop'];

  return (
    <section ref={sectionRef} className="relative w-full tagline-section">
      <h2 className="motto" aria-label={ARIA_LABEL}>
        {layout.lines.map((line) => (
          <span key={line.text} className="motto-line" aria-hidden>
            <span className="motto-line-inner" data-motto-line-inner>
              {line.asterisk && <Asterisk />}
              {line.text}
            </span>
          </span>
        ))}

        <span
          ref={badgeRef}
          className="motto-badge"
          aria-hidden
          onMouseMove={moveSpotlight}
          onMouseEnter={(e) => {
            moveSpotlight(e);
            setSpotlight(110);
          }}
          onMouseLeave={() => setSpotlight(0)}
        >
          <span className="motto-badge-bg" data-motto-badge-bg />
          <span className="motto-badge-text" data-motto-badge-text>
            <BadgeLines lines={layout.badge} />
          </span>
          <span ref={spotlightRef} className="motto-badge-text motto-badge-spotlight">
            <BadgeLines lines={layout.badge} />
          </span>
        </span>

        <svg
          className="motto-circle"
          data-motto-circle
          viewBox="0 0 50 50"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="25" cy="25" r="24.5" stroke="var(--rd-lime)" />
          <rect x="38" y="19" width="12" height="12" fill="var(--rd-lime)" />
        </svg>
      </h2>
    </section>
  );
}
