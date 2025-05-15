// src/components/sections/ServicesSection.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ui/ServiceCard';
import { Blocks, BarChartBig, CreditCard, UserCog, ShieldCheck, Handshake } from 'lucide-react';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { AnimatedList } from '@/components/magicui/animated-list';
import { useScopedI18n } from '@/i18n/client'; // Changed to client hook

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const t = useScopedI18n('services_section'); // Use client hook

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const animatedListRef = useRef<HTMLDivElement>(null); // Ref for AnimatedList container

  const services = [
    {
      id: 'service-casino',
      icon: Blocks,
      title: t('casino_aggregation.title'),
      description: t('casino_aggregation.description'),
    },
    {
      id: 'service-sportsbook',
      icon: BarChartBig,
      title: t('sportsbook_integration.title'),
      description: t('sportsbook_integration.description'),
    },
    {
      id: 'service-payment',
      icon: CreditCard,
      title: t('payment_gateway.title'),
      description: t('payment_gateway.description'),
    },
    {
      id: 'service-pam',
      icon: UserCog,
      title: t('pam.title'),
      description: t('pam.description'),
    },
    {
      id: 'service-kyc',
      icon: ShieldCheck,
      title: t('kyc_aml.title'),
      description: t('kyc_aml.description'),
    },
    {
      id: 'service-affiliate',
      icon: Handshake,
      title: t('affiliate_systems.title'),
      description: t('affiliate_systems.description'),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and paragraph
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 50, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate AnimatedList container (if needed, or let AnimatedList handle its children)
      if (animatedListRef.current) {
        gsap.fromTo(
          animatedListRef.current, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: animatedListRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3, // Delay after title/paragraph
          }
        );
      }
      // Note: AnimatedList itself handles stagger animation for its children (ServiceCard -> AnimatedListItem)
      // So, direct GSAP on animatedListRef.current.children might conflict or be redundant
      // unless you want a different container-level animation.

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-gradient-to-b from-background via-background/90 to-secondary/15 py-24 md:py-32 dark:from-background dark:via-background/80 dark:to-primary/10" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
             <AnimatedShinyText className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-foreground dark:from-primary dark:via-accent dark:to-primary-foreground">
               {t('title_prefix')} {t('title_highlight')}
            </AnimatedShinyText>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-28">
            {t('subheading')}
          </p>
        </div>
        <div ref={animatedListRef}>
          <AnimatedList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" animationType="fadeIn" delay={0.1}>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id} 
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </AnimatedList>
        </div>
      </div>
    </section>
  );
}
