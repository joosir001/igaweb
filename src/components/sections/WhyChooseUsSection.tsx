// src/components/sections/WhyChooseUsSection.tsx
"use client";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { BarChart, Zap, ShieldCheck, Users, BrainCircuit, Wrench, TrendingUp, Lightbulb } from "lucide-react";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    Icon: BrainCircuit,
    name: "Unmatched Expertise",
    description: "Decades of combined experience in iGaming and API technology.",
    href: "#contact",
    cta: "Learn More",
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
  },
  {
    Icon: Zap,
    name: "Cutting-Edge Tech",
    description: "Leveraging the latest advancements for speed, security, and scalability.",
    href: "#technology",
    cta: "Explore Tech",
    className: "md:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
  },
  {
    Icon: Users,
    name: "Dedicated Support",
    description: "24/7 expert support to ensure your operations run smoothly.",
    href: "#contact",
    cta: "Contact Support",
    className: "md:col-span-2",
     background: <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
  },
  {
    Icon: BarChart,
    name: "Proven Track Record",
    description: "Trusted by industry leaders to deliver reliable and high-performance solutions.",
    href: "#clients",
    cta: "See Our Clients",
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity"></div>,
  },
   {
    Icon: Lightbulb,
    name: "Innovative Solutions",
    description: "Continuously evolving our offerings to meet future iGaming demands.",
    href: "#ai-advisor",
    cta: "Discover AI",
    className: "md:col-span-3",
     background: <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>,
  },
];

export default function WhyChooseUsSection() {
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
      
      // Animate BentoGrid cards (children of gridRef)
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
    <section id="why-choose-us" className="bg-background/90 backdrop-blur-sm py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Why Partner with <AnimatedShinyText className="inline-block highlight-text-primary">iGamX</AnimatedShinyText>?
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            Discover the key advantages that make iGamX the preferred choice for iGaming API integration and platform solutions.
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
