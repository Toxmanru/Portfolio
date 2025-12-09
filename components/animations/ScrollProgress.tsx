'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const progressBar = progressRef.current;

    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/10">
      <div
        ref={progressRef}
        className="h-full origin-left scale-x-0"
        style={{
          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        }}
      />
    </div>
  );
}

