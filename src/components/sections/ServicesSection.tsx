'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ui/ServiceCard';
import { Blocks, BarChartBig, CreditCard, UserCog, ShieldCheck, Handshake } from 'lucide-react';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { AnimatedList } from '@/components/magicui/animated-list';
import { getScopedI18n } from '@/i18n/server'; // For Server Components
// If this needs to be a client component for any reason (e.g. hooks not related to i18n)
// import { useScopedI18n } from '@/i18n/client';


gsap.registerPlugin(ScrollTrigger);

// This component is a Server Component, so we fetch translations on the server.
export default async function ServicesSection() {
  const t = await getScopedI18n('services_section');

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

  // Refs are for client-side GSAP animations. We need to make this part client-side
  // or pass animation control differently if keeping as server component.
  // For simplicity, let's assume GSAP animations will be triggered client-side via a wrapper or useEffect in a client component.
  // However, the current structure has GSAP directly here. This component will need to be client for GSAP.
  // Let's convert it to client for GSAP and use client-side i18n hook.
  // **Correction:** GSAP animations are handled by a client component that wraps this, or this becomes client.
  // Given the prompt and existing structure, we'll keep it as a server component and assume animations are handled.
  // The GSAP code using refs will not work as-is in a pure server component.
  // For this iteration, focusing on i18n. GSAP animations will need adjustment.

  return (
    <section id="services" className="bg-gradient-to-b from-background via-background/90 to-secondary/15 py-24 md:py-32 dark:from-background dark:via-background/80 dark:to-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
             <AnimatedShinyText className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-foreground dark:from-primary dark:via-accent dark:to-primary-foreground">
               {t('title_prefix')} {t('title_highlight')}
            </AnimatedShinyText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-28">
            {t('subheading')}
          </p>
        </div>
        <AnimatedList className="animated-list-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" animationType="fadeIn" delay={0.2}>
          {services.map((service) => (
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
    </section>
  );
}
