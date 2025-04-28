'use client';

import NavCard from '@/components/NavCard';
import PicCard from '@/components/PicCard';
import TextCard from '@/components/TextCard';
import Button from '@/components/Button';
import DiamondIcon from '@/components/DiamondIcon';
import { useRouter } from 'next/navigation';

interface Section {
  type: 'text' | 'image';
  content?: string;
  imageUrl?: string;
}

interface ProjectContent {
  intro: {
    text: string;
    image: string;
  };
  sections: Section[];
}

const project = {
  title: 'BALANCY',
  category: 'AI-BASED NUTRITION TRACKER',
  imageUrl: '/images/balancy-app-cover.jpg',
  content: {
    intro: {
      text: 'Vibe-code project with cursor •\n\nIntegrated Open-AI API to track nutrition •\n\nHandled full-cycle production independently •',
      image: '/images/balancy-app-hero.gif'
    },
    sections: [
      {
        type: 'text',
        content: 'Используя передовые технологии машинного обучения, Balancy помогает пользователям достигать их целей в питании и здоровом образе жизни.'
      },
      {
        type: 'image',
        imageUrl: '/images/balancy-app-screens-1.jpg'
      },
      {
        type: 'text',
        content: 'Мы разработали систему уведомлений, которая помогает пользователям отслеживать важные даты и события, связанные с их страховыми полисами.'
      },
      {
        type: 'image',
        imageUrl: '/images/balancy-app-screens-2.jpg'
      },
      {
        type: 'text',
        content: 'Интегрированная система оплаты позволяет пользователям легко и безопасно оплачивать страховые взносы прямо в приложении.'
      },
      {
        type: 'image',
        imageUrl: '/images/balancy-app-screens-3.jpg'
      }
    ]
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
                  <div>Vibe-code project with cursor •</div>
                  <div>Integrated Open-AI API<br />to track nutrition •</div>
                  <div>Handled full-cycle production independently •</div>
                </div>
              </TextCard>
              <PicCard 
                imageUrl={project.content.intro.image} 
                variant="full" 
                className="h-full"
                isHero 
              />
            </div>

            {/* Text block */}
            <TextCard>
              <div>
                I created this project to solve a personal problem: existing nutrition trackers felt overly complex for people simply trying to build a healthy habit. My approach was to simplify the interface to the absolute essentials and integrate OpenAI technology to handle all tracking and calculations seamlessly in the background.
              </div>
            </TextCard>

            {/* Two square PicCards */}
            <div className="grid grid-cols-2 gap-4">
              <PicCard imageUrl="/images/balancy-app-screens-1.jpg" variant="half" />
              <PicCard imageUrl="/images/balancy-app-screens-2.jpg" variant="half" />
            </div>

            {/* Additional Text block */}
            <TextCard>
              <div>
                To develop the product independently, I relied on AI as well. I designed and built the entire app solo using Cursor, with no external team. The current version is an MVP, fully functional and undergoing testing in TestFlight. It serves as a foundation for future development, with new features and improvements already in the pipeline.
              </div>
            </TextCard>

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