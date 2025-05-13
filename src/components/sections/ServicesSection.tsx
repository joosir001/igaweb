// src/components/sections/ServicesSection.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ui/ServiceCard';
import { Blocks, BarChartBig, CreditCard, UserCog, ShieldCheck, Handshake } from 'lucide-react';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text'; // Import AnimatedShinyText

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
      
      if (paragraphRef.current) {
         gsap.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2, 
          }
        );
      }


      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 60, scale: 0.95, filter: "blur(3px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: {
              amount: 0.5,
              from: "start",
              ease: "power2.out"
            },
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-background py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
             <AnimatedShinyText className="inline-block">Comprehensive API Solutions</AnimatedShinyText>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            We provide a full suite of API integration services tailored to the iGaming industry, ensuring seamless operation and maximum performance.
          </p>
        </div>

        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
