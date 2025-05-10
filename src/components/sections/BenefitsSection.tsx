// src/components/sections/BenefitsSection.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView, animate } from 'framer-motion'; // Keep Framer Motion for AnimatedCounter and potentially title
import { TrendingUp, Zap, ShieldCheck, Users, Clock, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: 'Faster Time-to-Market',
    description: 'Launch your platform or new features quickly with our rapid integration solutions.',
  },
  {
    icon: DollarSign,
    title: 'Reduced Development Costs',
    description: 'Save on extensive development efforts and resources by leveraging our pre-built integrations.',
  },
  {
    icon: TrendingUp,
    title: 'Access to Best-in-Class Content',
    description: 'Offer your players a vast library of top-tier games and betting markets from leading providers.',
  },
  {
    icon: Users,
    title: 'Enhanced Player Experience',
    description: 'Provide a seamless, engaging, and reliable gaming experience that keeps players coming back.',
  },
  {
    icon: Zap,
    title: 'Scalable Growth',
    description: 'Our robust infrastructure supports your growth, handling increasing player volume and transactions effortlessly.',
  },
  {
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
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, duration = 2, suffix = "", prefix = "", className }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, { // Framer Motion's animate function
        duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return <span ref={ref} className={className}>{prefix}{count}{suffix}</span>;
};

const stats = [
  { value: 5000, suffix: "+", label: "Games Integrated" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 24, prefix:"", suffix: "/7", label: "Support" },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const benefitsGridRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate benefit cards
      if (benefitsGridRef.current) {
        gsap.fromTo(
          benefitsGridRef.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: benefitsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Animate stats cards
      if (statsGridRef.current) {
        gsap.fromTo(
          statsGridRef.current.children,
          { opacity: 0, y: 40, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.2,
            ease: 'circ.out',
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 85%',
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
    <section id="benefits" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div // Title animation can remain Framer Motion or be converted
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock Your <span className="neon-text-primary">Platform's Potential</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 md:mb-16">
            Partnering with NeonConnect brings tangible benefits to your iGaming business, accelerating growth and enhancing operational efficiency.
          </p>
        </motion.div>

        <div ref={benefitsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div // Keep Framer Motion for hover effects on the card
              key={index} 
              whileHover={{ y: -5, boxShadow: "0px 6px 12px hsla(var(--primary), 0.15)" }}
              className="bg-card p-6 rounded-lg shadow-xl border border-transparent hover:border-primary/50"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <benefit.icon className="w-6 h-6 neon-text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div >
        
        <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div // GSAP handles entrance, so no Framer Motion variants needed here
              key={index} 
              className="p-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg"
            >
              <AnimatedCounter 
                to={stat.value} 
                suffix={stat.suffix} 
                prefix={stat.prefix}
                className="block text-5xl font-bold neon-text-accent mb-2" 
              />
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
