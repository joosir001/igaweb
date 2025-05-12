
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView, animate } from 'framer-motion';
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
  decimals?: number; // Add decimals option
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, duration = 2, suffix = "", prefix = "", className, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger slightly earlier

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(parseFloat(value.toFixed(decimals))), // Apply decimals formatting
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration, decimals]);

  // Format the number with decimals before rendering
  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={ref} className={className}>{prefix}{formattedCount}{suffix}</span>;
};


const stats = [
  { value: 5000, suffix: "+", label: "Games Integrated", decimals: 0 },
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 }, // Specify decimals
  { value: 24, prefix:"", suffix: "/7", label: "Support", decimals: 0 },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const benefitsGridRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
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
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate benefit cards
      if (benefitsGridRef.current) {
        gsap.fromTo(
          benefitsGridRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 }, // Start slightly lower and smaller
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8, // Slightly longer duration
            stagger: 0.15, // Increased stagger
            ease: 'power3.out', // Smoother ease
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
          { opacity: 0, y: 50, filter: "blur(4px)" }, // Start lower and blurred
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0, // Longer duration
            stagger: 0.2,
            ease: 'expo.out', // Exponential ease
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
        <div className="text-center">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Unlock Your <span className="highlight-text-primary">Platform's Potential</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16 md:mb-20">
            Partnering with iGamX brings tangible benefits to your iGaming business, accelerating growth and enhancing operational efficiency. {/* Updated company name */}
          </p>
        </div>

        <div ref={benefitsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 md:mb-24"> {/* Increased bottom margin */}
          {benefits.map((benefit, index) => (
            <motion.div // Keep Framer Motion for card hover effects
              key={index}
              whileHover={{ y: -5, boxShadow: "0px 8px 20px -5px hsla(var(--primary), 0.15)" }} // Refined shadow
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-card p-6 rounded-lg shadow-lg border border-border/20 hover:border-primary/40 h-full transition-colors duration-300" // Add transition
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3> {/* Adjusted size */}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div >

        <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/20" // Added gradient, border radius
            >
              <AnimatedCounter
                to={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals} // Pass decimals prop
                className="block text-4xl md:text-5xl font-bold highlight-text-accent mb-2" // Use highlight class
              />
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p> {/* Uppercase, tracking */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
