'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-white' : 'bg-transparent'
    }`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16">
        <div className="flex justify-between items-center h-[64px] md:h-[104px]">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="text-[16px] md:text-[20px] text-[#1C1C1C] font-normal hover:text-gray-600 transition-colors duration-300">
              Anton Gubarev-Pentin
            </Link>
          </motion.div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1C1C1C]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Десктопное меню */}
          <nav className="hidden md:flex space-x-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <a href="/cv/gubarev-pentin-cv-eng.pdf" download className="text-[16px] md:text-[20px] text-[#1C1C1C] hover:text-gray-600 transition-colors duration-300 font-normal">
                CV eng
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <a href="/cv/gubarev-pentin-cv-rus.pdf" download className="text-[16px] md:text-[20px] text-[#1C1C1C] hover:text-gray-600 transition-colors duration-300 font-normal">
                CV rus
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="https://www.linkedin.com/in/anton-gubarev-pentin" target="_blank" className="text-[16px] md:text-[20px] text-[#1C1C1C] hover:text-gray-600 transition-colors duration-300 font-normal">
                LinkedIn
              </Link>
            </motion.div>
          </nav>
        </div>

        {/* Мобильное выпадающее меню */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white py-4"
          >
            <div className="flex flex-col space-y-4 px-4">
              <a 
                href="/cv/gubarev-pentin-cv-eng.pdf" 
                download 
                className="text-[16px] text-[#1C1C1C] hover:text-gray-600 transition-colors duration-300 font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                CV eng
              </a>
              <a 
                href="/cv/gubarev-pentin-cv-rus.pdf" 
                download 
                className="text-[16px] text-[#1C1C1C] hover:text-gray-600 transition-colors duration-300 font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                CV rus
              </a>
              <Link 
                href="https://www.linkedin.com/in/anton-gubarev-pentin" 
                target="_blank" 
                className="text-[16px] text-[#1C1C1C] hover:text-gray-600 transition-colors duration-300 font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                LinkedIn
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 