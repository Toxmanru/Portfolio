'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type KeyResultItem = {
  title: string;
  value: string;
};

interface KeyResultsProps {
  isMobile: boolean;
  items: KeyResultItem[];
  title?: string;
  columnsDesktop?: number;
  horizontalPadding: number;
  paddingTopDesktop?: number;
  paddingBottomDesktop?: number;
  paddingYMobile?: number;
  valueColor?: string;
}

export default function KeyResults({
  isMobile,
  items,
  title = 'Key results',
  columnsDesktop = 4,
  horizontalPadding,
  paddingTopDesktop = 104,
  paddingBottomDesktop = 104,
  paddingYMobile = 48,
  valueColor = '#C0FE06',
}: KeyResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = valueRefs.current.filter(Boolean);
      if (!targets.length) return;
      gsap.set(targets, { yPercent: 120, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            targets,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(1.4)',
              stagger: 0.08,
            }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        paddingTop: isMobile ? `${paddingYMobile}px` : `${paddingTopDesktop}px`,
        paddingBottom: isMobile ? `${paddingYMobile}px` : `${paddingBottomDesktop}px`,
        paddingLeft: `${horizontalPadding}px`,
        paddingRight: `${horizontalPadding}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#020202', left: 'calc(50% - 50vw)', right: 'calc(50% - 50vw)', top: '-1px', bottom: '-1px', pointerEvents: 'none' }}
      />

      <div className="relative flex flex-col items-center" style={{ gap: isMobile ? '32px' : '40px' }}>
        <h2
          style={{
            fontWeight: 900,
            fontSize: '32px',
            lineHeight: '1.13em',
            letterSpacing: '-0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>

        <div
          className="grid"
          style={{
            width: '100%',
            gridTemplateColumns: isMobile ? '1fr' : `repeat(${columnsDesktop}, 1fr)`,
            gap: isMobile ? '32px' : '32px',
            color: '#FFFFFF',
          }}
        >
          {items.map((item) => (
            <div key={item.title} className="flex flex-col" style={{ gap: '8px', alignItems: 'center', textAlign: 'center' }}>
              <span
                style={{
                  fontWeight: 300,
                  fontSize: isMobile ? '10px' : '12px',
                  lineHeight: '1.2em',
                  letterSpacing: '-0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {item.title}
              </span>
              <span
                ref={(el) => {
                  valueRefs.current = valueRefs.current.slice(0, items.length);
                  valueRefs.current[items.indexOf(item)] = el;
                }}
                style={{
                  fontWeight: 900,
                  fontSize: '24px',
                  lineHeight: '1.13em',
                  letterSpacing: '-0.08em',
                  textTransform: 'uppercase',
                  color: valueColor,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
