import Header from '@/components/ui/Header';
import HeroSection from '@/components/sections/HeroSection';
import TaglineSection from '@/components/sections/TaglineSection';
import WorkSection from '@/components/sections/WorkSection';
import PublicTalksSection from '@/components/sections/PublicTalksSection';
import ContactsSection from '@/components/sections/ContactsSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main 
      className="relative min-h-screen bg-[#020202]"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <Header />
      <HeroSection />
      <TaglineSection />
      <div id="works" className="relative" style={{ zIndex: 10 }}>
        <WorkSection />
      </div>
      <PublicTalksSection />
      <ContactsSection />
      <Footer />
    </main>
  );
}
