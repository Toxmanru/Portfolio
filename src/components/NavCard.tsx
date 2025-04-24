'use client';

import { motion } from 'framer-motion';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';

interface NavCardProps {
  title: string;
  projectTitle?: string;
}

export default function NavCard({ title, projectTitle }: NavCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    // Если мы на странице проекта, переходим на страницу My Works
    if (pathname.startsWith('/work/')) {
      router.push('/work');
    } 
    // Если мы на странице My Works, Contacts или Consulting, переходим на главную
    else if (pathname === '/work' || pathname === '/contacts' || pathname === '/consulting') {
      router.push('/');
    }
  };

  return (
    <button 
      onClick={handleNavigation}
      className="block h-[104px] w-full rounded-[24px] bg-[rgba(221,221,221,0.6)] backdrop-blur-[10px] px-10"
    >
      <motion.div 
        className="h-full flex items-center relative"
        initial={false}
        whileHover="hover"
        variants={{
          hover: {
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }
        }}
      >
        <motion.h1 
          className="text-[32px] font-medium text-[#1C1C1C] absolute left-0"
          variants={{
            hover: {
              x: 68
            }
          }}
        >
          {projectTitle || title}
        </motion.h1>
        
        <motion.div
          className="absolute left-0 h-[40px]"
          initial={{ opacity: 0, x: -20 }}
          variants={{
            hover: {
              opacity: 1,
              x: 0
            }
          }}
        >
          <ArrowLongLeftIcon className="h-full w-auto text-[#1C1C1C]" />
        </motion.div>
      </motion.div>
    </button>
  );
} 