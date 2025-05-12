
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
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

const ApiIntegrationAnimation = () => {
  const iconVariants = {
    initial: { scale: 0, opacity: 0, rotate: -45 },
    animate: (i:number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { delay: 0.5 + i * 0.2, duration: 0.6, type: "spring", stiffness: 120 } // Adjusted spring
    }),
    hover: { scale: 1.15, color: "hsl(var(--primary))" }
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i:number) => ({
      pathLength: 1,
      opacity: 0.6, // Slightly transparent lines
      transition: { delay: 0.7 + i * 0.15, duration: 0.9, ease: "circOut" } // Adjusted timing
    })
  };

  const centerIconVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: 30 },
    animate: {
      scale: [1, 1.05, 1], // Subtle pulse
      opacity: 1,
      rotate: 0,
      transition: { delay: 1.4, duration: 1.5, repeat: Infinity, repeatType: "mirror", ease:"easeInOut" }
    },
     hover: { scale: 1.2, color: "hsl(var(--accent))" }
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center my-8 md:my-0"> {/* Added margin for spacing */}
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible"> {/* Allow overflow */}
        {/* Background Glows */}
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--primary) / 0.15)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--primary) / 0)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--accent) / 0.1)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--accent) / 0)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <motion.circle cx="100" cy="100" r="90" fill="url(#grad1)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} />
        <motion.circle cx="100" cy="100" r="70" fill="url(#grad2)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} />

        {/* Center Icon */}
        <motion.g variants={centerIconVariants} initial="initial" animate="animate" whileHover="hover">
          <Share2 x="85" y="85" width="30" height="30" className="text-accent" strokeWidth={1.5}/>
        </motion.g>

        {/* Peripheral Icons and Lines */}
        {[
          { icon: Server, x: 30, y: 30, cx: 100, cy: 100, angle: -135 },
          { icon: Code2, x: 140, y: 30, cx: 100, cy: 100, angle: -45 },
          { icon: Link2, x: 30, y: 140, cx: 100, cy: 100, angle: 135 },
          { icon: DatabaseZap, x: 140, y: 140, cx: 100, cy: 100, angle: 45 },
        ].map((item, index) => (
          <g key={index}>
            <motion.line
              x1={item.cx + 25 * Math.cos(item.angle * Math.PI / 180)} // Start closer to center
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
              <item.icon x={item.x} y={item.y} width="28" height="28" className="text-primary/80" strokeWidth={1.5} /> {/* Slightly smaller icons */}
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresListRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const animationRef = useRef<HTMLDivElement>(null); // Ref for the animation container
  const developerBoxRef = useRef<HTMLDivElement>(null); // Ref for developer box

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

      // Animate feature items with delay after title
      if (featuresListRef.current) {
        gsap.fromTo(
          gsap.utils.toArray('.feature-item'),
          { opacity: 0, x: -30 }, // Start slightly to the left
          {
            opacity: 1,
            x: 0,
            duration: 0.7, // Slightly longer duration
            stagger: 0.18, // Slightly more stagger
            ease: 'power2.out', // Different ease
            scrollTrigger: {
              trigger: featuresListRef.current,
              start: 'top 75%', // Trigger slightly earlier
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3, // Delay after title animation starts
          }
        );
      }

      // Animate the API integration visual
      if (animationRef.current) {
          gsap.fromTo(animationRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: animationRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true,
              }
            }
          );
      }

      // Animate the developer-first box
      if (developerBoxRef.current) {
        gsap.fromTo(developerBoxRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: developerBoxRef.current,
              start: 'top 90%', // Trigger later
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.5, // Delay after features start animating
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" className="bg-background/80 backdrop-blur-md" ref={sectionRef}> {/* Adjusted background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Engineered for <span className="highlight-text-accent">Peak Performance</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16 md:mb-20">
            Our platform is built on a foundation of cutting-edge technology, designed for reliability, speed, and security to give you a competitive edge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Use div for GSAP targeting of the animation */}
          <div ref={animationRef}>
             <ApiIntegrationAnimation />
          </div>

          <div ref={featuresListRef} className="space-y-6 md:space-y-8"> {/* Increased spacing */}
            {features.map((feature, index) => (
              <div key={index} className="feature-item flex items-start space-x-4 group">
                <div className="flex-shrink-0 mt-1 p-3 bg-accent/10 rounded-full transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-105">
                  <feature.icon className="w-6 h-6 text-accent" /> {/* Slightly smaller icon */}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
             {/* Added ref for GSAP */}
             <div ref={developerBoxRef} className="mt-10 p-4 border border-dashed border-border/50 rounded-lg bg-card/50 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Code2 size={16} className="text-primary" />
                    <span>Developer-first: Comprehensive SDKs & dedicated support.</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
