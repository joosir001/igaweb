
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, DatabaseZap, Cog, Code2, Link2, Server, Share2 } from 'lucide-react';
import { AnimatedList, AnimatedListItem } from "@/components/magicui/animated-list";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'blazing-speed',
    icon: Zap,
    title: "Blazing Speed",
    description: "Our APIs are optimized for high performance and low latency, ensuring rapid response times for all transactions."
  },
  {
    id: 'robust-security',
    icon: ShieldCheck,
    title: "Robust Security",
    description: "State-of-the-art security protocols protect your data and transactions, ensuring a safe and trustworthy environment."
  },
  {
    id: 'scalable-architecture',
    icon: DatabaseZap,
    title: "Scalable Architecture",
    description: "Built to handle growth, our solutions scale effortlessly with your business needs, supporting millions of users."
  },
  {
    id: 'easy-integration',
    icon: Cog,
    title: "Easy Integration",
    description: "Developer-friendly APIs with comprehensive documentation and SDKs for quick and straightforward integration."
  },
];

const ApiIntegrationAnimation = () => {
  const iconVariants = {
    initial: { scale: 0, opacity: 0, rotate: -45 },
    animate: (i:number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { delay: 0.5 + i * 0.2, duration: 0.6, type: "spring", stiffness: 120 }
    }),
    hover: { scale: 1.15, color: "hsl(var(--primary))" }
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i:number) => ({
      pathLength: 1,
      opacity: 0.6, 
      transition: { delay: 0.7 + i * 0.15, duration: 0.9, ease: "circOut" }
    })
  };

  const centerIconVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: 30 },
    animate: {
      scale: [1, 1.05, 1], 
      opacity: 1,
      rotate: 0,
      transition: { delay: 1.4, duration: 1.5, repeat: Infinity, repeatType: "mirror", ease:"easeInOut" }
    },
     hover: { scale: 1.2, color: "hsl(var(--accent))" }
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center my-8 md:my-0">
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="grad1-tech" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--primary) / 0.15)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--primary) / 0)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="grad2-tech" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--accent) / 0.1)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--accent) / 0)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <motion.circle cx="100" cy="100" r="90" fill="url(#grad1-tech)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
        <motion.circle cx="100" cy="100" r="70" fill="url(#grad2-tech)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} />

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
              <item.icon x={item.x} y={item.y} width="28" height="28" className="text-primary/80" strokeWidth={1.5} />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animatedListContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 40, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
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

      if (animationContainerRef.current) {
          gsap.fromTo(animationContainerRef.current,
            { opacity: 0, scale: 0.9, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: animationContainerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
              delay: 0.2
            }
          );
      }
      
      // GSAP for the AnimatedList container itself to fade in
      if (animatedListContainerRef.current) {
        gsap.fromTo(
          animatedListContainerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: animatedListContainerRef.current,
              start: 'top 85%',
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
    <section id="technology" className="bg-background/80 backdrop-blur-md py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Engineered for <span className="highlight-text-accent">Peak Performance</span>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            Our platform is built on a foundation of cutting-edge technology, designed for reliability, speed, and security to give you a competitive edge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div ref={animationContainerRef} className="flex items-center justify-center">
             <ApiIntegrationAnimation />
          </div>
          
          <div ref={animatedListContainerRef}>
            <AnimatedList className="space-y-6 md:space-y-8" animationType="fadeIn" delay={0.3}>
              {features.map((feature) => (
                <AnimatedListItem
                  key={feature.id}
                  className="flex items-start space-x-4 group p-0 bg-transparent border-none shadow-none hover:bg-card/50 rounded-lg transition-colors duration-300"
                >
                  <motion.div 
                    className="flex-shrink-0 mt-1 p-3.5 bg-accent/10 rounded-full transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-7 h-7 text-accent" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedListItem>
              ))}
              <AnimatedListItem className="mt-10 p-6 border border-dashed border-border/60 rounded-xl bg-card/60 text-center shadow-lg hover:border-primary/50 transition-all duration-300 hover:shadow-primary/10">
                <div className="flex items-center justify-center gap-3 text-base text-foreground/90">
                    <Code2 size={20} className="text-primary" />
                    <span><strong>Developer-first:</strong> Comprehensive SDKs & dedicated support.</span>
                </div>
              </AnimatedListItem>
            </AnimatedList>
          </div>
        </div>
      </div>
    </section>
  );
}

    