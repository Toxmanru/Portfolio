'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '@/components/ui/Badge';
import LinkChip from '@/components/ui/LinkChip';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  { label: 'Linked In', href: 'https://linkedin.com/in/anton-gubarev-pentin' },
  { label: 'e-mail me', href: 'mailto:toxmanru@icloud.com' },
  { label: 'telegram', href: 'https://t.me/toxman' },
];

const headlineLines = ["Let's Stay", 'Connected'];

export default function ContactsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headlineLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const contactsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
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
      const lines = headlineLinesRef.current.filter(Boolean);
      const contactItems = contactsRef.current.filter(Boolean);

      // Те же движения, что в интро hero: строки из-под маски, бейдж выезжает слева
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      });

      tl.from(imageRef.current, { opacity: 0, y: 40, duration: 1.2 })
        .from(lines, { yPercent: 100, duration: 0.9, stagger: 0.1 }, '-=1')
        .from(titleRef.current, { opacity: 0, x: -24, duration: 0.6 }, '-=0.6')
        .from(contactItems, { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Меняем цвет хедера при пересечении секции контактов
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('contacts-section-active');
          } else {
            document.body.classList.remove('contacts-section-active');
          }
        });
      },
      { threshold: isMobile ? 0.95 : 0.6 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('contacts-section-active');
    };
  }, [isMobile]);

  const headline = (
    <h3 className="contacts-headline">
      {headlineLines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <span
            ref={(el) => { headlineLinesRef.current[index] = el; }}
            className="block"
          >
            {line}
          </span>
        </span>
      ))}
    </h3>
  );

  const chips = contacts.map((contact, index) => (
    <LinkChip
      key={contact.label}
      ref={(el) => { contactsRef.current[index] = el; }}
      href={contact.href}
      {...(contact.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {contact.label}
    </LinkChip>
  ));

  const background = (
    <div
      className="absolute inset-0"
      style={{ background: 'var(--rd-light-gradient)', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
    />
  );

  // Мобильная версия
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ padding: '48px 16px' }}
      >
        {background}

        <div className="relative flex flex-col">
          <div ref={titleRef}>
            <Badge>My contacts</Badge>
          </div>

          <div style={{ marginTop: '24px' }}>{headline}</div>

          <div className="flex flex-col" style={{ gap: '24px', marginTop: '24px' }}>
            {chips}
          </div>

          <div
            ref={imageRef}
            className="relative overflow-hidden w-full"
            style={{
              borderRadius: '24px',
              backgroundColor: '#494949',
              marginTop: '32px',
              aspectRatio: '1 / 1',
            }}
          >
            <Image src="/images/contacts-bg-69af9d.png" alt="Contacts background" fill sizes="(max-width: 1440px) 100vw, 1440px" className="object-cover" />
          </div>
        </div>
      </section>
    );
  }

  // Десктопная версия
  return (
    <section
      ref={sectionRef}
      className="relative w-full public-talks-padding"
      style={{ paddingLeft: '64px', paddingRight: '64px' }}
    >
      {background}

      <div className="relative flex content-min-height" style={{ gap: '16px' }}>
        <div className="flex flex-col justify-between" style={{ flex: 1, minWidth: 0 }}>
          <div className="flex flex-col" style={{ gap: '48px' }}>
            <div ref={titleRef}>
              <Badge>My contacts</Badge>
            </div>
            {headline}
          </div>

          <div className="flex flex-col" style={{ gap: '24px' }}>
            {chips}
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative overflow-hidden work-image-container contacts-photo"
          style={{
            borderRadius: '8px',
            backgroundColor: '#494949',
            flexShrink: 0,
          }}
        >
          <Image src="/images/contacts-bg-69af9d.png" alt="Contacts background" fill sizes="(max-width: 1440px) 100vw, 1440px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
