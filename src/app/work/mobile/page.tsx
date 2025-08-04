'use client';

import { useRouter } from 'next/navigation';
import TextCard from '@/components/TextCard';
import TriangleIcon from '@/components/TriangleIcon';

export default function MobilePlaceholder() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative min-h-screen pb-20 pt-[104px] z-10 flex items-center justify-center">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16 h-full flex items-center justify-center">
          {/* Content */}
          <div>
            <TextCard className="p-8 md:p-16">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <TriangleIcon />
                </div>
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