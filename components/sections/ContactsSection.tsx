'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const headlineWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const contactsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const contacts = [
    { label: 'e-mail', value: 'toxmanru@icloud.com', href: 'mailto:toxmanru@icloud.com' },
    { label: 'telegram', value: '@toxman', href: 'https://t.me/toxman' },
    { label: 'Linked In', value: 'in/anton-gubarev-pentin', href: 'https://linkedin.com/in/anton-gubarev-pentin' },
  ];

  const headlineText = "Let's Stay Connected";

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
      const headlineWords = headlineWordsRef.current.filter(Boolean);
      const contactItems = contactsRef.current.filter(Boolean);

      // Начальное состояние
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(headlineWords, { opacity: 0, y: 80 });
      gsap.set(contactItems, { opacity: 0, y: 30 });

      // Timeline привязанный к скроллу
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
          once: true,
        },
      });

      // Картинка появляется
      tl.from(imageRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      // Заголовок "My contacts"
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.8')
      // Слова headline появляются
      .to(headlineWords, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.3')
      // Контакты появляются
      .to(contactItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Мобильная версия
  if (isMobile) {
    return (
      <section 
        ref={sectionRef}
        className="relative w-full"
        style={{ 
          paddingLeft: '16px', 
          paddingRight: '16px',
          paddingTop: '32px',
          paddingBottom: '32px',
        }}
      >
        {/* Full-width white background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />

        {/* Content wrapper */}
        <div className="relative flex flex-col">
          {/* Заголовок секции */}
          <p 
            ref={titleRef}
            style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.4em', letterSpacing: '0.02em', color: '#ED5C4E' }}
          >
            My contacts
          </p>

          {/* Headline - отступ 16px, "Connected" с принудительным переносом */}
          <h3 className="work-headline" style={{ color: '#020202', marginTop: '16px' }}>
            <span
              ref={(el) => { headlineWordsRef.current[0] = el; }}
              className="inline-block"
            >
              Let&apos;s
            </span>
            {'\u00A0'}
            <span
              ref={(el) => { headlineWordsRef.current[1] = el; }}
              className="inline-block"
            >
              Stay
            </span>
            <br />
            <span
              ref={(el) => { headlineWordsRef.current[2] = el; }}
              className="inline-block"
            >
              Connected
            </span>
          </h3>

          {/* Контакты - отступ 16px между каждым */}
          {contacts.map((contact, index) => (
            <a
              key={index}
              ref={(el) => { contactsRef.current[index] = el; }}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col group"
              style={{ gap: '2px', marginTop: '16px' }}
            >
              <span style={{ 
                fontWeight: 200, 
                fontSize: '14px', 
                lineHeight: '1.4em', 
                letterSpacing: '-0.1em', 
                color: '#020202',
                transition: 'color 0.3s ease',
              }} className="group-hover:!text-[#ED5C4E]">
                {contact.label}
              </span>
              <span style={{ 
                fontWeight: 400, 
                fontSize: '16px', 
                lineHeight: '1.4em', 
                letterSpacing: '-0.1em', 
                color: '#020202',
                transition: 'color 0.3s ease',
              }} className="group-hover:!text-[#ED5C4E]">
                {contact.value}
              </span>
            </a>
          ))}

          {/* Фото - отступ 32px, во всю ширину */}
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
            <Image src="/images/contacts-bg-69af9d.png" alt="Contacts background" fill className="object-cover" />
          </div>
        </div>
      </section>
    );
  }

  // Десктопная версия
  return (
    <section 
      ref={sectionRef}
      className="relative w-full section-padding-adaptive" 
      style={{ paddingLeft: '64px', paddingRight: '64px' }}
    >
      {/* Full-width white background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Content wrapper */}
      <div className="relative flex justify-between content-min-height">
        {/* Left content */}
        <div className="flex flex-col" style={{ width: '422px', gap: '48px' }}>
          <p 
            ref={titleRef}
            style={{ fontWeight: 300, fontSize: '20px', lineHeight: '1.4em', letterSpacing: '0.02em', color: '#ED5C4E' }}
          >
            My contacts
          </p>

          <div className="flex flex-col" style={{ gap: '24px' }}>
            <h3 className="work-headline" style={{ color: '#020202' }}>
              {headlineText.split(' ').map((word, index) => (
                <span
                  key={index}
                  ref={(el) => { headlineWordsRef.current[index] = el; }}
                  className="inline-block"
                >
                  {word}{index < headlineText.split(' ').length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </h3>

            <div className="flex flex-col" style={{ gap: '24px' }}>
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  ref={(el) => { contactsRef.current[index] = el; }}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col group"
                  style={{ gap: '2px' }}
                >
                  <span style={{ 
                    fontWeight: 200, 
                    fontSize: '16px', 
                    lineHeight: '1.4em', 
                    letterSpacing: '-0.1em', 
                    color: '#020202',
                    transition: 'color 0.3s ease',
                  }} className="group-hover:!text-[#ED5C4E]">
                    {contact.label}
                  </span>
                  <span style={{ 
                    fontWeight: 400, 
                    fontSize: '16px', 
                    lineHeight: '1.4em', 
                    letterSpacing: '-0.1em', 
                    color: '#020202',
                    transition: 'color 0.3s ease',
                  }} className="group-hover:!text-[#ED5C4E]">
                    {contact.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right image */}
        <div 
          ref={imageRef}
          className="relative overflow-hidden work-image-container"
          style={{
            borderRadius: '32px',
            backgroundColor: '#494949',
            flexShrink: 0,
          }}
        >
          <Image src="/images/contacts-bg-69af9d.png" alt="Contacts background" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
