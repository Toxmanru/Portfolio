'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'My works', href: '#works', className: 'header-my-works-link' },
  { label: 'CV', href: '/cv/gubarev-pentin-cv.pdf', newTab: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anton-gubarev-pentin', newTab: true },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 960) setIsMenuOpen(false);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', closeMenuOnDesktop);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', closeMenuOnDesktop);
    };
  }, []);

  return (
    <>
      <header
        className={`rd-header fixed top-0 left-0 right-0 z-50 ${isMenuOpen ? 'rd-header--menu-open' : ''}`}
        style={{ background: isScrolled && !isMenuOpen ? 'var(--rd-header-gradient)' : 'transparent' }}
      >
        <div className="rd-header-inner">
          <Link
            href="/"
            className="rd-header-brand hover:opacity-70 transition-opacity duration-300"
            aria-label="Anton Gubarev-Pentin — home"
          >
            <Image
              src="/icons/romb-24.svg"
              alt=""
              width={26}
              height={26}
              className="rd-header-romb rd-header-romb--desktop"
              priority
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="rd-header-romb rd-header-romb--mobile"
              aria-hidden
            >
              <rect x="0.730816" y="9" width="11.6943" height="11.6943" transform="rotate(-45 0.730816 9)" stroke="currentColor" />
              <rect x="6.58441" y="9.00543" width="3.43289" height="3.43289" transform="rotate(-45 6.58441 9.00543)" fill="currentColor" />
            </svg>
            <span
              className="rd-header-name"
              style={{
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'translateX(0)' : 'translateX(-8px)',
              }}
              aria-hidden={!isScrolled}
            >
              Anton Gubarev-Pentin
            </span>
          </Link>

          <nav className="rd-header-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
                className={`rd-header-link hover:opacity-70 transition-opacity duration-300 ${link.className ?? ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rd-header-burger hover:opacity-70"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {(['top', 'mid', 'bottom'] as const).map((pos, i) => (
                <line
                  key={pos}
                  className={`rd-burger-line rd-burger-line--${pos}`}
                  x1="4"
                  x2="20"
                  y1={6 + i * 6}
                  y2={6 + i * 6}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`rd-mobile-menu fixed inset-0 z-40 bg-black ${isMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <nav className="flex flex-col items-center justify-center h-full" style={{ gap: '32px' }}>
          {NAV_LINKS.map((link, i) => (
            <span key={link.label} className={`rd-mobile-menu-mask ${link.className ?? ''}`}>
              <Link
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
                className="rd-mobile-menu-line rd-header-link"
                style={{ fontSize: '24px', color: 'var(--rd-lime)', '--i': i } as React.CSSProperties}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
