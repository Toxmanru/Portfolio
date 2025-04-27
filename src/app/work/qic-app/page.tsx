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
  imageUrl: string;
}

interface ProjectContent {
  intro: {
    text: string;
    image: string;
  };
  sections: Section[];
}

const project = {
  title: 'QIC APP',
  category: 'INSURANCE APP',
  imageUrl: '/images/qic-app-cover.jpg',
  content: {
    intro: {
      text: 'Largest Insur-Tech application  in the MENA region • \n\n\nMobile App of the Year in Qatar  at the Insurance Asia Awards 2024  • \n\n\nBest Car Insurance Mobile App   in Qatar at the Global Brands  Magazine Awards 2024   • ',
      image: '/images/qic-app-hero.jpg'
    },
    sections: [
      {
        type: 'text',
        content: "I took over design leadership shortly after its initial release, when it existed as a mono-functional application designed for drivers. At that stage,  my design team stepped in to reimagine its potential — initiating the transformation toward a full-scale, ecosystem-based super app."
      },
      {
        type: 'image',
        imageUrl: '/images/qic-app-screens-1.jpg'
      },
      {
        type: 'text',
        content: "With my vision and concept, our team transformed the product into an ecosystem app — expanding far beyond its original scope to cover diverse aspects of users' daily lives. We developed a clear design strategy to implement this shift gradually, introducing the new functionality through a series of seamless, user-centered iterations. Each phase built on the previous one, ensuring a smooth transition without disrupting the existing user base."
      },
      {
        type: 'image',
        imageUrl: '/images/qic-app-screens-2.jpg'
      },
      {
        type: 'text',
        content: "To address the challenge of an increasingly broad feature set, we introduced an interface concept built around interconnected hubs. This modular approach allowed us to develop the product along several parallel tracks—each tailored to a specific area of user needs. It also simplified the overall experience by providing clear entry points for different user groups, making the ecosystem feel intuitive and navigable despite its growing complexity."
      },
      {
        type: 'image',
        imageUrl: '/images/qic-app-screens-3.jpg'
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
                <div className="absolute top-10 left-10 max-[1024px]:hidden">
                  <DiamondIcon />
                </div>
                <div className="space-y-4 uppercase">
                  <div>Largest Insur-Tech application<br />in the MENA •</div>
                  <div>Mobile App of the Year at<br />the Insurance Asia Awards 2024 •</div>
                  <div>Best Car Insurance Mobile App<br />at the Global Brands Magazine Awards 2024 •</div>
                </div>
              </TextCard>
              <PicCard 
                imageUrl={project.content.intro.image} 
                variant="full" 
                className="h-full"
                isHero 
              />
            </div>

            {/* Content sections */}
            {project.content.sections.map((section, index) => (
              section.type === 'text' ? (
                <TextCard key={index}>
                  {section.content}
                </TextCard>
              ) : (
                <PicCard key={index} imageUrl={section.imageUrl || ''} variant="full" />
              )
            ))}

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