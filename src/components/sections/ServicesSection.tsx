// src/components/sections/ServicesSection.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ui/ServiceCard';
import { Blocks, BarChartBig, CreditCard, UserCog, ShieldCheck, Handshake } from 'lucide-react';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { AnimatedList } from '@/components/magicui/animated-list'; // Import AnimatedList

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'service-casino',
    icon: Blocks,
    title: 'Casino Game Aggregation',
    description: 'Integrate a vast portfolio of casino games from top providers. Slots, live dealer, table games, and more.',
  },
  {
    id: 'service-sportsbook',
    icon: BarChartBig,
    title: 'Sportsbook Integration',
    description: 'Access comprehensive sports betting solutions with wide market coverage, real-time data feeds, and odds management.',
  },
  {
    id: 'service-payment',
    icon: CreditCard,
    title: 'Payment Gateway Integration',
    description: 'Secure and seamless payment processing with support for multiple methods, currencies, and fraud prevention.',
  },
  {
    id: 'service-pam',
    icon: UserCog,
    title: 'Player Account Management (PAM)',
    description: 'Robust platform API for player registration, wallet management, bonus engines, and detailed reporting.',
  },
  {
    id: 'service-kyc',
    icon: ShieldCheck,
    title: 'KYC/AML Solutions',
    description: 'Ensure compliance with integrated Know Your Customer and Anti-Money Laundering verification services.',
  },
  {
    id: 'service-affiliate',
    icon: Handshake,
    title: 'Affiliate & Agent Systems',
    description: 'Powerful tools to manage affiliate marketing programs and agent networks, driving player acquisition.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60, filter: "blur(8px)" }, // Enhanced starting values
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2, // Longer duration
            ease: 'expo.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 88%', // Adjusted trigger
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
      
      if (paragraphRef.current) {
         gsap.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 50, scale: 0.95 }, // Added scale
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2, // Longer duration
            ease: 'power4.out', // Smoother ease
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 85%', // Adjusted trigger
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.25, // Increased delay
          }
        );
      }
      // GSAP for AnimatedList container itself can be added if needed,
      // but individual items are animated by AnimatedList component.
      // For example, fading in the entire grid:
      const animatedListContainer = sectionRef.current?.querySelector('.animated-list-grid');
      if (animatedListContainer) {
        gsap.fromTo(
          animatedListContainer,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: animatedListContainer,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.4, // Delay after paragraph
          }
        );
      }


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-gradient-to-b from-background via-background/90 to-secondary/15 py-24 md:py-32 dark:from-background dark:via-background/80 dark:to-primary/10" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight"> {/* Increased font weight and margin */}
             <AnimatedShinyText className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-foreground dark:from-primary dark:via-accent dark:to-primary-foreground">Comprehensive API Solutions</AnimatedShinyText>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-28"> {/* Increased margin */}
            We provide a full suite of API integration services tailored to the iGaming industry, ensuring seamless operation and maximum performance.
          </p>
        </div>

        {/* Add a class for GSAP targeting if needed */}
        <AnimatedList className="animated-list-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" animationType="fadeIn" delay={0.2}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id} // Pass id to ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}
