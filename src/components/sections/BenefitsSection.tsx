'use client'; // BenefitsSection uses client-side hooks (useInView) and GSAP animations

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView, animate } from 'framer-motion';
import { TrendingUp, Zap, ShieldCheck, Users, Clock, DollarSign } from 'lucide-react';
import { AnimatedList, AnimatedListItem } from "@/components/magicui/animated-list";
import { useScopedI18n } from '@/i18n/client'; // Use client hook

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  id: string;
}

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

export default function BenefitsSection() {
  const t = useScopedI18n('benefits_section');
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const benefits: Benefit[] = [
    {
      id: 'benefit-time-to-market',
      icon: Clock,
      title: t('time_to_market.title'),
      description: t('time_to_market.description'),
    },
    {
      id: 'benefit-reduced-costs',
      icon: DollarSign,
      title: t('reduced_costs.title'),
      description: t('reduced_costs.description'),
    },
    {
      id: 'benefit-best-content',
      icon: TrendingUp,
      title: t('best_content.title'),
      description: t('best_content.description'),
    },
    {
      id: 'benefit-player-experience',
      icon: Users,
      title: t('player_experience.title'),
      description: t('player_experience.description'),
    },
    {
      id: 'benefit-scalable-growth',
      icon: Zap,
      title: t('scalable_growth.title'),
      description: t('scalable_growth.description'),
    },
    {
      id: 'benefit-security-compliance',
      icon: ShieldCheck,
      title: t('security_compliance.title'),
      description: t('security_compliance.description'),
    },
  ];

  const stats = [
    { value: 5000, suffix: "+", label: t('stats.games_integrated'), decimals: 0 },
    { value: 99.9, suffix: "%", label: t('stats.uptime_sla'), decimals: 1 },
    { value: 24, prefix:"", suffix: "/7", label: t('stats.support'), decimals: 0 },
  ];


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 50, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.25,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      if (statsGridRef.current) {
        gsap.fromTo(
          statsGridRef.current.children,
          { opacity: 0, y: 60, filter: "blur(6px)", scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.3,
            stagger: 0.25,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.4,
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
            {t('title_prefix')} <span className="highlight-text-primary">{t('title_highlight')}</span>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            {t('subheading')}
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
