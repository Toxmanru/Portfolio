'use client';

import BackgroundSvg from '@/components/BackgroundSvg';
import NavCard from '@/components/NavCard';
import ProjectCard from '@/components/ProjectCard';

export default function WorkPage() {
  const projects = [
    {
      title: 'AMIWA',
      category: 'TRAVEL COMPANION',
      imageUrl: '/images/amiwa-cover.jpg',
      projectId: 'amiwa'
    },
    {
      title: 'QIC APP',
      category: 'ECOSYSTEM HUB',
      imageUrl: '/images/qic-app-cover.jpg',
      projectId: 'qic-app'
    },
    {
      title: 'BALANCY',
      category: 'AI-BASED\nNUTRITION TRACKER',
      imageUrl: '/images/balancy-app-cover.jpg',
      projectId: 'balancy'
    },
    {
      title: 'TEAM LEADERSHIP',
      category: 'DESIGN PROCESS',
      imageUrl: '/images/leadership-cover.jpg',
      projectId: 'leadership'
    },
    {
      title: 'SBERHEALTH',
      category: 'MED-TECH B2C SERVICE',
      imageUrl: '/images/sberhealth-cover.jpg',
      projectId: 'sberhealth'
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <BackgroundSvg />
      
      {/* Header */}
      <div className="relative min-h-screen pb-20 pt-[64px] md:pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-16">
          {/* Navigation Card */}
          <div className="hidden md:block">
            <NavCard title="MY WORKS" />
          </div>

          {/* Projects Grid */}
          <div className="md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.projectId}
                imageUrl={project.imageUrl}
                category={project.category}
                title={project.title}
                projectId={project.projectId}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 