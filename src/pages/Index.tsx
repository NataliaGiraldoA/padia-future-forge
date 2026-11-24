import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ActivitiesSection } from '@/components/ActivitiesSection';
import { MembersSection } from '@/components/MembersSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F3F3F1]">
      {/* Retícula arquitectónica de datos (120px) y atmósfera de estudio en todo el sitio */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 arch-data-grid [mask-image:radial-gradient(ellipse_90%_85%_at_50%_40%,black_40%,transparent_100%)]" />
        <div className="absolute -left-[12%] top-[8%] h-[560px] w-[560px] rounded-full bg-orange-500/[0.07] blur-[150px]" />
        <div className="absolute -right-[12%] top-[44%] h-[560px] w-[560px] rounded-full bg-amber-500/[0.06] blur-[150px]" />
        <div className="absolute -left-[10%] bottom-[6%] h-[520px] w-[520px] rounded-full bg-orange-500/[0.06] blur-[150px]" />
        <div className="mx-auto h-full w-[92%] max-w-[2200px] border-x border-slate-900/[0.04]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <MembersSection />
        <ProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
