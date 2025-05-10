
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TechnologySection from '@/components/sections/TechnologySection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import AboutUsSection from '@/components/sections/AboutUsSection';
import ClientsSection from '@/components/sections/ClientsSection';
import AiAdvisorSection from '@/components/sections/AiAdvisorSection';
import ContactSection from '@/components/sections/ContactSection';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-[2px] border-none" />
        <ServicesSection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent h-[2px] border-none" />
        <TechnologySection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-[2px] border-none" />
        <BenefitsSection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent h-[2px] border-none" />
        <AiAdvisorSection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-[2px] border-none" />
        <AboutUsSection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent h-[2px] border-none" />
        <ClientsSection />
        <Separator className="my-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-[2px] border-none" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
