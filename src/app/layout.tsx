'use client';

import './globals.css';
import { Montserrat } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import TransitionOverlay from "@/components/TransitionOverlay";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWorkPage = pathname === '/work';
  const isHomePage = pathname === '/';

  return (
    <html lang="ru">
      <head>
        <title>Portfolio</title>
        <meta name="description" content="Современный веб-сайт с адаптивным дизайном и анимациями" />
      </head>
      <body className={`${montserrat.className} bg-white`}>
        <CustomCursor />
        <Header />
        <TransitionOverlay />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={isWorkPage ? {
              scale: 0.8,
              opacity: 0,
              borderRadius: '32px',
              transformOrigin: 'center'
            } : isHomePage ? {
              scale: 1.2,
              opacity: 0,
              borderRadius: '32px',
              transformOrigin: 'center'
            } : {
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1,
              borderRadius: '0px',
              transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.1
              }
            }}
            exit={isWorkPage ? {
              scale: 0.8,
              opacity: 0,
              borderRadius: '32px',
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }
            } : isHomePage ? {
              scale: 1.2,
              opacity: 0,
              borderRadius: '32px',
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }
            } : {
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
