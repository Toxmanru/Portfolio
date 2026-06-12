'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [baseHeight, setBaseHeight] = useState(104);
  const [basePadding, setBasePadding] = useState(20);
  const [horizontalPadding, setHorizontalPadding] = useState(64);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const updateSizes = () => {
      const width = window.innerWidth;
      if (width < 960) {
        setBaseHeight(64);
        setBasePadding(12);
        setHorizontalPadding(16);
        setIsMobile(true);
      } else if (width < 1280) {
        setBaseHeight(64);
        setBasePadding(12);
        setHorizontalPadding(64);
        setIsMobile(false);
      } else {
        setBaseHeight(104);
        setBasePadding(20);
        setHorizontalPadding(64);
        setIsMobile(false);
      }
    };

    updateSizes();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSizes);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  const bgColor = isScrolled ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)';
  const textColor = isScrolled ? '#020202' : '#FFFFFF';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ 
          backgroundColor: bgColor,
        }}
      >
        <div 
          className="flex items-center justify-between transition-all duration-300"
          style={{ 
            maxWidth: '1440px',
            margin: '0 auto',
            height: `${baseHeight}px`,
            paddingTop: `${basePadding}px`, 
            paddingBottom: `${basePadding}px`,
            paddingLeft: `${horizontalPadding}px`,
            paddingRight: `${horizontalPadding}px`,
          }}
        >
          <Link 
            href="/" 
            className="header-link hover:opacity-70 transition-all duration-300"
            style={{ color: textColor }}
          >
            Anton Gubarev-Pentin
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center" style={{ gap: '32px' }}>
              <Link 
                href="#works" 
                className="header-link header-my-works-link hover:opacity-70 transition-all duration-300"
                style={{ color: textColor }}
              >
                My works
              </Link>
              <Link 
                href="/cv/gubarev-pentin-cv.pdf" 
                target="_blank"
                className="header-link hover:opacity-70 transition-all duration-300"
                style={{ color: textColor }}
              >
                CV
              </Link>
              <Link 
                href="https://linkedin.com/in/anton-gubarev-pentin" 
                target="_blank"
                rel="noopener noreferrer"
                className="header-link hover:opacity-70 transition-all duration-300"
                style={{ color: textColor }}
              >
                LinkedIn
              </Link>
            </nav>
          )}

          {/* Burger Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="relative transition-all duration-300 hover:opacity-70"
              style={{ width: '24px', height: '24px' }}
              aria-label="Toggle menu"
            >
              <span 
                className="absolute left-1/2 transition-all duration-300"
                style={{ 
                  width: '20px', 
                  height: '2px', 
                  backgroundColor: textColor,
                  top: isMenuOpen ? '11px' : '6px',
                  transform: `translateX(-50%) ${isMenuOpen ? 'rotate(45deg)' : 'rotate(0)'}`,
                }}
              />
              <span 
                className="absolute left-1/2 top-1/2 transition-all duration-300"
                style={{ 
                  width: '20px', 
                  height: '2px', 
                  backgroundColor: textColor,
                  transform: 'translateX(-50%) translateY(-50%)',
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <span 
                className="absolute left-1/2 transition-all duration-300"
                style={{ 
                  width: '20px', 
                  height: '2px', 
                  backgroundColor: textColor,
                  top: isMenuOpen ? '11px' : '16px',
                  transform: `translateX(-50%) ${isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'}`,
                }}
              />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 z-40 transition-all duration-300"
          style={{
            backgroundColor: 'rgba(2, 2, 2, 0.95)',
            opacity: 1,
            pointerEvents: 'auto',
            paddingTop: `${baseHeight}px`,
          }}
        >
          <nav 
            className="flex flex-col items-center justify-center h-full"
            style={{ gap: '32px' }}
          >
            <Link 
              href="#works" 
              className="header-link header-my-works-link hover:opacity-70 transition-all duration-300"
              style={{ color: '#FFFFFF', fontSize: '24px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              My works
            </Link>
            <Link 
              href="/cv/gubarev-pentin-cv.pdf" 
              target="_blank"
              className="header-link hover:opacity-70 transition-all duration-300"
              style={{ color: '#FFFFFF', fontSize: '24px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              CV
            </Link>
            <Link 
              href="https://linkedin.com/in/anton-gubarev-pentin" 
              target="_blank"
              rel="noopener noreferrer"
              className="header-link hover:opacity-70 transition-all duration-300"
              style={{ color: '#FFFFFF', fontSize: '24px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              LinkedIn
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
