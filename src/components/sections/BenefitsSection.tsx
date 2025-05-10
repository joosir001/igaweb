"use client";

import { motion, useInView } from 'framer-motion';
import { TrendingUp, Zap, ShieldCheck, Users, Clock, DollarSign } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
      const controls = motion.animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return <span ref={ref} className={className}>{prefix}{count}{suffix}</span>;
};


export default function BenefitsSection() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const stats = [
    { value: 5000, suffix: "+", label: "Games Integrated" },
    { value: 99.9, suffix: "%", label: "Uptime SLA" },
    { value: 24, prefix:"", suffix: "/7", label: "Support" },
  ];

  return (
    <section id="benefits" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Unlock Your <span className="neon-text-primary">Platform's Potential</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 md:mb-16">
            Partnering with NeonConnect brings tangible benefits to your iGaming business, accelerating growth and enhancing operational efficiency.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-card p-6 rounded-lg shadow-xl hover:shadow-primary/20 transition-shadow duration-300 border border-transparent hover:border-primary/50"
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
        </motion.div>
        
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="p-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg"
            >
              <AnimatedCounter 
                to={stat.value} 
                suffix={stat.suffix} 
                prefix={stat.prefix}
                className="block text-5xl font-bold neon-text-accent mb-2" 
              />
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
