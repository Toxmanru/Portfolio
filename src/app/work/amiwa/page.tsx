'use client';

import NavCard from '@/components/NavCard';
import PicCard from '@/components/PicCard';
import TextCard from '@/components/TextCard';
import Button from '@/components/Button';
import DiamondIcon from '@/components/DiamondIcon';
import { useRouter } from 'next/navigation';

const project = {
  title: 'AMIWA',
  category: 'NEW PROJECT',
  imageUrl: '/images/amiwa-cover.jpg',
  content: {
    intro: {
      text: 'Project in development •<br /><br />More details coming soon •<br /><br />Stay tuned for updates •',
      image: '/images/amiwa-hero.jpg'
    }
  }
};

export default function ProjectPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="relative min-h-screen pb-20 pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-16">
          {/* Navigation Card */}
          <NavCard title="BACK TO WORKS" projectTitle={project.title} />

          {/* Content */}
          <div className="mt-4 space-y-4">
            {/* Intro block */}
            <div className="grid grid-cols-2 gap-4">
              <TextCard variant="wide" className="!bg-[#1C1C1C] text-[#FFFFFF]">
                <div className="absolute top-10 left-10">
                  <DiamondIcon />
                </div>
                <div className="space-y-4 uppercase">
                  <div>visit amiwa.app from mobile •</div>
                  <div>vibe-coding solo project •</div>
                  <div>From plans to path — all in one place •</div>
                </div>
              </TextCard>
              <PicCard 
                imageUrl="/images/amiwa-hero.jpg" 
                variant="full" 
                className="h-full"
                isHero 
              />
            </div>

            {/* Text block */}
            <TextCard>
              <div>
                Amiwa™ is a travel companion designed for the journey itself — not just the memories after. It keeps your plans, tickets, locations, notes, and links all in one clean, accessible space, so you can stay organized without losing the flow of your trip. Built solo with the help of AI, Amiwa™ is focused on simplicity, privacy, and the feeling of being fully present on the road.
              </div>
            </TextCard>

            {/* Image block 1 */}
            <PicCard 
              imageUrl="/images/amiwa-screens-1.jpg" 
              variant="full" 
            />

            {/* Image block 2 */}
            <PicCard 
              imageUrl="/images/amiwa-screens-2.jpg" 
              variant="full" 
            />

            {/* Back Button */}
            <div className="mt-[88px] flex justify-center">
              <Button 
                label="BACK TO WORKS" 
                onClick={() => router.push('/work')} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 