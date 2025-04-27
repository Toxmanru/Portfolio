'use client';

import NavCard from '@/components/NavCard';
import PicCard from '@/components/PicCard';
import TextCard from '@/components/TextCard';
import Button from '@/components/Button';
import DiamondIcon from '@/components/DiamondIcon';
import { useRouter } from 'next/navigation';

const project = {
  title: 'SBERHEALTH',
  category: 'MED-TECH B2C SERVICE',
  imageUrl: '/images/sberhealth-cover.jpg',
  content: {
    intro: {
      text: 'Redesigned digital medical<br />products catalog •<br /><br />Increased sales and average<br />order value •<br /><br />Improved user navigation<br />and cross sales •',
      image: '/images/sberhealth-hero.jpg'
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
                <div className="space-y-4 uppercase" dangerouslySetInnerHTML={{ __html: project.content.intro.text }} />
              </TextCard>
              <PicCard 
                imageUrl={project.content.intro.image} 
                variant="full" 
                className="h-full"
                isHero 
              />
            </div>

            {/* Second PicCard */}
            <PicCard 
              imageUrl="/images/sberhealth-catalog.jpg" 
              variant="full" 
            />

            {/* TextCard with description */}
            <TextCard>
              As the B2C product designer, I completely reimagined the direct sales catalog for digital medical products. The new system was designed to simplify navigation, highlight value, and guide users toward smarter purchasing decisions. As a result, the redesign drove an increase in both total sales and average order value.
            </TextCard>

            {/* Final PicCard */}
            <PicCard 
              imageUrl="/images/sberhealth-results.jpg" 
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