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
import { cn } from '@/lib/utils';

// Reusable Separator Component for consistency
const SectionSeparator = ({ className = '' }: { className?: string }) => (
  <Separator
    className={cn(
      "my-0 h-[1px] border-none bg-gradient-to-r from-transparent via-border/50 to-transparent", // Subtle border gradient
      className
    )}
  />
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Removed flex-grow from main, sections handle their own padding */}
      <main>
        <HeroSection />
        {/* No separator immediately after hero */}
        <ServicesSection />
        <SectionSeparator />
        <TechnologySection />
        <SectionSeparator className="via-accent/20" /> {/* Accent variation */}
        <BenefitsSection />
        <SectionSeparator />
        <AiAdvisorSection />
        <SectionSeparator className="via-accent/20" />
        <AboutUsSection />
        <SectionSeparator /> {/* Removed leading space */}
        <ClientsSection />
        <SectionSeparator className="via-primary/20" /> {/* Removed leading space, primary variation */}
        <ContactSection />
        {/* No separator immediately before footer */}
      </main>
      <Footer />
    </div>
  );
}

// cn function is already in lib/utils, so this local one can be removed if not used elsewhere in this file.
// If it is used, ensure it's the same as the one in lib/utils or imported.
// For this fix, assuming cn is globally available via import from "@/lib/utils"
// function cn(...inputs: (string | undefined | null | false)[]) {
//   return inputs.filter(Boolean).join(' ');
// }