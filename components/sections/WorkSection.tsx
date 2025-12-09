'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import GlassButton from '@/components/ui/GlassButton';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    headline: 'QIC App',
    descriptions: [
      "I led the UX transformation of the MENA's largest insur-tech app, evolving it from a single-purpose driver app into a multi-domain ecosystem recognized with multiple industry awards",
    ],
    role: 'Role: Product Design Lead',
    buttonHref: '/works/qic-app',
    buttonLabel: 'Coming soon',
    disabled: true,
    image: '/images/works/qic-app.png',
  },
  {
    id: 2,
    headline: 'Amiwa™',
    descriptions: [
      "Solo-built with AI travel companion designed to keep every part of your trip: plans, tickets, locations, and notes. Organized in one simple, private space, so you can stay fully present on the road",
    ],
    role: 'Role: Solo founder, Product Designer',
    buttonHref: '/works/amiwa',
    image: '/images/works/amiwa.png',
  },
  {
    id: 3,
    headline: 'Architecture\nof a Design Team',
    descriptions: [
      "I led the creation of product design team at QIC and processes within my stream, building a scalable workflow, establishing a strong design culture, and transforming an early MVP into a full, multi-platform product experience",
    ],
    role: 'Role: Team Lead, Design Manager',
    buttonHref: '/works/design-team',
    image: '/images/works/design-team.png',
  },
  {
    id: 4,
    headline: 'SberHealth',
    descriptions: [
      "Full redesign of digital medical products catalog: simplifying navigation, improving product clarity, and driving measurable growth in both sales and average order value",
    ],
    role: 'Role: Product Designer',
    buttonHref: '/works/sberhealth',
    image: '/images/works/sberhealth.png',
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [verticalPadding, setVerticalPadding] = useState(120);
  const [horizontalPadding, setHorizontalPadding] = useState(64);
  const [pinOffset, setPinOffset] = useState(80);

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      
      // Мобильный брейкпоинт < 960px
      setIsMobile(width < 960);
      
      // Отступы для мобильных: 32px вертикальные, 16px горизонтальные
      if (width < 960) {
        setVerticalPadding(32);
        setHorizontalPadding(16);
      } else if (width < 1400) {
        setVerticalPadding(64);
        setHorizontalPadding(64);
      } else {
        setVerticalPadding(120);
        setHorizontalPadding(64);
      }
      
      // Pin offset: 64px для < 1280, 80px для >= 1280
      if (width < 1280) {
        setPinOffset(64);
      } else {
        setPinOffset(80);
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  // Активируем тёмный хедер на мобильном, пока секция в вьюпорте
  useEffect(() => {
    if (!isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('works-section-mobile-active');
          } else {
            document.body.classList.remove('works-section-mobile-active');
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('works-section-mobile-active');
    };
  }, [isMobile]);

  // Desktop: ScrollTrigger анимация
  useEffect(() => {
    // Пропускаем анимацию на мобильных
    if (isMobile) return;
    
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Начальное состояние
      contentRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50 });
          el.style.visibility = i === 0 ? 'visible' : 'hidden';
        }
      });
      imageRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { opacity: i === 0 ? 1 : 0 });
          el.style.visibility = i === 0 ? 'visible' : 'hidden';
        }
      });

      // ScrollTrigger для pin и переключения работ
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `top ${pinOffset}px`,
          end: `+=${works.length * 50}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onEnter: () => document.body.classList.add('works-section-active'),
          onLeave: () => document.body.classList.remove('works-section-active'),
          onEnterBack: () => document.body.classList.add('works-section-active'),
          onLeaveBack: () => document.body.classList.remove('works-section-active'),
        },
      });

      // Пустая пауза в начале, чтобы первая работа не переключалась сразу
      tl.to({}, { duration: 0.5 });

      // Анимации переключения между работами
      for (let i = 0; i < works.length - 1; i++) {
        const currentContent = contentRefs.current[i];
        const nextContent = contentRefs.current[i + 1];
        const currentImage = imageRefs.current[i];
        const nextImage = imageRefs.current[i + 1];

        if (currentContent && nextContent && currentImage && nextImage) {
          tl.to(currentContent, { opacity: 0, y: -50, duration: 0.5 })
            .to(currentContent, { visibility: 'hidden', duration: 0 })
            .to(currentImage, { opacity: 0, duration: 0.5 }, '<')
            .to(currentImage, { visibility: 'hidden', duration: 0 })
            .set(nextContent, { visibility: 'visible' })
            .set(nextImage, { visibility: 'visible' })
            .fromTo(nextContent, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, '<')
            .fromTo(nextImage, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '<');
        }
      }
    }, section);

    return () => ctx.revert();
  }, [pinOffset, isMobile]);

  // Мобильная версия - обычный скролл карточек
  if (isMobile) {
    return (
      <section ref={sectionRef} className="relative" style={{ zIndex: 10 }}>
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        />
        
        <div 
          className="relative w-full"
          style={{ 
            paddingTop: `${verticalPadding}px`, 
            paddingBottom: `${verticalPadding}px`, 
            paddingLeft: `${horizontalPadding}px`, 
            paddingRight: `${horizontalPadding}px` 
          }}
        >
          {/* Заголовок секции */}
          <p style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.4em', letterSpacing: '0.02em', color: '#ED5C4E', marginBottom: '32px' }}>
            My works
          </p>

          {/* Карточки работ - вертикальный список */}
          <div className="flex flex-col" style={{ gap: '48px' }}>
            {works.map((work) => (
              <div key={work.id} className="flex flex-col">
                {/* Картинка во всю ширину */}
                <div 
                  className="w-full relative"
                  style={{ 
                    borderRadius: '24px', 
                    backgroundColor: '#FFFFFF', 
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                  }}
                >
                  <Image src={work.image} alt={work.headline} fill className="object-cover" />
                </div>
                
                {/* Заголовок работы - отступ 24px от картинки */}
                <h3 style={{ 
                  fontWeight: 500, 
                  fontSize: '32px', 
                  lineHeight: '1.2em', 
                  letterSpacing: '-0.1em', 
                  color: '#020202',
                  marginTop: '24px'
                }}>
                  {work.headline}
                </h3>
                
                {/* Role - первый после заголовка, отступ 16px */}
                <p style={{ 
                  fontWeight: 300, 
                  fontSize: '14px', 
                  lineHeight: '1.4em', 
                  letterSpacing: '-0.02em', 
                  color: '#020202',
                  marginTop: '16px'
                }}>
                  {work.role}
                </p>
                
                {/* Описание - отступ 16px */}
                <p style={{ 
                  fontWeight: 300, 
                  fontSize: '14px', 
                  lineHeight: '1.4em', 
                  letterSpacing: '-0.02em', 
                  color: '#020202',
                  marginTop: '16px'
                }}>
                  {work.descriptions.join(' ')}
                </p>
                
                {/* Кнопка во всю ширину - отступ 24px */}
                <div style={{ width: '100%', marginTop: '24px' }}>
                  <GlassButton
                    href={work.disabled ? undefined : work.buttonHref}
                    variant="dark"
                    fullWidth
                    disabled={work.disabled}
                  >
                    {work.buttonLabel ?? 'Details'}
                  </GlassButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Десктопная версия - pin анимация
  return (
    <section ref={sectionRef} className="relative" style={{ zIndex: 10 }}>
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: '#FFFFFF', width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      />
      
      <div 
        className="relative w-full"
        style={{ paddingTop: `${verticalPadding}px`, paddingBottom: `${verticalPadding}px`, paddingLeft: `${horizontalPadding}px`, paddingRight: `${horizontalPadding}px` }}
      >
        <div className="relative flex" style={{ minHeight: '568px', gap: '16px' }}>
          <div className="relative" style={{ flex: 1, minHeight: '568px' }}>
            {/* Статичный заголовок секции - на одной линии с картинкой */}
            <p style={{ fontWeight: 300, fontSize: '20px', lineHeight: '1.4em', letterSpacing: '0.02em', color: '#ED5C4E', marginBottom: '48px' }}>
              My works
            </p>

            {/* Контейнер для работ */}
            <div className="relative" style={{ minHeight: '450px' }}>
              {works.map((work, index) => (
                <div
                  key={work.id}
                  ref={(el) => { contentRefs.current[index] = el; }}
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '64px',
                    visibility: index === 0 ? 'visible' : 'hidden',
                  }}
                >
                <div className="flex flex-col flex-1" style={{ gap: '24px' }}>
                  <h3 className="work-headline" style={{ color: '#020202', whiteSpace: 'pre-line' }}>
                    {work.headline}
                  </h3>
                  <div className="flex flex-col" style={{ gap: '24px' }}>
                    {/* Описание - сплошной текст */}
                    <p style={{ 
                      fontWeight: 300, 
                      fontSize: '16px', 
                      lineHeight: '1.4em', 
                      letterSpacing: '-0.02em', 
                      color: '#020202',
                      width: '65%',
                    }}>
                      {work.descriptions.join(' ')}
                    </p>
                    {/* Role - отдельный блок с отступом */}
                    <p style={{ fontWeight: 300, fontSize: '16px', lineHeight: '1.4em', letterSpacing: '-0.02em', color: '#020202' }}>
                      {work.role}
                    </p>
                  </div>
                </div>
                  <div style={{ width: 'fit-content' }}>
                    <GlassButton
                      href={work.disabled ? undefined : work.buttonHref}
                      variant="dark"
                      disabled={work.disabled}
                    >
                      {work.buttonLabel ?? 'Details'}
                    </GlassButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="relative work-image-container"
            style={{ 
              borderRadius: '32px', 
              backgroundColor: '#FFFFFF', 
              overflow: 'hidden', 
              flexShrink: 0,
            }}
          >
            {works.map((work, index) => (
              <div
                key={work.id}
                ref={(el) => { imageRefs.current[index] = el; }}
                className="absolute inset-0"
                style={{ backgroundColor: '#FFFFFF', visibility: index === 0 ? 'visible' : 'hidden' }}
              >
                <Image src={work.image} alt={work.headline} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
