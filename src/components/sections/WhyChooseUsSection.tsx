'use client';
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { BarChart, Zap, ShieldCheck, Users, BrainCircuit, Lightbulb } from "lucide-react";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { useScopedI18n } from '@/i18n/client';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUsSection() {
  const t = useScopedI18n('why_choose_us_section');

  const features = [
    {
      Icon: BrainCircuit,
      name: t('unmatched_expertise.name'),
      description: t('unmatched_expertise.description'),
      href: "#contact",
      cta: t('unmatched_expertise.cta'),
      className: "md:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
    },
    {
      Icon: Zap,
      name: t('cutting_edge_tech.name'),
      description: t('cutting_edge_tech.description'),
      href: "#technology",
      cta: t('cutting_edge_tech.cta'),
      className: "md:col-span-2",
      background: <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
    },
    {
      Icon: Users,
      name: t('dedicated_support.name'),
      description: t('dedicated_support.description'),
      href: "#contact",
      cta: t('dedicated_support.cta'),
      className: "md:col-span-2",
       background: <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
    },
    {
      Icon: BarChart,
      name: t('proven_track_record.name'),
      description: t('proven_track_record.description'),
      href: "#clients",
      cta: t('proven_track_record.cta'),
      className: "md:col-span-1",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity"></div>,
    },
     {
      Icon: Lightbulb,
      name: t('innovative_solutions.name'),
      description: t('innovative_solutions.description'),
      href: "#ai-advisor",
      cta: t('innovative_solutions.cta'),
      className: "md:col-span-3",
       background: <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
    },
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 50, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
      
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
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
    <section id="why-choose-us" className="bg-gradient-to-br from-background via-background/95 to-secondary/10 dark:from-background dark:via-background/90 dark:to-primary/5 py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('title_prefix')} <AnimatedShinyText className="inline-block highlight-text-primary">{t('title_highlight')}</AnimatedShinyText>{t('title_suffix')}
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            {t('subheading')}
          </p>
        </div>
        <div ref={gridRef}>
          <BentoGrid className="md:auto-rows-[20rem]">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
