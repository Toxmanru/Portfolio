'use client';

import { useRouter } from 'next/navigation';
import TextCard from '@/components/TextCard';

export default function MobilePlaceholder() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative min-h-screen pb-20 pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16">
          {/* Content */}
          <div>
            <TextCard>
              <div className="text-center">
                <h1 className="text-[24px] font-medium mb-4">
                  MOBILE VERSION IS COMING SOON
                </h1>
                <p className="text-[16px]">
                  Please check this project on desktop version
                </p>
              </div>
            </TextCard>
          </div>
        </div>
      </div>
    </main>
  );
} 