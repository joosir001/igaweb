// src/components/sections/ServicesSection.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ui/ServiceCard';
import { Blocks, BarChartBig, CreditCard, UserCog, ShieldCheck, Handshake } from 'lucide-react';
import { motion } from 'framer-motion'; // Keep for section title animation if needed

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Blocks,
    title: 'Casino Game Aggregation',
    description: 'Integrate a vast portfolio of casino games from top providers. Slots, live dealer, table games, and more.',
  },
  {
    icon: BarChartBig,
    title: 'Sportsbook Integration',
    description: 'Access comprehensive sports betting solutions with wide market coverage, real-time data feeds, and odds management.',
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway Integration',
    description: 'Secure and seamless payment processing with support for multiple methods, currencies, and fraud prevention.',
  },
  {
    icon: UserCog,
    title: 'Player Account Management (PAM)',
    description: 'Robust platform API for player registration, wallet management, bonus engines, and detailed reporting.',
  },
  {
    icon: ShieldCheck,
    title: 'KYC/AML Solutions',
    description: 'Ensure compliance with integrated Know Your Customer and Anti-Money Laundering verification services.',
  },
  {
    icon: Handshake,
    title: 'Affiliate & Agent Systems',
    description: 'Powerful tools to manage affiliate marketing programs and agent networks, driving player acquisition.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef); // Scope GSAP animations to this section

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <section id="services" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div // Keep Framer Motion for title if desired, or convert to GSAP
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Comprehensive <span className="neon-text-primary">API Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 md:mb-16">
            We provide a full suite of API integration services tailored to the iGaming industry, ensuring seamless operation and maximum performance.
          </p>
        </motion.div>
        
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            // ServiceCard will have its own hover effects (Framer Motion), GSAP handles entrance
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              // index prop removed as GSAP handles staggering from parent
            />
          ))}
        </div>
      </div>
    </section>
  );
}
