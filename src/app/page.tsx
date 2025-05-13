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
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'; // Import new section
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Reusable Separator Component for consistency
const SectionSeparator = ({ className = '' }: { className?: string }) => (
  <Separator
    className={cn(
      "my-0 h-[1px] border-none bg-gradient-to-r from-transparent via-border/30 to-transparent dark:via-border/20", 
      className
    )}
  />
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        {/* No separator immediately after hero */}
        <ServicesSection />
        <SectionSeparator />
        <WhyChooseUsSection /> {/* Add new section */}
        <SectionSeparator className="dark:via-accent/15 via-accent/25" />
        <TechnologySection />
        <SectionSeparator className="dark:via-primary/15 via-primary/25" /> 
        <BenefitsSection />
        <SectionSeparator />
        <AiAdvisorSection />
        <SectionSeparator className="dark:via-accent/15 via-accent/25" />
        <AboutUsSection />
        <SectionSeparator /> 
        <ClientsSection />
        <SectionSeparator className="dark:via-primary/15 via-primary/25" /> 
        <ContactSection />
        {/* No separator immediately before footer */}
      </main>
      <Footer />
    </div>
  );
}
