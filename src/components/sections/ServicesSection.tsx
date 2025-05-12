
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ui/ServiceCard';
import { Blocks, BarChartBig, CreditCard, UserCog, ShieldCheck, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

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
      // Animate Title and Paragraph
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // Trigger earlier
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate Service Cards
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 50, scale: 0.98 }, // Start slightly scaled up
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7, // Slightly faster duration
            stagger: {
              amount: 0.4, // Total time for stagger
              from: "start", // Stagger from the first item
              ease: "power1.out"
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%', // Trigger cards slightly later than title
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"> {/* Adjusted heading sizes */}
            Comprehensive <span className="highlight-text-primary">API Solutions</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 md:mb-20"> {/* Increased bottom margin */}
            We provide a full suite of API integration services tailored to the iGaming industry, ensuring seamless operation and maximum performance.
          </p>
        </div>

        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
