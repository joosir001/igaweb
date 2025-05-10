// src/components/sections/TechnologySection.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion'; // Keep for ApiIntegrationAnimation and title
import { Zap, ShieldCheck, DatabaseZap, Cog, Code2, Link2, Server, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: "Blazing Speed",
    description: "Our APIs are optimized for high performance and low latency, ensuring rapid response times for all transactions."
  },
  {
    icon: ShieldCheck,
    title: "Robust Security",
    description: "State-of-the-art security protocols protect your data and transactions, ensuring a safe and trustworthy environment."
  },
  {
    icon: DatabaseZap,
    title: "Scalable Architecture",
    description: "Built to handle growth, our solutions scale effortlessly with your business needs, supporting millions of users."
  },
  {
    icon: Cog,
    title: "Easy Integration",
    description: "Developer-friendly APIs with comprehensive documentation and SDKs for quick and straightforward integration."
  },
];

const ApiIntegrationAnimation = () => { // This component remains Framer Motion based
  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i:number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.5, type: "spring", stiffness: 150 }
    }),
    hover: { scale: 1.2, color: "hsl(var(--primary))" }
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i:number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: 0.5 + i * 0.2, duration: 0.8, ease: "easeInOut" }
    })
  };

  const centerIconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: 1,
      transition: { delay: 1.2, duration: 1, repeat: Infinity, repeatType: "mirror", ease:"easeInOut" }
    },
     hover: { scale: 1.3, color: "hsl(var(--accent))" }
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <motion.g variants={centerIconVariants} initial="initial" animate="animate" whileHover="hover">
          <Share2 x="85" y="85" width="30" height="30" className="text-accent" strokeWidth={1.5}/>
        </motion.g>
        {[
          { icon: Server, x: 30, y: 30, cx: 100, cy: 100, angle: -135 },
          { icon: Code2, x: 140, y: 30, cx: 100, cy: 100, angle: -45 },
          { icon: Link2, x: 30, y: 140, cx: 100, cy: 100, angle: 135 },
          { icon: DatabaseZap, x: 140, y: 140, cx: 100, cy: 100, angle: 45 },
        ].map((item, index) => (
          <g key={index}>
            <motion.line
              x1={item.cx + 25 * Math.cos(item.angle * Math.PI / 180)}
              y1={item.cy + 25 * Math.sin(item.angle * Math.PI / 180)}
              x2={item.x + 15} 
              y2={item.y + 15} 
              stroke="hsl(var(--border))"
              strokeWidth="1"
              variants={lineVariants}
              custom={index}
              initial="initial"
              animate="animate"
            />
            <motion.g variants={iconVariants} custom={index} initial="initial" animate="animate" whileHover="hover">
              <item.icon x={item.x} y={item.y} width="30" height="30" className="text-primary/80" strokeWidth={1.5} />
            </motion.g>
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-full blur-xl -z-10"></div>
    </div>
  );
};

export default function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresListRef = useRef<HTMLDivElement>(null); // For GSAP targeting

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate feature items
      if (featuresListRef.current) {
        gsap.fromTo(
          gsap.utils.toArray('.feature-item'), // Target items by class
          { opacity: 0, x: -40, filter: "blur(3px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: featuresListRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
      // Animate the developer-first box
       gsap.fromTo('.developer-box',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: '.developer-box',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" className="bg-background/70 backdrop-blur-sm" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div // Title animation
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Engineered for <span className="neon-text-accent">Peak Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 md:mb-16">
            Our platform is built on a foundation of cutting-edge technology, designed for reliability, speed, and security to give you a competitive edge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div // ApiIntegrationAnimation container, Framer Motion for its own reveal
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <ApiIntegrationAnimation />
          </motion.div>
          
          <div ref={featuresListRef} className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-item flex items-start space-x-4"> {/* Added class for GSAP */}
                <motion.div // Icon hover can be Framer Motion
                  whileHover={{ scale: 1.15, rotate: 5 }} 
                  className="flex-shrink-0 p-3 bg-accent/10 rounded-full"
                >
                  <feature.icon className="w-7 h-7 neon-text-accent" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
             <div className="developer-box mt-8 p-4 border border-dashed border-border rounded-lg bg-card/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 size={18} className="text-primary" />
                    <span>Developer-first: Comprehensive SDKs & dedicated support.</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
