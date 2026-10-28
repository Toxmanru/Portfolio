'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import Badge from '@/components/ui/Badge';

const NAME_LINES = ['Anton', 'Gubarev\u2022', 'Pentin'];

const DOMAINS = ['Insure-Tech', 'E-com', 'Med-Tech', 'Finance', 'Ecosystems'];

const NUMBERS = [
  ['9 Years', 'in Product Design'],
  ['3 Years', 'in Design Leadership'],
  ['8+ Products', 'Launched'],
];

function Cross({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <Image
      src="/icons/cross.svg"
      alt=""
      width={16}
      height={16}
      className={`rd-hero-cross rd-hero-cross--${corner}`}
      aria-hidden
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-hero="lime"]', {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1,
        ease: 'power3.inOut',
      })
        .from('[data-hero="photo"]', { opacity: 0, y: 40, duration: 1.2 }, '-=0.5')
        .from('[data-hero="name-line"]', { yPercent: 100, duration: 0.9, stagger: 0.1 }, '-=1')
        .from('[data-hero="badge"]', { opacity: 0, x: -24, duration: 0.6 }, '-=0.6')
        .from('[data-hero="domains"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('[data-hero="text"]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="rd-hero">
      <div className="rd-hero-bg" aria-hidden />

      <h1 className="rd-hero-name" aria-label="Anton Gubarev-Pentin">
        {NAME_LINES.map((line) => (
          <span key={line} className="rd-hero-name-mask" aria-hidden>
            <span className="rd-hero-name-line" data-hero="name-line">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className="rd-hero-photo" data-hero="photo">
        <Image
          src="/images/hero-photo.png"
          alt="Anton Gubarev-Pentin"
          fill
          sizes="573px"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="rd-hero-lime" data-hero="lime" aria-hidden />

      <div className="rd-hero-domains" data-hero="domains">
        <div className="rd-hero-domains-col">
          <Cross corner="tl" />
          <span className="rd-hero-domains-badge">domains</span>
          <Cross corner="bl" />
        </div>
        <ul className="rd-hero-domains-list">
          {DOMAINS.map((domain) => (
            <li key={domain}>{domain}</li>
          ))}
        </ul>
        <div className="rd-hero-domains-col">
          <Cross corner="tr" />
          <Cross corner="br" />
        </div>
      </div>

      <Badge className="rd-hero-badge" data-hero="badge">
        product design leader
      </Badge>

      <div className="rd-hero-text" data-hero="text">
        <p className="rd-hero-description">
          I&apos;ve worked on digital products at QIC, SberHealth, Wildberries and more. Built and led
          Design Function from scratch, shaped the UX strategy of a digital ecosystem, and introduced
          DesignOps and AI-enabled workflows. I also help startups establish product design from the
          ground up.
        </p>
        <ul className="rd-hero-numbers">
          {NUMBERS.map(([value, label]) => (
            <li key={value}>
              {value}
              <br />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
