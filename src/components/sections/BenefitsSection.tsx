// src/components/sections/BenefitsSection.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView, animate } from 'framer-motion';
import { TrendingUp, Zap, ShieldCheck, Users, Clock, DollarSign } from 'lucide-react';
import { AnimatedList, AnimatedListItem } from "@/components/magicui/animated-list"; // Import AnimatedList

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  id: string; // Add id for key prop
}

const benefits: Benefit[] = [
  {
    id: 'benefit-time-to-market',
    icon: Clock,
    title: 'Faster Time-to-Market',
    description: 'Launch your platform or new features quickly with our rapid integration solutions.',
  },
  {
    id: 'benefit-reduced-costs',
    icon: DollarSign,
    title: 'Reduced Development Costs',
    description: 'Save on extensive development efforts and resources by leveraging our pre-built integrations.',
  },
  {
    id: 'benefit-best-content',
    icon: TrendingUp,
    title: 'Access to Best-in-Class Content',
    description: 'Offer your players a vast library of top-tier games and betting markets from leading providers.',
  },
  {
    id: 'benefit-player-experience',
    icon: Users,
    title: 'Enhanced Player Experience',
    description: 'Provide a seamless, engaging, and reliable gaming experience that keeps players coming back.',
  },
  {
    id: 'benefit-scalable-growth',
    icon: Zap,
    title: 'Scalable Growth',
    description: 'Our robust infrastructure supports your growth, handling increasing player volume and transactions effortlessly.',
  },
  {
    id: 'benefit-security-compliance',
    icon: ShieldCheck,
    title: 'Uncompromised Security & Compliance',
    description: 'Benefit from top-tier security measures and built-in compliance tools for peace of mind.',
  },
];

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, duration = 2.5, suffix = "", prefix = "", className, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(parseFloat(value.toFixed(decimals))),
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration, decimals]);

  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={ref} className={className}>{prefix}{formattedCount}{suffix}</span>;
};


const stats = [
  { value: 5000, suffix: "+", label: "Games Integrated", decimals: 0 },
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
  { value: 24, prefix:"", suffix: "/7", label: "Support", decimals: 0 },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 50, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2, // Enhanced duration
          stagger: 0.25, // Enhanced stagger
          ease: 'power4.out', // Smoother ease
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // Trigger slightly earlier
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // GSAP for stats cards, as AnimatedList is for the benefits
      if (statsGridRef.current) {
        gsap.fromTo(
          statsGridRef.current.children,
          { opacity: 0, y: 60, filter: "blur(6px)", scale: 0.9 }, // More pronounced start
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.3, // Enhanced duration
            stagger: 0.25, // Enhanced stagger
            ease: 'expo.out',
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 85%', // Trigger slightly later
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.4, // Delay after title/paragraph
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="benefits" className="bg-gradient-to-b from-background via-background/95 to-secondary/10 py-24 md:py-32 dark:from-background dark:via-background/90 dark:to-primary/5" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Unlock Your <span className="highlight-text-primary">Platform's Potential</span>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            Partnering with iGamX brings tangible benefits to your iGaming business, accelerating growth and enhancing operational efficiency.
          </p>
        </div>

        <AnimatedList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 md:mb-24" animationType="slideIn" delay={0.3}>
          {benefits.map((benefit) => (
            <AnimatedListItem
              key={benefit.id}
              className="bg-card/70 dark:bg-card/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-border/30 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 ease-out h-full flex flex-col group"
            >
              <div className="flex items-center mb-5">
                <motion.div 
                  className="p-3.5 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/25 dark:to-primary/15 rounded-full mr-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed flex-grow">{benefit.description}</p>
               <div className="mt-4 h-1 w-1/4 bg-primary/40 rounded-full group-hover:w-3/4 transition-all duration-400 ease-out"></div>
            </AnimatedListItem>
          ))}
        </AnimatedList >

        <div ref={statsGridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 bg-gradient-to-br from-card to-card/70 dark:from-card/90 dark:to-card/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-border/20 hover:border-accent/40 transition-all duration-300 hover:scale-[1.03]"
            >
              <AnimatedCounter
                to={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals}
                className="block text-5xl md:text-6xl font-bold highlight-text-accent mb-3"
              />
              <p className="text-base text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
