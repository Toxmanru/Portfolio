'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NavCard from '@/components/NavCard'
import PicCard from '@/components/PicCard'
import TextCard from '@/components/TextCard'
import Button from '@/components/Button'
import DiamondIcon from '@/components/DiamondIcon'
import BackgroundSvg from '@/components/BackgroundSvg'

interface Project {
  title: string
  category: string
  imageUrl: string
  content: {
    intro: {
      text: string
      image: string
    }
    sections: Array<{
      title: string
      text: string
      image: string
    }>
  }
}

const projects: Record<string, Project> = {
  'qic-app': {
    title: 'QIC APP',
    category: 'Mobile App',
    imageUrl: '/images/qic-app-cover.jpg',
    content: {
      intro: {
        text: 'QIC APP — это мобильное приложение для управления качеством в строительстве. Приложение позволяет контролировать процесс строительства, документировать этапы работ и обеспечивать соответствие стандартам качества. Mobile App of the Year at<br />the Insurance Asia Awards 2024',
        image: '/images/qic-app-intro.jpg'
      },
      sections: [
        {
          title: 'Процесс разработки',
          text: 'Разработка велась с использованием React Native, что позволило создать кроссплатформенное приложение для iOS и Android. Основной фокус был направлен на создание интуитивно понятного интерфейса и обеспечение стабильной работы приложения в условиях слабого интернет-соединения.',
          image: '/images/qic-app-process.jpg'
        },
        {
          title: 'Результаты',
          text: 'Внедрение приложения позволило сократить время на проверку качества строительства на 40%, уменьшить количество ошибок в документации на 60% и повысить удовлетворенность клиентов на 35%.',
          image: '/images/qic-app-results.jpg'
        }
      ]
    }
  },
  'balancy': {
    title: 'BALANCY',
    category: 'Web App',
    imageUrl: '/images/balancy-cover.jpg',
    content: {
      intro: {
        text: 'BALANCY — это веб-приложение для управления личными финансами. Позволяет отслеживать доходы и расходы, планировать бюджет и анализировать финансовые привычки.',
        image: '/images/balancy-intro.jpg'
      },
      sections: [
        {
          title: 'Особенности',
          text: 'Приложение включает в себя систему категоризации расходов, визуализацию данных через графики и диаграммы, а также возможность установки финансовых целей и отслеживания прогресса их достижения.',
          image: '/images/balancy-features.jpg'
        },
        {
          title: 'Технологии',
          text: 'Разработка велась на React с использованием TypeScript. Для хранения данных используется Firebase, что обеспечивает надежность и безопасность пользовательской информации.',
          image: '/images/balancy-tech.jpg'
        }
      ]
    }
  },
  'leadership': {
    title: 'TEAM LEADERSHIP',
    category: 'Leadership',
    imageUrl: '/images/leadership-cover.jpg',
    content: {
      intro: {
        text: 'Опыт управления командой разработчиков и организации процессов разработки.',
        image: '/images/leadership-intro.jpg'
      },
      sections: []
    }
  },
  'sberhealth': {
    title: 'SBERHEALTH',
    category: 'Med-Tech',
    imageUrl: '/images/sberhealth-cover.jpg',
    content: {
      intro: {
        text: 'Медицинский сервис для пациентов и врачей.',
        image: '/images/sberhealth-intro.jpg'
      },
      sections: []
    }
  }
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = projects[params.projectId]
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    // Функция обновления состояния
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(!e.matches);
    };

    // Проверяем сразу
    handleChange(mediaQuery);

    // Добавляем слушатель
    mediaQuery.addEventListener('change', handleChange);

    // Очищаем слушатель при размонтировании
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (!project) {
    notFound()
  }

  if (isMobile) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-white">
        <BackgroundSvg />
        <div className="relative min-h-screen pb-20 pt-[64px] z-10">
          <div className="max-w-[1920px] mx-auto px-4 h-[calc(100vh-184px)]">
            <div className="h-full">
              <div className="w-full rounded-[16px] flex items-center justify-center p-6 text-[#1C1C1C] card left-card h-full text-center" style={{ backgroundColor: 'rgba(221, 221, 221, 0.6)' }}>
                <h1 className="text-[32px] font-medium leading-[100%]">
                  PLEASE CHECK IT<br />ON DESKTOP
                </h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative min-h-screen pb-20 pt-[104px] z-10">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
          {/* Navigation Card */}
          <div className="hidden md:block">
            <NavCard title="BACK TO WORKS" projectTitle={project.title} />
          </div>

          {/* Content */}
          <div className="mt-4 space-y-4">
            {/* Intro block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
            </div>

            {/* Sections */}
            {project.content.sections.map((section, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextCard
                  title={section.title}
                  text={section.text}
                />
                <PicCard
                  imageUrl={section.image}
                  variant="full"
                />
              </div>
            ))}

            {/* Back Button */}
            <div className="mt-16 flex justify-center">
              <Button onClick={() => router.back()}>
                BACK TO WORKS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 