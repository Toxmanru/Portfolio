'use client';

import NavCard from '@/components/NavCard';
import PicCard from '@/components/PicCard';
import TextCard from '@/components/TextCard';
import Button from '@/components/Button';
import DiamondIcon from '@/components/DiamondIcon';
import { useRouter } from 'next/navigation';

const project = {
  title: 'DESIGN PROCESSES',
  category: 'TEAM LEADERSHIP',
  imageUrl: '/images/leadership-cover.jpg',
  content: {
    intro: {
      text: 'Joined the team at the earliest stage •\n\nBuilt design function from the ground up •\n\nEstablished cross-platform design system •',
      image: '/images/leadership-hero.jpg'
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
                <div className="absolute top-10 left-10 max-[1150px]:hidden">
                  <DiamondIcon />
                </div>
                <div className="space-y-4 uppercase">
                  <div>Built the design team and processes from scratch •</div>
                  <div>Scaled to lead a cross-platform design team •</div>
                  <div>Redesigned the MVP into a full-scale product with the team •</div>
                </div>
              </TextCard>
              <PicCard 
                imageUrl={project.content.intro.image} 
                variant="full" 
                className="h-full"
                isHero 
              />
            </div>

            {/* Two TextCards */}
            <div className="grid grid-cols-2 gap-4 items-stretch h-full">
              <div className="h-full">
                <TextCard className="h-full">
                  <div className="h-full">
                    I joined QIC team at the earliest stage and built the Mobile design team from the ground up. I set up core design processes, established smooth collaboration between designers, developers, and analysts, and created a workflow that balanced speed and quality. My focus was on building a sustainable design culture that could scale as the product grew.
                  </div>
                </TextCard>
              </div>
              <div className="h-full">
                <TextCard className="h-full">
                  <div className="h-full">
                    As the next step, I transitioned to leading a cross-platform team—shifting from a single-platform focus to a unified approach across all company products. This move allowed us to drive design consistency, improve user experience across platforms, and create a shared language and system that connected separate teams and product lines.
                  </div>
                </TextCard>
              </div>
            </div>

            {/* Full width PicCard */}
            <PicCard imageUrl="/images/leadership-process.jpg" variant="full" />

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